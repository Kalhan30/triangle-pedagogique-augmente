# Patch Visibilité Triangle v2 — Positionnement renforcé & Croisement éthique

**Type de patch** : amélioration ergonomique
**Périmètre** : `src/components/Triangle.jsx` + `src/components/tabs/MonDiagnostic.jsx`
**Durée estimée** : 50 min
**Origine** : retour utilisatrice (enseignante 3e) — *« Possible d'indiquer dans le diagramme triangle le positionnement ? Possible de croiser avec le % éthique ? »*
**Statut** : remplace et fusionne le précédent `Patch_Positionnement_Triangle.md` (v1)

---

## 1. Préambule

### Ce qui existe déjà dans le triangle

Le composant `Triangle.jsx` matérialise actuellement le positionnement par **deux signaux visuels** :

1. **Épaisseur et opacité des axes** modulées selon l'activation, via la fonction `strokeConfig` :
   - activation < 20 → 1 px, opacité 0.25
   - activation < 50 → 2 px, opacité 0.50
   - activation < 80 → 3 px, opacité 0.75
   - activation ≥ 80 → 4 px, opacité 1.00

2. **Halo radial central** dont la couleur reprend la zone éthique (`getZoneEthique(ethicsValue).color`) avec une opacité qui croît de 0.1 à 0.9 selon la valeur.

### Pourquoi c'est insuffisamment visible

| Problème observé | Cause technique |
|---|---|
| Difficulté à distinguer un axe à 30 % d'un axe à 60 % | Paliers d'épaisseur tassés (écart 1 px) et opacité minimale trop basse (0.25) |
| Pas d'idée précise du « point » de la pratique | Aucun marqueur spatial — l'œil ne sait pas où regarder dans le triangle |
| Lien non perçu entre le halo central et la zone éthique | Halo de fond sans label, sans bordure, sans légende intégrée |

### Réponse du patch

✅ **Trois leviers complémentaires**, à appliquer ensemble pour effet maximal :

- **Levier A** — renforcer les paliers d'épaisseur et l'opacité des axes (positionnement existant, visibilité doublée)
- **Levier B** — ajouter un marqueur barycentrique coloré selon la zone éthique (positionnement spatial explicite + croisement éthique en un seul élément)
- **Levier C** — afficher un badge discret de zone éthique au coin inférieur du SVG (élimine l'ambiguïté du halo)

❌ **Ce que ce patch n'introduit pas** : aucun score, aucun classement, aucun jugement. Le triangle reste un miroir réflexif — la traduction visuelle de la pondération saisie.

---

## 2. Levier A — Renforcement des paliers d'axes

### 2.1. Modification de `strokeConfig`

Localiser dans `src/components/Triangle.jsx` la fonction :

```jsx
function strokeConfig(activation) {
  if (activation < 20) return { width: 1, opacity: 0.25 };
  if (activation < 50) return { width: 2, opacity: 0.5 };
  if (activation < 80) return { width: 3, opacity: 0.75 };
  return { width: 4, opacity: 1 };
}
```

La remplacer par :

```jsx
function strokeConfig(activation) {
  if (activation < 20) return { width: 2, opacity: 0.40, glow: false };
  if (activation < 50) return { width: 4, opacity: 0.65, glow: false };
  if (activation < 80) return { width: 6, opacity: 0.85, glow: true };
  return { width: 8, opacity: 1.00, glow: true };
}
```

✅ **Effet** : l'écart entre paliers passe de 1 px à 2 px, et l'opacité minimale grimpe de 0.25 à 0.40. Un axe à 30 % devient visuellement clairement distinct d'un axe à 60 %. Le seuil de glow à 50 % renforce les axes dominants.

### 2.2. Activation du glow conditionnel

Dans la boucle `axisEdges.map(...)`, localiser la déstructuration :

```jsx
const { width, opacity } = strokeConfig(edge.activation);
```

La remplacer par :

```jsx
const { width, opacity, glow } = strokeConfig(edge.activation);
```

Puis, dans l'attribut `style` du `<line>` du même bloc, modifier la propriété `filter` :

**Avant** :
```jsx
style={{ cursor: 'pointer', transition: 'all 200ms', filter: isSelected ? 'url(#glow)' : 'none' }}
```

**Après** :
```jsx
style={{
  cursor: 'pointer',
  transition: 'all 200ms',
  filter: isSelected ? 'url(#glow)' : (glow ? 'url(#glow)' : 'none'),
}}
```

✅ **Effet** : les axes dont l'activation dépasse 50 % gagnent un léger halo blanc (le filtre `glow` déjà défini dans les `<defs>` du SVG). Les axes très activés (≥ 80 %) cumulent largeur 8 px + glow + opacité 1, devenant clairement les axes structurants de la pratique analysée.

⚠️ **Vérification** : conserver l'équilibre quand `isSelected` est vrai (le glow d'interaction prime sur celui d'activation, comportement déjà géré par la logique ternaire ci-dessus).

---

## 3. Levier B — Marqueur barycentrique avec couleur de zone éthique

### 3.1. Imports

Vérifier dans `src/components/Triangle.jsx` que l'import depuis `'../data/niveaux.js'` inclut bien `getZoneEthique`. Si ce n'est pas le cas, l'ajouter :

```jsx
import { AXES_META, VERTICES_META, getZoneEthique } from '../data/niveaux.js';
```

### 3.2. Nouvelle prop `showPositioning`

Ajouter la prop à la signature du composant (default `false` pour préserver l'usage Explorer) :

```jsx
export default function Triangle({
  axes = { enseignantSavoir: 50, enseignantEleve: 50, eleveSavoir: 50 },
  selectedVertex = null,
  selectedAxis = null,
  onSelectVertex,
  onSelectAxis,
  ethicsValue = 0,
  showPositioning = false,
}) {
```

### 3.3. Calcul du barycentre

Insérer ces deux `useMemo` **après** la définition de `axisEdges` et **avant** le `return` du composant :

```jsx
const positionMarker = useMemo(() => {
  if (!showPositioning) return null;

  const w_ES = Math.max(0, axes.enseignantSavoir || 0);
  const w_EE = Math.max(0, axes.enseignantEleve || 0);
  const w_LS = Math.max(0, axes.eleveSavoir || 0);
  const W = w_ES + w_EE + w_LS;

  // Milieux des trois axes
  const M_ES = {
    x: (POSITIONS.enseignant.x + POSITIONS.savoir.x) / 2,
    y: (POSITIONS.enseignant.y + POSITIONS.savoir.y) / 2,
  };
  const M_EE = {
    x: (POSITIONS.enseignant.x + POSITIONS.eleve.x) / 2,
    y: (POSITIONS.enseignant.y + POSITIONS.eleve.y) / 2,
  };
  const M_LS = {
    x: (POSITIONS.eleve.x + POSITIONS.savoir.x) / 2,
    y: (POSITIONS.eleve.y + POSITIONS.savoir.y) / 2,
  };

  // Centre de gravité par défaut si tous axes à 0
  if (W === 0) {
    return {
      x: (POSITIONS.enseignant.x + POSITIONS.eleve.x + POSITIONS.savoir.x) / 3,
      y: (POSITIONS.enseignant.y + POSITIONS.eleve.y + POSITIONS.savoir.y) / 3,
    };
  }

  return {
    x: (w_ES * M_ES.x + w_EE * M_EE.x + w_LS * M_LS.x) / W,
    y: (w_ES * M_ES.y + w_EE * M_EE.y + w_LS * M_LS.y) / W,
  };
}, [showPositioning, axes.enseignantSavoir, axes.enseignantEleve, axes.eleveSavoir]);

const zoneEthique = useMemo(() => getZoneEthique(ethicsValue), [ethicsValue]);
```

✅ **Logique théorique** : moyenne pondérée des **milieux d'axes** (et non des sommets). Plus un axe est activé, plus le point se rapproche de cet axe — cohérent avec Houssaye, où l'IA module les *relations* (axes) et non les *acteurs* (sommets).

### 3.4. Rendu du marqueur (version visible)

Insérer ce bloc **après** la boucle des sommets et **juste avant** la fermeture `</svg>` :

```jsx
{positionMarker && (
  <g style={{ pointerEvents: 'none' }} aria-hidden="true">
    {/* Halo extérieur diffus — couleur zone éthique */}
    <circle
      cx={positionMarker.x}
      cy={positionMarker.y}
      r={36}
      fill={zoneEthique.color}
      fillOpacity={0.10}
      style={{ transition: 'cx 500ms ease, cy 500ms ease, fill 300ms' }}
    />
    {/* Halo intermédiaire */}
    <circle
      cx={positionMarker.x}
      cy={positionMarker.y}
      r={22}
      fill={zoneEthique.color}
      fillOpacity={0.25}
      style={{ transition: 'cx 500ms ease, cy 500ms ease, fill 300ms' }}
    />
    {/* Anneau extérieur blanc (séparateur lisible sur fond coloré) */}
    <circle
      cx={positionMarker.x}
      cy={positionMarker.y}
      r={13}
      fill="var(--svg-circle-fill)"
      stroke={zoneEthique.color}
      strokeWidth={2.5}
      style={{ transition: 'cx 500ms ease, cy 500ms ease, stroke 300ms' }}
    />
    {/* Pastille centrale pleine */}
    <circle
      cx={positionMarker.x}
      cy={positionMarker.y}
      r={8}
      fill={zoneEthique.color}
      style={{
        filter: 'drop-shadow(0 2px 6px rgba(15,23,42,0.45))',
        transition: 'cx 500ms ease, cy 500ms ease, fill 300ms',
      }}
    />
    {/* Étiquette « Votre pratique » */}
    <text
      x={positionMarker.x}
      y={positionMarker.y - 46}
      textAnchor="middle"
      fontSize="12"
      fontWeight="600"
      fill={zoneEthique.color}
      style={{
        textShadow: '0 1px 3px rgba(255,255,255,0.95), 0 1px 3px rgba(255,255,255,0.95)',
        transition: 'fill 300ms',
      }}
    >
      Votre pratique
    </text>
  </g>
)}
```

✅ **Choix techniques** :
- **Quatre cercles concentriques** (36 / 22 / 13 / 8 px) : crée une signature visuelle nette, lisible même en miniature mobile.
- **Anneau blanc** (`var(--svg-circle-fill)`) entre l'extérieur coloré et la pastille pleine : assure le contraste sur n'importe quel fond, y compris quand le halo central éthique est saturé.
- **Étiquette « Votre pratique »** au-dessus : nomme explicitement ce que représente le point (le testeur n'a plus à deviner).
- **Transitions 500 ms** sur `cx/cy` : le marqueur se déplace en douceur quand l'utilisateur ajuste ses réponses, rendant la causalité immédiatement perceptible.
- **Z-order** : rendu après les axes et sommets ; si le marqueur se rapproche d'un sommet (cas extrême), le sommet (rayon 34) reste au-dessus, ce qui est acceptable.

### 3.5. Activation dans `MonDiagnostic.jsx`

Dans `src/components/tabs/MonDiagnostic.jsx`, localiser le bloc `<Triangle ... />` (à l'intérieur de `<div id="diagnostic-triangle">`) :

```jsx
<Triangle
  axes={{ enseignantSavoir: form.axeEnseignantSavoir, enseignantEleve: form.axeEnseignantEleve, eleveSavoir: axeEleveVisualise }}
  ethicsValue={meanAxes}
/>
```

Y ajouter la prop :

```jsx
<Triangle
  axes={{
    enseignantSavoir: form.axeEnseignantSavoir,
    enseignantEleve: form.axeEnseignantEleve,
    eleveSavoir: axeEleveVisualise,
  }}
  ethicsValue={meanAxes}
  showPositioning={true}
/>
```

⚠️ **Ne pas activer dans Explorer.jsx** : l'onglet Explorer utilise le triangle de manière exploratoire avec des valeurs fixes à 60. Y afficher un marqueur n'aurait pas de sens.

---

## 4. Levier C — Badge de zone éthique au coin du SVG

### 4.1. Pourquoi un badge dans le SVG

Le récap zone éthique existe déjà **sous** le triangle dans `MonDiagnostic.jsx`. Mais visuellement, il est dissocié du SVG : l'œil voit le halo coloré du triangle sans le relier au texte qui suit. Un **badge intégré au SVG**, près d'un coin, ancre la couleur du halo à son sens.

### 4.2. Insertion du badge

Dans `src/components/Triangle.jsx`, juste **avant** le bloc `{positionMarker && (...)}` ajouté précédemment, insérer :

```jsx
{showPositioning && (
  <g aria-hidden="true">
    {/* Badge zone éthique en bas à gauche */}
    <rect
      x={20}
      y={465}
      width={150}
      height={32}
      rx={16}
      fill="var(--svg-circle-fill)"
      stroke={zoneEthique.color}
      strokeWidth={1.5}
      style={{ filter: 'drop-shadow(0 1px 3px rgba(15,23,42,0.10))', transition: 'stroke 300ms' }}
    />
    <circle
      cx={36}
      cy={481}
      r={6}
      fill={zoneEthique.color}
      style={{ transition: 'fill 300ms' }}
    />
    <text
      x={50}
      y={479}
      fontSize="10"
      fontWeight="500"
      fill="var(--svg-stroke-muted)"
      style={{ pointerEvents: 'none' }}
    >
      Zone éthique
    </text>
    <text
      x={50}
      y={491}
      fontSize="11"
      fontWeight="700"
      fill={zoneEthique.color}
      style={{ pointerEvents: 'none', transition: 'fill 300ms' }}
    >
      {zoneEthique.label}
    </text>
  </g>
)}
```

✅ **Effet** : un petit badge arrondi (pill) placé en bas à gauche du SVG, hors du triangle, qui affiche la **couleur** + le **label** de la zone éthique. Le badge change de couleur en temps réel quand l'utilisateur traverse une frontière éthique.

✅ **Cohérence visuelle** : la pastille du badge a la même couleur que les halos du marqueur barycentrique → l'œil fait immédiatement le lien « ah, c'est la dimension éthique ».

⚠️ **Coordonnées** : le `viewBox` du SVG est `0 0 700 510`. Le badge à `x=20, y=465` occupe le coin inférieur gauche, hors du triangle (qui descend jusqu'à y=430). Pas de chevauchement avec les sommets ni les labels existants.

### 4.3. Légende explicative sous le triangle (recommandé)

Dans `MonDiagnostic.jsx`, juste après la div contenant le récap zone éthique existant, ajouter une ligne discrète :

```jsx
<p className="mt-2 text-xs text-text-muted text-center max-w-md mx-auto leading-relaxed">
  Le <strong>point coloré</strong> indique le positionnement de votre pratique
  selon la pondération des trois axes. Sa <strong>couleur</strong> reprend
  celle de la zone éthique.
</p>
```

✅ Sans cette ligne, le marqueur reste à interpréter. Avec elle, il devient un repère réflexif explicite.

---

## 5. Tests de non-régression

### 5.1. Triangle (Explorer)

- [ ] L'onglet **Explorer** affiche les axes avec les **nouvelles épaisseurs renforcées** (effet positif attendu : meilleure lisibilité même hors Diagnostic).
- [ ] Aucun marqueur barycentrique (la prop `showPositioning` n'est pas passée).
- [ ] Aucun badge de zone éthique (même raison).
- [ ] Les axes restent cliquables, les sommets aussi.
- [ ] Le halo radial central existant reste piloté par `ethicsValue`.

### 5.2. Triangle (Mon Diagnostic)

- [ ] Le marqueur `Votre pratique` s'affiche dès l'arrivée sur l'onglet.
- [ ] Le badge de zone éthique apparaît en bas à gauche du SVG.
- [ ] Quand on change une réponse au questionnaire ou bouge un slider, le marqueur **se déplace fluidement** (≈500 ms).
- [ ] Quand le score moyen traverse une frontière de zone (25 / 60 / 85), **les couleurs du marqueur, des halos et du badge changent simultanément**.
- [ ] L'étiquette « Votre pratique » reste lisible y compris quand le marqueur est près d'un sommet (text-shadow blanc compense).
- [ ] Cas limite tous axes à 0 : marqueur au centre de gravité (fallback W=0 OK).

### 5.3. Visibilité du positionnement (cœur du patch)

- [ ] Comparer visuellement avec la version v1 : un axe à 30 % et un axe à 60 % sont **clairement distincts** (avant le patch, ils étaient quasi confondus).
- [ ] Un axe à 80 %+ présente un halo blanc (glow) qui le détache visuellement.
- [ ] La hiérarchie des axes (le plus activé / le moins activé) est lisible **en moins d'1 seconde** par un œil non averti.

### 5.4. Accessibilité

- [ ] `aria-hidden="true"` sur les groupes décoratifs (marqueur + badge).
- [ ] L'information textuelle de la zone éthique reste disponible sous le triangle (récap existant + nouvelle légende).
- [ ] `prefers-reduced-motion` : si activé côté système, vérifier que les transitions à 500 ms ne provoquent pas d'inconfort. Si nécessaire, ajouter un wrapper CSS qui désactive les transitions.

### 5.5. Responsive

- [ ] Mobile (375 px) : marqueur, badge et étiquette restent visibles et lisibles (le viewBox 700×510 est rescalé proportionnellement).
- [ ] L'étiquette `Votre pratique` ne déborde pas du SVG en aucun cas.
- [ ] Le badge en bas à gauche n'est pas tronqué.

### 5.6. Thèmes

- [ ] Thème **clair** : le marqueur reste contrasté (anneau blanc + couleur zone).
- [ ] Thème **sombre** : `var(--svg-circle-fill)` adapte automatiquement l'anneau, vérifier que le contraste reste suffisant.

---

## 6. Prompt Claude Code (à copier-coller)

```
Applique le patch v2 sur le projet Triangle Pédagogique Augmenté
(repo triangle-v2). Objectif : améliorer la visibilité du positionnement
existant + ajouter un marqueur barycentrique coloré selon la zone éthique
+ ajouter un badge de zone éthique dans le SVG.

Ce patch REMPLACE et FUSIONNE le précédent Patch_Positionnement_Triangle.md.
S'il a déjà été appliqué partiellement, vérifier d'abord l'état actuel
de Triangle.jsx avant d'appliquer les modifications.

FICHIER 1 : src/components/Triangle.jsx

A. Renforcement des paliers d'axes
1. Remplacer la fonction strokeConfig par la version 4 paliers
   (2/4/6/8 px, opacité 0.40/0.65/0.85/1.00, flag glow à partir
   du palier 3) selon la spécification de la section 2.1 du patch.
2. Dans la boucle axisEdges.map, déstructurer aussi le flag glow,
   et modifier le filter du <line> pour utiliser url(#glow) quand
   glow=true OU isSelected=true (section 2.2).

B. Marqueur barycentrique
3. Vérifier l'import de getZoneEthique depuis ../data/niveaux.js
   (l'ajouter sinon).
4. Ajouter la prop showPositioning (default false) à la signature.
5. Insérer les deux useMemo (positionMarker + zoneEthique) après
   axisEdges et avant le return, selon la section 3.3.
6. Avant la fermeture </svg>, ajouter le bloc <g> contenant les
   quatre cercles concentriques (36/22/13/8) + l'étiquette
   « Votre pratique » selon la section 3.4. Conserver les
   transitions CSS et l'attribut aria-hidden="true".

C. Badge zone éthique
7. Avant le bloc du marqueur, ajouter le bloc <g> contenant le badge
   pill (rect + circle + 2 text) selon la section 4.2. Coordonnées :
   x=20, y=465 dans le viewBox 700×510.

FICHIER 2 : src/components/tabs/MonDiagnostic.jsx
1. Sur l'instance unique de <Triangle> dans le rendu (intérieur de
   <div id="diagnostic-triangle">), ajouter la prop
   showPositioning={true}.
2. Sous le récap zone éthique existant, ajouter le paragraphe de
   légende décrit en section 4.3.

CONTRAINTES :
- Ne pas modifier le comportement actuel d'Explorer.jsx au-delà du
  bénéfice automatique du renforcement des axes (qui s'applique
  partout). Pas de marqueur ni de badge dans Explorer.
- Conserver le halo radial central existant (piloté par ethicsValue).
- Conserver toutes les interactions (clic sur axes, clic sur sommets).
- Conserver les attributs aria-label des éléments interactifs.

Une fois les modifications appliquées :
- npm run build
- vercel dev (ou npm run dev) pour test visuel
- Vérifier les 6 sections de tests de non-régression du patch.
- Comparer un axe à 30 % vs 60 % : ils doivent être clairement
  distincts (test critique du levier A).
```

---

## 7. Notes complémentaires

### 7.1. Pourquoi ne pas tout transformer en marqueur ?

Conserver les **épaisseurs d'axes** est important : elles montrent **où l'IA agit** (sur quel axe, à quelle intensité). Le **marqueur** montre **où la pratique se positionne** dans le triangle global. Les deux signaux sont **complémentaires**, pas redondants :

- L'épaisseur d'axe répond à : *« Sur quelle relation l'IA pèse-t-elle ? »*
- Le marqueur répond à : *« Où se situe ma pratique globalement ? »*

Supprimer l'un priverait l'utilisateur d'une information.

### 7.2. Pourquoi pas de tooltip au survol ?

Une version avec tooltip au survol du marqueur (affichant les valeurs exactes des axes + zone éthique) serait possible, mais :
- Sur mobile/tablette, pas de survol natif → il faudrait un comportement tactile distinct (clic sur le marqueur = ouverture d'un panneau)
- Les valeurs exactes sont déjà disponibles dans le récap textuel sous le triangle

À envisager **post-SINPA** comme évolution.

### 7.3. Compatibilité avec l'export PDF

L'export PDF actuel (`exportPdf.js`) dessine son propre triangle simplifié, indépendant du composant React. Ce patch ne touche pas le PDF — la cohérence visuelle écran/PDF reste à arbitrer séparément (voir section optionnelle dans le patch v1, applicable telle quelle si vous voulez la cohérence).

### 7.4. Effet attendu sur les retours futurs

Avec ces trois leviers, la prochaine question d'un testeur ne devrait plus être *« où est mon positionnement ? »*, mais plus probablement :
- *« Pourquoi le point est-il là et pas ailleurs ? »* → demande de tooltip / explication
- *« Puis-je sauvegarder plusieurs positions pour les comparer ? »* → demande d'historique

Ces deux pistes constituent les évolutions logiques pour une **V3 post-SINPA**.

---

*Patch_Visibilite_Triangle_v2.md — version 2.0 — 27 avril 2026*
*Auteure : Vanessa Le Scolan Nguyen — MaProfBranchee*
*Origine : retour utilisatrice — remplace et fusionne Patch_Positionnement_Triangle.md v1*
