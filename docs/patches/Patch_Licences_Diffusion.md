# Patch Licences & Diffusion — CC BY-SA 4.0 / MIT / Marque réservée

**Type de patch** : structurant — révision de la stratégie de licence
**Périmètre** : 7 emplacements (`LICENSE`, `LICENSE-CONTENT.md`, `NOTICE`, `README.md`, `package.json`, `src/components/Footer.jsx`, `src/components/pages/APropos.jsx`, `index.html`)
**Durée estimée** : 1h20
**Origine** : suggestion d'un contributeur professionnel s'appuyant sur l'argumentaire Arnaud Champollion contre les clauses NC

---

## 1. Préambule

### Contexte

L'application est actuellement annoncée sous **CC BY-NC-SA 4.0** dans le footer. Cette licence comporte une clause **NC** (Non Commercial) dont la pertinence est contestée par la littérature CC elle-même et par plusieurs juristes du libre. Les principaux arguments :

- La notion de « commercial » est **juridiquement floue** et bloque en pratique des réutilisations vertueuses (formation continue par associations enseignantes, diffusion académique avec frais d'inscription, intégration dans des manuels scolaires certifiés, etc.).
- La clause **SA** (ShareAlike) suffit à contraindre tout dérivé à rester sous licence libre, ce qui rend l'exploitation lucrative captive économiquement inintéressante.
- En cas de violation, faire valoir ses droits demande **le même effort** quelle que soit la licence : la clause NC ne protège pas davantage en pratique.

### Stratégie retenue

✅ **Triple licence claire et différenciée** :

| Périmètre | Licence | Logique |
|---|---|---|
| **Théorisation, contenus pédagogiques, schémas, textes** | CC BY-SA 4.0 | Maximise la diffusion vertueuse, force les dérivés à rester libres |
| **Code source de l'application** | MIT | Maximise l'adoption par d'autres académies, cohérent avec le stack (React/Vite/Tailwind sont MIT) |
| **Marque MaProfBranchee, identité visuelle, avatar** | Tous droits réservés | Protège l'identité auteur sans entraver la diffusion des contenus |

❌ **Ce qui change** :
- Disparition de la clause **NC** sur les contenus
- Apparition explicite d'une licence **MIT** sur le code
- Apparition explicite d'une **réserve sur la marque** (qui n'était pas formulée auparavant)

💡 **Rationale stratégique pour SINPA / DRANE** : un artefact de recherche-action présenté à une candidature DRANE Occitanie a tout à gagner d'une licence ouverte sans NC. Une académie voisine qui voudrait réutiliser l'outil dans une formation continue rémunérée (cas typique du déploiement institutionnel) serait actuellement bloquée par NC. CC BY-SA permet cette réutilisation tout en garantissant que les améliorations apportées reviennent à la communauté.

---

## 2. Création du fichier `LICENSE` (racine du repo)

Créer le fichier suivant à la racine du projet :

**Chemin** : `/LICENSE`

```
MIT License

Copyright (c) 2025-2026 Vanessa Le Scolan Nguyen — MaProfBranchee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

This MIT License covers ONLY the source code of the application
(JavaScript, JSX, CSS, HTML, configuration files, build scripts).

For pedagogical content, theoretical framing, schemas, illustrations,
diagrams and editorial materials, see LICENSE-CONTENT.md (CC BY-SA 4.0).

For the trademark "MaProfBranchee", the avatar/portrait, the visual
identity and the logos, see NOTICE.md (all rights reserved).
```

✅ **Pourquoi MIT plutôt que GPL pour le code** : GPL impose à tout dérivé d'être lui-même GPL. C'est puissant, mais cela bloque l'intégration dans des plateformes éducatives propriétaires (ENT académiques avec briques propriétaires, par exemple). MIT permet une intégration sans contrainte de relicence — ce qui maximise l'adoption institutionnelle. Pour un outil ERUN visant la diffusion académique, c'est le bon choix.

---

## 3. Création du fichier `LICENSE-CONTENT.md` (racine du repo)

**Chemin** : `/LICENSE-CONTENT.md`

```markdown
# Licence des contenus pédagogiques — CC BY-SA 4.0

Les **contenus pédagogiques** de l'application Triangle Pédagogique
Augmenté sont mis à disposition sous licence **Creative Commons
Attribution - Partage dans les Mêmes Conditions 4.0 International
(CC BY-SA 4.0)**.

Texte intégral : https://creativecommons.org/licenses/by-sa/4.0/legalcode.fr
Résumé pour humains : https://creativecommons.org/licenses/by-sa/4.0/deed.fr

---

## Périmètre couvert par CC BY-SA 4.0

Cette licence couvre :

- La **théorisation pédagogique** : décomposition de l'axe Élève-Savoir
  en *manipulation directe* / *impact médiatisé*, mise en relation du
  triangle de Houssaye avec le tétraèdre de Faerber, articulation
  TPACK / SAMR.
- Le **contenu textuel** des onglets : Explorer, Situations, Éthique,
  Mon Diagnostic, Cadre théorique, FAQ, À propos.
- Les **scénarios pédagogiques** prédéfinis (16 scénarios sur 4 niveaux).
- Les **schémas conceptuels** : triangle pédagogique, triangle augmenté
  par l'IA, illustrations des sommets et axes.
- Les **questionnaires diagnostiques** et leurs libellés qualitatifs.
- Les **citations sourcées** du Cadre d'usage juin 2025 telles
  qu'organisées dans l'application (les citations elles-mêmes restent
  propriété de leurs auteurs / du Ministère de l'Éducation nationale).
- La **fiche PDF exportée** (mise en page, structure, contenus).

## Conditions de réutilisation

- **Attribution (BY)** : indiquer le nom de l'auteure
  (*Vanessa Le Scolan Nguyen — MaProfBranchee*), un lien vers la
  source d'origine (https://triangle.maprofbranchee.fr) et signaler
  toute modification apportée.
- **Partage dans les Mêmes Conditions (SA)** : tout dérivé doit être
  diffusé sous la même licence CC BY-SA 4.0.
- **Pas de restriction commerciale** : la réutilisation, y compris
  dans un cadre lucratif, est autorisée tant que les conditions BY et
  SA sont respectées.

## Modèle d'attribution

Pour citer l'application ou réutiliser ses contenus :

> *Le Scolan Nguyen, V. (2026). Triangle Pédagogique Augmenté
> [Application web]. MaProfBranchee.
> https://triangle.maprofbranchee.fr — CC BY-SA 4.0.*

Pour citer l'article de référence :

> *Le Scolan Nguyen, V. (2026). Le triangle pédagogique augmenté par
> l'IA : une nouvelle grammaire de l'apprentissage. MaProfBranchee.
> https://maprofbranchee.fr/le-triangle-pedagogique-augmente-par-lia-une-nouvelle-grammaire-de-lapprentissage/ — CC BY-SA 4.0.*

---

## Hors périmètre CC BY-SA 4.0

Les éléments suivants **ne sont pas couverts** par cette licence et
relèvent d'autres régimes :

- Le **code source** de l'application : licence MIT, voir LICENSE.
- La **marque "MaProfBranchee"**, l'**avatar/portrait** de l'auteure,
  les **logos** et l'**identité visuelle** : tous droits réservés,
  voir NOTICE.md.
- Les **citations institutionnelles** intégrées dans l'application
  (Cadre juin 2025, BO, Eduscol, CNIL) : restent propriété de leurs
  auteurs et sont reproduites au titre du droit de citation.
- Les **ressources tierces** liées (parcours Pix IA, P2IA Eduscol,
  blog MaProfBranchee) : voir leurs conditions propres.
```

---

## 4. Création du fichier `NOTICE.md` (racine du repo)

**Chemin** : `/NOTICE.md`

```markdown
# NOTICE — Marque, identité visuelle et avatar

## Marque déposée d'usage

Le nom **« MaProfBranchee »** est utilisé comme marque par
Vanessa Le Scolan Nguyen pour identifier ses productions pédagogiques
et son blog professionnel (https://maprofbranchee.fr).

Cette marque, son orthographe (sans accent), ses déclinaisons et son
logo sont **tous droits réservés**. Ils ne sont couverts ni par la
licence MIT du code, ni par la licence CC BY-SA 4.0 des contenus.

## Avatar et portrait

Le fichier `public/avatar-mpb.png` (ainsi que ses variantes utilisées
dans l'application) représente l'auteure et constitue un élément
d'identité personnelle. Il ne peut être réutilisé, modifié ou
redistribué sans autorisation expresse.

## Conditions d'usage de la marque dans les dérivés

Dans le cadre d'une réutilisation autorisée par CC BY-SA 4.0 ou MIT :

- ✅ **Vous pouvez** mentionner « basé sur le travail de
  MaProfBranchee » ou « adapté du Triangle Pédagogique Augmenté de
  MaProfBranchee » à titre d'attribution.
- ❌ **Vous ne pouvez pas** présenter votre dérivé comme étant un
  produit officiel MaProfBranchee, utiliser le logo ou l'avatar, ni
  laisser entendre une approbation par l'auteure de votre version
  modifiée.

Pour toute demande relative à la marque ou à l'identité visuelle :
contact via le blog https://maprofbranchee.fr.
```

---

## 5. Modification de `README.md`

Ajouter (ou remplacer si une section licence existe déjà) la section suivante en fin de README, juste avant la section finale :

```markdown
## Licences et réutilisation

Ce projet utilise une **triple licence** différenciée par périmètre :

| Périmètre | Licence | Fichier |
|---|---|---|
| Code source (JS/JSX/CSS/HTML/config) | **MIT** | [LICENSE](./LICENSE) |
| Contenus pédagogiques, schémas, textes | **CC BY-SA 4.0** | [LICENSE-CONTENT.md](./LICENSE-CONTENT.md) |
| Marque, avatar, identité visuelle | **Tous droits réservés** | [NOTICE.md](./NOTICE.md) |

### Pourquoi pas la clause NC ?

Cette application est un **artefact de recherche-action** dont la
finalité est la diffusion vertueuse auprès de la communauté
enseignante. La clause "Non Commercial" (NC) bloquerait en pratique
des usages institutionnels légitimes (formation continue rémunérée,
intégration dans des manuels scolaires certifiés, déploiement
académique avec frais), tout en n'apportant qu'une protection
théorique faible. La clause **SA** (Partage dans les Mêmes
Conditions) suffit à garantir que tout dérivé reste libre.

Voir l'argumentaire complet d'Arnaud Champollion sur les licences
ouvertes en éducation pour les références théoriques de ce choix.

### Citer ce travail

```bibtex
@misc{lescolannguyen2026triangle,
  author = {Le Scolan Nguyen, Vanessa},
  title = {Triangle Pédagogique Augmenté},
  year = {2026},
  publisher = {MaProfBranchee},
  url = {https://triangle.maprofbranchee.fr},
  note = {Application web sous licence CC BY-SA 4.0 (contenus) et MIT (code)}
}
```
```

---

## 6. Modification de `package.json`

Mettre à jour le champ `license` pour refléter la licence du **code** (le package npm ne concerne que le code, pas les contenus) :

```json
{
  "...": "...",
  "license": "MIT",
  "author": {
    "name": "Vanessa Le Scolan Nguyen",
    "url": "https://maprofbranchee.fr"
  },
  "...": "..."
}
```

✅ Si le champ `license` était absent ou avait une valeur incohérente, le remplacer par `"MIT"`.

---

## 7. Modification de `src/components/Footer.jsx`

### 7.1. Remplacer la constante `CC_URL`

Localiser la ligne :

```jsx
const CC_URL = 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr';
```

La remplacer par :

```jsx
const CC_URL = 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr';
const MIT_URL = 'https://opensource.org/licenses/MIT';
```

### 7.2. Remplacer le bloc 7 (Licence)

Localiser le bloc :

```jsx
{/* Bloc 7 : Licence + Toggle de thème */}
<div className="footer-bottom">
  <div className="footer-license">
    Contenu sous licence{' '}
    <a href={CC_URL} target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>
    {' '}· © 2026 {mentionCfg.marque}
  </div>
  <ThemeToggle variant="labeled" />
</div>
```

Le remplacer par :

```jsx
{/* Bloc 7 : Licence + Toggle de thème */}
<div className="footer-bottom">
  <div className="footer-license">
    Contenus sous licence{' '}
    <a href={CC_URL} target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>
    {' · '}
    code sous{' '}
    <a href={MIT_URL} target="_blank" rel="noopener noreferrer">MIT</a>
    {' · '}
    <a href="#a-propos" onClick={goAbout}>Marque réservée</a>
    {' · © 2026 '}{mentionCfg.marque}
  </div>
  <ThemeToggle variant="labeled" />
</div>
```

✅ **Pourquoi cette structure** : trois liens distincts cliquables, chacun pointant vers la ressource canonique (deed CC, OSI MIT, page À propos pour la marque). La mention reste tenue (une seule ligne en mobile grâce au `flex-wrap` déjà présent dans le CSS).

⚠️ **Si l'attribut `goAbout` n'est pas défini quand `appScreen === 'apropos'`**, l'utilisateur ne pourra pas cliquer depuis la page À propos elle-même. Conditionner le rendu :

```jsx
{onAbout ? (
  <span>Marque réservée</span>
) : (
  <a href="#a-propos" onClick={goAbout}>Marque réservée</a>
)}
```

---

## 8. Modification de `src/components/pages/APropos.jsx`

### 8.1. Remplacer la section « Version et crédits »

Localiser la section actuelle :

```jsx
<section>
  <h2 className="text-[22px] font-semibold text-brand-teal-primary mt-10 mb-4">Version et crédits</h2>
  <div className="text-sm text-text leading-[1.8] space-y-1">
    <p>Version actuelle : {mentionCfg.version}</p>
    <p>Conception, développement et maintenance : {mentionCfg.auteure}</p>
    <p>Contact : via le blog <a href={mentionCfg.blogUrl} target="_blank" rel="noopener noreferrer" className="text-brand-teal-primary hover:underline">{mentionCfg.marque}</a></p>
  </div>
</section>
```

La remplacer par les deux sections suivantes :

```jsx
<section>
  <h2 className="text-[22px] font-semibold text-brand-teal-primary mt-10 mb-4">Licences et conditions de réutilisation</h2>
  <p className="text-sm text-text leading-[1.7] mb-4">
    Cette application est un <strong>artefact de recherche-action</strong> dont
    la finalité est la diffusion vertueuse auprès de la communauté
    enseignante. Une <strong>triple licence</strong> distingue trois
    périmètres :
  </p>

  <div className="grid md:grid-cols-3 gap-4 my-6">
    <div className="p-4 rounded-lg border border-border-subtle bg-background-elevated">
      <div className="text-xs uppercase tracking-wide text-text-muted mb-1">Contenus pédagogiques</div>
      <div className="font-semibold text-brand-teal-primary mb-2">CC BY-SA 4.0</div>
      <p className="text-xs text-text-emphasized leading-relaxed">
        Théorisation, schémas, textes des onglets, scénarios, questionnaires, fiche PDF.
        Réutilisation libre y compris commerciale, avec attribution et partage dans les mêmes conditions.
      </p>
      <a
        href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-brand-teal-primary hover:underline mt-2"
      >
        Voir la licence <ExternalLink size={11} />
      </a>
    </div>

    <div className="p-4 rounded-lg border border-border-subtle bg-background-elevated">
      <div className="text-xs uppercase tracking-wide text-text-muted mb-1">Code source</div>
      <div className="font-semibold text-brand-violet-primary mb-2">MIT</div>
      <p className="text-xs text-text-emphasized leading-relaxed">
        Application React / Vite / Tailwind. Réutilisation libre,
        y compris pour intégration dans des plateformes éducatives ou
        des forks adaptés à d'autres contextes académiques.
      </p>
      <a
        href="https://opensource.org/licenses/MIT"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-brand-violet-primary hover:underline mt-2"
      >
        Voir la licence <ExternalLink size={11} />
      </a>
    </div>

    <div className="p-4 rounded-lg border border-border-subtle bg-background-elevated">
      <div className="text-xs uppercase tracking-wide text-text-muted mb-1">Marque & identité</div>
      <div className="font-semibold text-brand-amber-primary mb-2">Tous droits réservés</div>
      <p className="text-xs text-text-emphasized leading-relaxed">
        Le nom <em>{mentionCfg.marque}</em>, le logo, l'avatar de
        l'auteure et l'identité visuelle ne sont pas couverts par
        les licences ouvertes ci-contre.
      </p>
    </div>
  </div>

  <div className="mt-6 p-4 rounded-lg bg-brand-teal-light/30 border-l-4 border-brand-teal-primary">
    <p className="text-sm text-text leading-[1.7]">
      <strong>Pourquoi pas de clause "NC" (Non Commercial) ?</strong>{' '}
      La notion de "commercial" est juridiquement floue et bloque en
      pratique des usages institutionnels vertueux (formation
      continue, manuels scolaires, déploiement académique avec
      frais). La clause <em>SA</em> (Partage dans les Mêmes
      Conditions) suffit à garantir que tout dérivé reste libre.
    </p>
  </div>

  <h3 className="text-base font-semibold text-text mt-8 mb-3">Modèle d'attribution</h3>
  <div className="p-4 rounded-lg bg-background-elevated border border-border-subtle font-mono text-xs text-text-emphasized leading-relaxed">
    Le Scolan Nguyen, V. (2026). Triangle Pédagogique Augmenté
    [Application web]. MaProfBranchee.<br />
    https://triangle.maprofbranchee.fr — CC BY-SA 4.0.
  </div>
</section>

<section>
  <h2 className="text-[22px] font-semibold text-brand-teal-primary mt-10 mb-4">Version et crédits</h2>
  <div className="text-sm text-text leading-[1.8] space-y-1">
    <p>Version actuelle : {mentionCfg.version}</p>
    <p>Conception, développement et maintenance : {mentionCfg.auteure}</p>
    <p>Contact : via le blog <a href={mentionCfg.blogUrl} target="_blank" rel="noopener noreferrer" className="text-brand-teal-primary hover:underline">{mentionCfg.marque}</a></p>
  </div>
</section>
```

✅ La grille 3 colonnes en desktop devient 1 colonne en mobile (`md:grid-cols-3` + défaut), ce qui reste lisible.

✅ L'icône `ExternalLink` est déjà importée dans `APropos.jsx` (vu dans le code existant), pas d'import supplémentaire nécessaire.

---

## 9. Modification de `index.html`

Ajouter dans le `<head>`, après la balise `<meta name="description">`, les meta tags suivants pour les agrégateurs et moteurs de recherche :

```html
<!-- Métadonnées de licence -->
<link rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/" />
<meta name="license" content="CC BY-SA 4.0 (contents) / MIT (code)" />
<meta name="author" content="Vanessa Le Scolan Nguyen" />
<meta name="dcterms.creator" content="Vanessa Le Scolan Nguyen — MaProfBranchee" />
<meta name="dcterms.rights" content="https://creativecommons.org/licenses/by-sa/4.0/" />
```

✅ **Pourquoi ces tags** : `<link rel="license">` est lu par certains moteurs (Google Scholar, certaines plateformes éducatives type Canopé) qui peuvent indexer la licence d'un contenu. Les meta Dublin Core (`dcterms.*`) sont reconnues par les agrégateurs scientifiques.

---

## 10. Tests de non-régression

### 10.1. Fichiers racine

- [ ] `LICENSE` existe à la racine, contient le texte MIT avec copyright Vanessa.
- [ ] `LICENSE-CONTENT.md` existe à la racine, fait référence à CC BY-SA 4.0.
- [ ] `NOTICE.md` existe à la racine, mentionne la marque réservée.
- [ ] `README.md` contient la nouvelle section "Licences et réutilisation".
- [ ] `package.json` a bien `"license": "MIT"`.

### 10.2. Footer

- [ ] Le footer affiche désormais : *Contenus sous licence CC BY-SA 4.0 · code sous MIT · Marque réservée · © 2026 MaProfBranchee*.
- [ ] Les trois liens fonctionnent et ouvrent les bonnes ressources (CC BY-SA, OSI MIT, ancre #a-propos).
- [ ] Sur mobile (375 px), la mention licence reste lisible avec retour à la ligne propre.
- [ ] Sur la page À propos, le lien "Marque réservée" est rendu en texte simple (non cliquable) car déjà sur la page cible.

### 10.3. Page À propos

- [ ] La nouvelle section "Licences et conditions de réutilisation" apparaît avant "Version et crédits".
- [ ] La grille 3 colonnes s'affiche correctement en desktop, passe à 1 colonne en mobile.
- [ ] Les liens vers CC BY-SA et MIT s'ouvrent dans un nouvel onglet (`target="_blank"` + `rel="noopener noreferrer"`).
- [ ] L'encadré teal "Pourquoi pas de clause NC ?" est lisible dans les deux thèmes (clair et sombre).
- [ ] Le bloc « modèle d'attribution » en font monospace est lisible et copiable.

### 10.4. Cohérence

- [ ] Aucune autre occurrence de **"BY-NC-SA"** ou **"by-nc-sa"** ne subsiste dans le projet.
  - Vérifier avec : `grep -ri "by-nc-sa\|BY-NC-SA" .` (hors `node_modules` et `.git`).
- [ ] Les meta tags du `<head>` n'introduisent pas de conflit avec d'autres meta existantes.
- [ ] Le PDF exporté ne contient pas de mention NC (vérifier `exportPdf.js` pour s'assurer qu'aucune chaîne hardcodée ne mentionne l'ancienne licence).

### 10.5. Accessibilité

- [ ] Les nouveaux liens ont un texte explicite (pas de "cliquez ici").
- [ ] Le contraste des badges de licence (teal/violet/ambre) reste WCAG AA en thème clair et sombre.

---

## 11. Vérification post-déploiement

### 11.1. Vérifier que le PDF n'embarque pas l'ancienne licence

Le fichier `src/utils/exportPdf.js` peut contenir une mention de licence dans le pied de page de la fiche. À vérifier et adapter si besoin :

```bash
grep -n "by-nc-sa\|BY-NC-SA\|Non Commercial" src/utils/exportPdf.js
```

Si une occurrence existe, la remplacer par la mention combinée :

```js
const PIED_LICENCE = 'Contenus CC BY-SA 4.0 · Code MIT · Marque MaProfBranchee tous droits réservés';
```

### 11.2. Mettre à jour la mention de licence dans `mention-recherche-action.json` si présente

Le fichier `src/config/mention-recherche-action.json` est référencé partout. Vérifier s'il contient une clé `licence` ou `license` à mettre à jour.

```bash
grep -n "licen" src/config/mention-recherche-action.json
```

---

## 12. Prompt Claude Code (à copier-coller)

```
Applique le patch de licences sur le projet Triangle Pédagogique
Augmenté (repo triangle-v2). Objectif : remplacer la licence
CC BY-NC-SA 4.0 actuelle par une triple licence différenciée
(CC BY-SA 4.0 pour les contenus, MIT pour le code, marque réservée).

ÉTAPE 1 — Création de fichiers à la racine
1. Créer /LICENSE avec le texte MIT exact fourni dans la section 2 du
   patch (avec copyright "Vanessa Le Scolan Nguyen — MaProfBranchee"
   et années 2025-2026).
2. Créer /LICENSE-CONTENT.md avec le contenu fourni en section 3.
3. Créer /NOTICE.md avec le contenu fourni en section 4.

ÉTAPE 2 — README.md
1. Ajouter en fin de README la section "Licences et réutilisation"
   décrite en section 5 du patch.

ÉTAPE 3 — package.json
1. Ajouter ou modifier le champ "license" pour qu'il vaille "MIT".
2. Ajouter ou enrichir le champ "author" comme indiqué en section 6.

ÉTAPE 4 — src/components/Footer.jsx
1. Remplacer la constante CC_URL par l'URL CC BY-SA 4.0
   (https://creativecommons.org/licenses/by-sa/4.0/deed.fr).
2. Ajouter une constante MIT_URL = 'https://opensource.org/licenses/MIT'.
3. Remplacer le bloc 7 (Licence) par le nouveau JSX décrit en
   section 7.2, en gérant le cas onAbout (lien désactivé si déjà sur
   la page À propos).

ÉTAPE 5 — src/components/pages/APropos.jsx
1. Remplacer la section "Version et crédits" par le bloc complet
   décrit en section 8 du patch : nouvelle section "Licences et
   conditions de réutilisation" (grille 3 colonnes + encadré teal +
   modèle d'attribution) suivie de la section "Version et crédits"
   inchangée.
2. Vérifier que ExternalLink est bien dans les imports (déjà présent
   dans le fichier d'origine).

ÉTAPE 6 — index.html
1. Ajouter les 5 meta/link tags listés en section 9 dans le <head>,
   après la meta description existante.

ÉTAPE 7 — Vérifications
1. Lancer : grep -ri "by-nc-sa\|BY-NC-SA\|Non Commercial" --exclude-dir=node_modules --exclude-dir=.git .
   Aucune occurrence ne doit subsister (hors documentation historique
   éventuelle dans des fichiers .md de patch passés, qui peuvent être
   conservés tels quels).
2. Vérifier src/config/mention-recherche-action.json : si une clé
   liée à la licence existe, la mettre à jour pour pointer vers
   CC BY-SA 4.0 au lieu de CC BY-NC-SA 4.0.
3. Vérifier src/utils/exportPdf.js : si une mention de licence en
   pied de page PDF existe, la remplacer par la mention combinée
   "Contenus CC BY-SA 4.0 · Code MIT · Marque MaProfBranchee tous
   droits réservés".

CONTRAINTES :
- Ne pas modifier le copyright existant des composants tiers
  (lucide-react, jsPDF, etc.) — leurs propres licences MIT/Apache
  restent valides indépendamment.
- Conserver tous les comportements actuels du footer (toggle thème,
  liens existants, CTA recherche-action).
- Conserver toutes les autres sections de la page À propos
  inchangées (démarche, sources et références, etc.).

Une fois les modifications appliquées :
- npm run build
- Vérifier visuellement le footer et la page À propos sur les deux
  thèmes (clair / sombre).
- Faire un export PDF de test pour confirmer que le pied de page ne
  mentionne plus NC.
```

---

## 13. Notes complémentaires

### 13.1. Sur l'irréversibilité des licences ouvertes

⚠️ **Une licence ouverte est irrévocable pour les versions déjà diffusées.** Si l'application a déjà circulé sous CC BY-NC-SA 4.0, les versions précédentes restent disponibles sous cette licence pour ceux qui les ont reçues. Mais c'est sans conséquence pratique : ce qui compte, c'est la licence des **versions à venir**. Aucun risque juridique à changer maintenant.

### 13.2. Sur la cohérence avec l'écosystème

Les bibliothèques tierces utilisées par l'app sont sous licences compatibles avec MIT (la plupart sont MIT, certaines Apache 2.0 ou ISC). Aucun conflit de licence n'est introduit par ce patch.

### 13.3. Sur le moment d'application

Ce patch peut être appliqué avant ou après SINPA. **L'appliquer avant** présente l'avantage de :

- Pouvoir mentionner le choix de licence ouverte pendant la présentation (signal de maturité réflexive et d'engagement diffusion).
- Permettre à des collègues présents au SINPA de réutiliser immédiatement les contenus sans buter sur la clause NC.

L'appliquer après SINPA est tout aussi valide si vous préférez ne pas multiplier les changements à la veille de la présentation.

### 13.4. Et la candidature DRANE ?

✅ **Forte plus-value DRANE** : un dossier qui mentionne explicitement une stratégie de licence ouverte non NC pour un artefact de recherche-action démontre :

- Une **maîtrise des enjeux juridiques** de la diffusion en éducation
- Un **engagement concret pour la diffusion vertueuse** (au-delà du discours)
- Une **capacité à arbitrer** entre protection et ouverture, ce qui est précisément le profil attendu d'un cadre DRANE

À mentionner dans la lettre de motivation ou dans la présentation orale du dossier.

---

*Patch_Licences_Diffusion.md — version 1.0 — 27 avril 2026*
*Auteure : Vanessa Le Scolan Nguyen — MaProfBranchee*
*Origine : argumentaire Arnaud Champollion contre les clauses NC, repris par un contributeur professionnel*
