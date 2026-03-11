# PRD — Triangle Pédagogique Augmenté

## Prompt PRD

### {TON RÔLE}

Tu es un Product Manager senior et architecte logiciel expert, spécialisé dans la rédaction de spécifications techniques destinées à des agents de vibe coding autonomes (Google Antigravity, Claude Code, Lovable, Bolt, Cursor…).

Tu maîtrises la structuration de PRDs minimalistes, précis et directement exécutables par une IA sans intervention humaine supplémentaire. Chaque section que tu produis est atomique, non ambiguë et auto-suffisante.

### {MON CONTEXTE}

Je souhaite construire **Triangle Pédagogique Augmenté** — une application web interactive de visualisation pédagogique qui permet aux enseignants et formateurs d'explorer comment l'intelligence artificielle module les trois relations fondamentales du Triangle de Houssaye (Enseignant ↔ Élève ↔ Savoir), sans jamais remplacer l'humain.

- **Stack technique cible :** React 18 + Tailwind CSS + SVG natif (pas de librairie graphique lourde)
- **Persistance des données :** Aucune — toutes les données sont en dur dans le code (fichier `data.js` séparé). Zéro backend, zéro base de données, zéro API externe.
- **Plateforme visée :** Web responsive mobile-first (375px → 1440px). Doit fonctionner en iframe sur WordPress et en plein écran standalone.
- **Outil de Vibe Coding :** Google Antigravity

### {TA MISSION}

Rédige un PRD simplifié au format Markdown, structuré pour être utilisé directement comme prompt de démarrage dans Google Antigravity.

Le document doit permettre à l'agent IA de générer l'intégralité de l'application de façon autonome, sans poser de questions.

Le PRD doit couvrir dans l'ordre :

---

## 1. Vue d'ensemble

- **Nom :** Triangle Pédagogique Augmenté
- **Baseline :** « Enseigner sans se trahir — comprendre où l'IA amplifie et où l'humain est irremplaçable »
- **Problème résolu :** Les enseignants et formateurs n'ont aucun outil interactif pour visualiser concrètement comment l'IA modifie les relations pédagogiques. Les présentations statiques (slides PowerPoint) ne permettent ni l'exploration, ni la compréhension des limites éthiques de l'IA en éducation.
- **Utilisateur cible :** Enseignants 1er et 2nd degré, formateurs, conseillers pédagogiques, cadres institutionnels (DRANE, IEN), toute personne découvrant l'IA en éducation.
- **Valeur principale :** Rendre manipulable un cadre théorique original (le Triangle de Houssaye augmenté par l'IA) en permettant l'exploration interactive des 3 axes pédagogiques, de 6 scénarios terrain, et d'un curseur éthique montrant le seuil au-delà duquel l'IA « trahit » l'enseignement.
- **Autrice du cadre théorique :** Vanessa Le Scolan — MaProfBranchée (maprofbranchee.fr)

---

## 2. Fonctionnalités core (MVP)

Par ordre de priorité :

1. **Afficher un triangle SVG interactif** avec 3 sommets (Enseignant, Élève, Savoir), 3 axes les reliant, et 1 élément IA central, quand l'application se charge.
2. **Ouvrir un panneau détail** affichant deux colonnes (« Ce que l'IA peut faire » / « Irremplaçable humain ») + un exemple terrain + un bouton CTA, quand l'utilisateur clique sur un axe du triangle.
3. **Afficher une fiche descriptive** du sommet (description + citation clé), quand l'utilisateur clique sur un sommet du triangle.
4. **Reconfigurer visuellement le triangle** en modifiant l'opacité et l'épaisseur des axes selon les poids d'activation du scénario sélectionné, quand l'utilisateur choisit un scénario dans le sélecteur déroulant.
5. **Transformer progressivement le triangle** en modifiant l'épaisseur des liens IA (de pointillés fins à trait épais recouvrant) et en affichant un message contextuel par zone, quand l'utilisateur déplace le curseur éthique (slider 0-100).
6. **Afficher un encadré d'avertissement** expliquant la boucle de surcompensation (IA fait trop → illégitimité → surcompensation → épuisement → dépendance), quand le curseur éthique dépasse 60%.
7. **Déclencher une animation d'alerte** où le cercle IA central grossit et « écrase » visuellement le triangle + afficher « Enseigner en se trahissant », quand le curseur éthique dépasse 85%.
8. **Naviguer entre 3 modes** (Explorer / Situations / Éthique) via des onglets en haut de l'interface, à tout moment.

---

## 3. Écrans & flux utilisateur

### Écran 1 — Header global (persistant)

- **Contenu :** Logo texte « Triangle Pédagogique Augmenté » à gauche (font Instrument Serif, italic). Badge « MaProfBranchée » à droite (lien vers maprofbranchee.fr, nouvel onglet).
- **Sous le header :** 3 onglets de navigation : `Explorer` (actif par défaut) | `Situations` | `Éthique`.
- **Interactions :** Clic sur un onglet → affiche le mode correspondant. L'onglet actif a un soulignement teal (#0D9488).

### Écran 2 — Mode Explorer (défaut)

- **Contenu :** Triangle SVG centré occupant 60% de la largeur viewport. Fond crème (#FAFAF9).
  - 3 sommets positionnés : Enseignant (haut centre), Élève (bas gauche), Savoir (bas droite). Chaque sommet = cercle 48px + emoji + label en dessous.
  - 3 axes = lignes SVG reliant les sommets deux à deux. Chaque axe a un label cliquable au milieu (« Préparation », « Relation », « Apprentissage »).
  - 1 élément IA central = hexagone ou cercle au centre du triangle, label « IA », couleur violet (#7C3AED), relié aux 3 axes par des lignes pointillées distinctes.
- **Interactions :**
  - Hover sur un sommet → léger scale(1.08) + glow subtil de la couleur du sommet.
  - Clic sur un sommet → ouvre `VertexDetail` (overlay mobile / panneau droit desktop).
  - Hover sur un axe → l'axe passe en épaisseur 3px + couleur saturée.
  - Clic sur un axe → ouvre `AxisDetail` (overlay mobile / panneau droit desktop).
  - Clic hors panneau ou bouton fermer (×) → ferme le panneau.
- **Transitions :** Panneau slide-in depuis la droite (desktop) ou slide-up depuis le bas (mobile). Durée 250ms ease-out.

### Écran 2a — Panneau VertexDetail

- **Contenu :** Emoji + Titre du sommet (ex: « 👩‍🏫 Enseignant »). Description (2-3 phrases). Citation clé en italique dans un encadré teal clair. Bouton « Fermer ».
- **Largeur :** 400px desktop, 100% mobile.

### Écran 2b — Panneau AxisDetail

- **Contenu :** Titre (ex: « Enseignant ↔ Savoir — La préparation »). Description courte (2 phrases). Deux colonnes côte à côte :
  - Colonne gauche `🤖 Ce que l'IA peut faire` (fond violet clair #F5F3FF) : liste de 4-5 items avec icônes.
  - Colonne droite `👤 Irremplaçable humain` (fond teal clair #F0FDFA) : liste de 4-5 items avec icônes.
  - Sur mobile : les colonnes passent en stack vertical.
- **Sous les colonnes :** Encadré « 💬 Exemple terrain » (fond crème, bordure gauche corail) avec un texte en italique signé « — V. Le Scolan ».
- **En bas :** Bouton CTA teal (texte + flèche → lien externe). Bouton « Fermer ».

### Écran 3 — Mode Situations

- **Contenu haut :** Triangle SVG identique à l'écran 2 mais les axes ont une opacité et épaisseur dynamiques. Un sélecteur déroulant `<select>` au-dessus du triangle avec les 6 scénarios.
- **Scénarios disponibles :**
  - « Préparer une évaluation CE2 en maths »
  - « Différencier pour un élève allophone »
  - « Animer une séance de révision espacée »
  - « Préparer une réunion parents »
  - « Construire une séquence interdisciplinaire »
  - « Accompagner un élève en difficulté de lecture »
- **Contenu bas (sous le triangle) :** Carte de détail du scénario sélectionné avec : titre, description du rôle de l'IA, description du rôle humain irremplaçable.
- **Interactions :** Changement de sélection → animation de transition (300ms) sur les axes : épaisseur et opacité interpolent vers les nouvelles valeurs `axes_activation`. Axe activation ≥ 0.7 = pleine opacité + épaisseur 4px. Activation 0.3-0.7 = opacité 70% + épaisseur 2px. Activation < 0.3 = opacité 30% + épaisseur 1px.

### Écran 4 — Mode Éthique

- **Contenu haut :** Triangle SVG identique mais les lignes pointillées IA (centre → axes) changent d'épaisseur selon la position du slider.
- **Contenu milieu :** Slider horizontal (input range) avec 4 zones colorées :
  - 0-25% : fond vert clair (#DCFCE7), label « IA minimale — L'IA comme calculatrice »
  - 25-60% : fond teal clair (#CCFBF1), label « IA partenaire — L'assistant invisible » + badge « RECOMMANDÉ »
  - 60-85% : fond orange clair (#FFF7ED), label « IA dominante — Attention : surcompensation »
  - 85-100% : fond rouge clair (#FEE2E2), label « IA totale — Enseigner en se trahissant »
- **Contenu bas :** Zone de message dynamique affichant le texte de la zone active du slider.
- **Interactions :**
  - Déplacement slider → les liens IA changent : 0-25% pointillés fins (strokeWidth 1, dasharray "4 4"), 25-60% trait plein (strokeWidth 2), 60-85% trait épais (strokeWidth 4) commençant à recouvrir les axes, 85-100% trait très épais (strokeWidth 8) + cercle IA animé scale(1.5) + fond pulsation rouge.
  - SI slider > 60 ALORS afficher `OvercompensationAlert` (encadré corail avec icône ⚠️ + texte boucle de surcompensation).
  - SI slider > 85 ALORS déclencher animation zone rouge : cercle IA scale de 1.0 à 1.8 en 600ms + pulsation CSS, sommets du triangle réduisent leur opacité à 40%, message « Enseigner en se trahissant » en rouge bold.

### Écran 5 — Footer (persistant)

- **Contenu :** Lien « Sources scientifiques » (ouvre une modale avec la liste des références). Texte « © MaProfBranchée — maprofbranchee.fr ». Texte « Cadre : Triangle de Houssaye (1988) augmenté par V. Le Scolan (2025) ».

### Modale Sources

- **Contenu :** Liste des références : Houssaye 1988, Dehaene 2018, Cadre MEN juin 2025, UNESCO 2024, Hattie (Visible Learning), Bloom / Anderson & Krathwohl 2001.
- **Interaction :** Clic hors modale ou bouton × → ferme.

---

## 4. Modèle de données

Fichier `data.js` exportant les constantes suivantes :

```
Vertex {
  id: string               // "enseignant" | "eleve" | "savoir"
  label: string            // "Enseignant" | "Élève" | "Savoir"
  emoji: string            // "👩‍🏫" | "👧" | "📚"
  color: string            // hex couleur
  position: { x: number, y: number }  // pourcentage 0-100 du viewBox SVG
  description: string      // 2-3 phrases
  citation: string         // citation clé en italique
}

Axis {
  id: string               // "ens-sav" | "ens-elev" | "elev-sav"
  from: string             // vertex id
  to: string               // vertex id
  label: string            // "La préparation" | "La relation" | "L'apprentissage"
  color: string            // hex
  ia_can_do: string[]      // 4-5 items
  human_only: string[]     // 4-5 items
  terrain_example: string  // texte signé
  cta: { label: string, url: string }
}

Scenario {
  id: string               // "eval-maths-ce2" etc.
  title: string
  axes_activation: { "ens-sav": number, "ens-elev": number, "elev-sav": number }  // 0.0 à 1.0
  ia_role: string
  human_role: string
}

EthicsZone {
  min: number              // 0, 25, 60, 85
  max: number              // 25, 60, 85, 100
  bgColor: string          // hex
  label: string
  message: string
  iaStrokeWidth: number    // 1, 2, 4, 8
  iaDashArray: string      // "4 4" | "none" | "none" | "none"
}

Reference {
  author: string
  year: number
  title: string
  detail: string
}
```

---

## 5. Logique métier

```
// --- Navigation ---
SI utilisateur clique onglet
  ALORS activeTab = onglet.id
  ALORS afficher le mode correspondant
  ALORS masquer les autres modes
  ALORS fermer tout panneau ouvert

// --- Mode Explorer : clic sommet ---
SI utilisateur clique sur un Vertex
  ALORS openPanel = { type: "vertex", data: Vertex }
  ALORS animer slide-in du panneau VertexDetail

// --- Mode Explorer : clic axe ---
SI utilisateur clique sur un Axis
  ALORS openPanel = { type: "axis", data: Axis }
  ALORS animer slide-in du panneau AxisDetail

// --- Fermeture panneau ---
SI utilisateur clique bouton fermer OU clique hors panneau
  ALORS openPanel = null
  ALORS animer slide-out du panneau

// --- Mode Situations : changement scénario ---
SI utilisateur sélectionne un Scenario dans le dropdown
  ALORS activeScenario = Scenario
  POUR CHAQUE axe dans axes_activation
    SI activation >= 0.7
      ALORS axe.opacity = 1.0, axe.strokeWidth = 4
    SINON SI activation >= 0.3
      ALORS axe.opacity = 0.7, axe.strokeWidth = 2
    SINON
      ALORS axe.opacity = 0.3, axe.strokeWidth = 1
  ALORS afficher carte détail avec ia_role et human_role

// --- Mode Éthique : curseur ---
SI utilisateur déplace le slider (valeur = sliderValue 0-100)
  ALORS déterminer la EthicsZone active (min <= sliderValue < max)
  ALORS appliquer iaStrokeWidth et iaDashArray aux liens IA SVG
  ALORS afficher le message de la zone active
  
  SI sliderValue > 60
    ALORS afficher OvercompensationAlert (visible = true)
  SINON
    ALORS masquer OvercompensationAlert (visible = false)

  SI sliderValue > 85
    ALORS cercle IA : transform scale(1.8), animation pulse
    ALORS sommets : opacity = 0.4
    ALORS afficher message zone rouge en bold rouge
  SINON
    ALORS cercle IA : transform scale(1.0), pas de pulse
    ALORS sommets : opacity = 1.0

// --- Modale Sources ---
SI utilisateur clique "Sources scientifiques"
  ALORS showSourcesModal = true
SI utilisateur clique hors modale OU bouton ×
  ALORS showSourcesModal = false

// --- Responsive ---
SI viewport.width < 768px
  ALORS panneau = overlay plein écran (bottom sheet)
  ALORS colonnes AxisDetail = stack vertical
  ALORS triangle occupe 90% largeur
SINON
  ALORS panneau = slide-in droit 400px
  ALORS colonnes AxisDetail = côte à côte
  ALORS triangle occupe 60% largeur
```

---

## 6. Stack & contraintes techniques

- **Framework :** React 18 (JSX, hooks uniquement, pas de classes)
- **Styling :** Tailwind CSS (classes utilitaires uniquement, pas de CSS custom sauf pour les animations SVG)
- **Visualisation :** SVG natif intégré dans les composants React (pas de D3, pas de Chart.js, pas de librairie graphique)
- **Typographies :** Google Fonts — `DM Sans` (corps, UI) + `Instrument Serif` (titres, baseline). Charger via `<link>` dans le `<head>`.
- **Couleurs :** palette fixe — teal `#0D9488`, violet `#7C3AED`, corail `#EA580C`, bleu `#2563EB`, dark `#1E1B4B`, fond `#FAFAF9`
- **Animations :** CSS transitions uniquement (pas de Framer Motion). `transition: all 250ms ease-out` pour les panneaux, `transition: all 300ms ease` pour les changements SVG.
- **Données :** Fichier `data.js` séparé exportant `VERTICES`, `AXES`, `SCENARIOS`, `ETHICS_ZONES`, `REFERENCES`. Aucun fetch, aucune API, aucun localStorage.
- **Composants :** `App.jsx`, `TriangleSVG.jsx`, `VertexDetail.jsx`, `AxisDetail.jsx`, `ScenarioSelector.jsx`, `EthicsSlider.jsx`, `OvercompensationAlert.jsx`, `SourcesModal.jsx`, `Header.jsx`, `Footer.jsx`, `data.js`
- **Accessibilité :** `aria-label` sur toutes les zones SVG cliquables. Navigation clavier (tab + enter). Contraste WCAG AA.
- **Performance :** Pas de dépendance externe au-delà de React et Tailwind. Chargement < 2 secondes. Fonctionne 100% offline après chargement initial.
- **Intégration :** L'app doit fonctionner dans une iframe (pas de `X-Frame-Options` restrictif). Hauteur auto-adaptative.

---

## 7. Critères d'acceptation

- [ ] Le triangle SVG s'affiche au chargement avec 3 sommets, 3 axes, 1 élément IA central.
- [ ] Le clic sur chaque axe ouvre le panneau AxisDetail correspondant avec les bonnes données.
- [ ] Le clic sur chaque sommet ouvre le panneau VertexDetail correspondant.
- [ ] Le panneau se ferme au clic sur × ou hors du panneau.
- [ ] Les 3 onglets (Explorer / Situations / Éthique) switchent correctement le mode affiché.
- [ ] Le sélecteur de scénario contient 6 options et reconfigure les axes du triangle au changement.
- [ ] Les axes changent d'opacité et épaisseur selon les poids `axes_activation` du scénario.
- [ ] Le slider éthique (0-100) modifie en temps réel l'épaisseur et le style des liens IA SVG.
- [ ] L'encadré surcompensation apparaît quand slider > 60 et disparaît quand slider ≤ 60.
- [ ] L'animation zone rouge se déclenche quand slider > 85 (scale IA, opacité sommets réduite).
- [ ] La modale Sources s'ouvre et se ferme correctement.
- [ ] L'affichage est correct et fonctionnel sur mobile 375px (panneau overlay, colonnes empilées).
- [ ] L'affichage est correct sur desktop 1440px (panneau latéral, colonnes côte à côte).
- [ ] Toutes les zones cliquables sont accessibles au clavier (tab + enter).
- [ ] L'app fonctionne en iframe sans erreur.

---

## 8. Données complètes à intégrer dans `data.js`

### VERTICES

```javascript
export const VERTICES = [
  {
    id: "enseignant",
    label: "Enseignant",
    emoji: "👩‍🏫",
    color: "#0D9488",
    position: { x: 50, y: 8 },
    description: "Le décideur pédagogique. Il conçoit, transmet, accompagne et évalue. L'IA est son assistant invisible, pas son remplaçant. Chaque choix pédagogique lui appartient.",
    citation: "L'IA propose, l'enseignant valide."
  },
  {
    id: "eleve",
    label: "Élève",
    emoji: "👧",
    color: "#2563EB",
    position: { x: 15, y: 82 },
    description: "L'apprenant actif. Il construit ses savoirs par l'erreur, l'engagement et la répétition espacée. L'IA peut l'accompagner, mais l'effort cognitif lui appartient.",
    citation: "Supprimez l'erreur accompagnée, vous supprimez l'apprentissage."
  },
  {
    id: "savoir",
    label: "Savoir",
    emoji: "📚",
    color: "#EA580C",
    position: { x: 85, y: 82 },
    description: "Les programmes, les compétences, les connaissances. L'IA peut les reformuler, les structurer, les adapter — mais ne les légitime pas. Seuls les cadres institutionnels et l'expertise enseignante le font.",
    citation: "L'IA accélère, reformule, structure. L'humain contextualise, juge, invente."
  }
];
```

### AXES

```javascript
export const AXES = [
  {
    id: "ens-sav",
    from: "enseignant",
    to: "savoir",
    label: "La préparation",
    color: "#7C3AED",
    ia_can_do: [
      "Générer des séquences pédagogiques complètes",
      "Différencier les exercices en 3 niveaux",
      "Structurer des programmations annuelles",
      "Créer des évaluations avec grille de compétences",
      "Proposer des ressources alignées sur les programmes"
    ],
    human_only: [
      "Juger la pertinence didactique pour SA classe",
      "Adapter au contexte local et au vécu des élèves",
      "Choisir la progression en fonction du groupe",
      "Prioriser selon les besoins observés au quotidien",
      "Valider la conformité aux programmes officiels"
    ],
    terrain_example: "En CE2, j'utilise Claude pour générer 3 niveaux de différenciation sur une leçon de grammaire. L'IA me propose les variantes en 2 minutes. Mais c'est moi qui décide laquelle colle à ma classe, à mes élèves, à ce qu'on a fait la semaine dernière.",
    cta: { label: "Découvrir la méthode CRAFT", url: "https://maprofbranchee.fr/outils-ia/" }
  },
  {
    id: "ens-elev",
    from: "enseignant",
    to: "eleve",
    label: "La relation",
    color: "#0D9488",
    ia_can_do: [
      "Fournir du feedback instantané sur les productions",
      "Personnaliser les parcours d'apprentissage",
      "Alerter sur les difficultés repérées par analyse",
      "Générer des rapports de suivi individualisés",
      "Adapter le rythme aux besoins détectés"
    ],
    human_only: [
      "L'empathie et l'écoute face à un élève en difficulté",
      "L'intuition pédagogique forgée par l'expérience",
      "La gestion émotionnelle et le regard bienveillant",
      "La posture d'autorité éducative et de confiance",
      "Repérer ce qu'aucun algorithme ne voit : le non-dit"
    ],
    terrain_example: "Quand un élève pleure parce qu'il ne comprend pas, aucune IA ne peut s'asseoir à côté de lui et lui dire : 'Regarde, on va reprendre ensemble'. L'empathie n'est pas automatisable.",
    cta: { label: "Explorer les GPTs éducatifs", url: "https://maprofbranchee.fr/outils-ia/" }
  },
  {
    id: "elev-sav",
    from: "eleve",
    to: "savoir",
    label: "L'apprentissage",
    color: "#2563EB",
    ia_can_do: [
      "Planifier des révisions espacées optimales",
      "Générer des quiz adaptatifs personnalisés",
      "Reformuler un concept de multiples façons",
      "Offrir un tutorat individualisé (type Mathia)",
      "Proposer des exercices de fluence calibrés"
    ],
    human_only: [
      "La compréhension profonde et le raisonnement",
      "La créativité et l'invention personnelle",
      "L'esprit critique face à une information",
      "La métacognition : savoir qu'on sait ou qu'on ne sait pas",
      "Le transfert de connaissances à de nouvelles situations"
    ],
    terrain_example: "Un élève qui utilise l'IA pour avoir la réponse sans chercher, c'est comme un sportif qui prend l'ascenseur au lieu de monter les escaliers. Il n'a pas triché, il a juste sauté l'entraînement. Et c'est l'entraînement qui fait progresser.",
    cta: { label: "Lire l'article sur IA et mémorisation", url: "https://maprofbranchee.fr/" }
  }
];
```

### SCENARIOS

```javascript
export const SCENARIOS = [
  {
    id: "eval-maths-ce2",
    title: "Préparer une évaluation CE2 en maths",
    axes_activation: { "ens-sav": 0.9, "ens-elev": 0.3, "elev-sav": 0.6 },
    ia_role: "L'IA génère les exercices, propose 3 niveaux de difficulté et crée la grille A/PA/NA alignée sur les compétences du programme.",
    human_role: "L'enseignant choisit les compétences évaluées, ajuste la difficulté au vécu de la classe et décide des adaptations pour les élèves à besoins particuliers."
  },
  {
    id: "differenciation-allophone",
    title: "Différencier pour un élève allophone",
    axes_activation: { "ens-sav": 0.5, "ens-elev": 0.9, "elev-sav": 0.8 },
    ia_role: "L'IA adapte les consignes, simplifie le vocabulaire, propose des supports visuels et génère des exercices de langue ciblés.",
    human_role: "L'enseignant ajuste au vécu culturel de l'élève, gère l'intégration sociale dans le groupe et repère les blocages émotionnels liés au déracinement."
  },
  {
    id: "revision-espacee",
    title: "Animer une séance de révision espacée",
    axes_activation: { "ens-sav": 0.4, "ens-elev": 0.5, "elev-sav": 0.9 },
    ia_role: "L'IA planifie les rappels selon la courbe de l'oubli, génère les quiz et ajuste la difficulté en temps réel.",
    human_role: "L'enseignant observe les stratégies des élèves, intervient sur les blocages et encourage la métacognition : 'Comment as-tu retrouvé la réponse ?'"
  },
  {
    id: "reunion-parents",
    title: "Préparer une réunion parents",
    axes_activation: { "ens-sav": 0.5, "ens-elev": 0.9, "elev-sav": 0.2 },
    ia_role: "L'IA structure le compte-rendu, synthétise les observations de la période et propose une trame de points à aborder.",
    human_role: "L'enseignant formule les messages sensibles, adapte le ton à chaque famille et gère les émotions dans l'échange direct."
  },
  {
    id: "sequence-interdisciplinaire",
    title: "Construire une séquence interdisciplinaire",
    axes_activation: { "ens-sav": 0.9, "ens-elev": 0.6, "elev-sav": 0.7 },
    ia_role: "L'IA suggère des croisements entre programmes, génère la trame de séquence et propose des activités liant les matières.",
    human_role: "L'enseignant sélectionne les croisements pertinents pour sa classe, ajuste le rythme et s'assure de la cohérence pédagogique globale."
  },
  {
    id: "difficulte-lecture",
    title: "Accompagner un élève en difficulté de lecture",
    axes_activation: { "ens-sav": 0.3, "ens-elev": 0.7, "elev-sav": 0.9 },
    ia_role: "L'IA propose des textes adaptés au niveau, génère des exercices de fluence progressifs et fournit des reformulations multiples.",
    human_role: "L'enseignant guide la compréhension fine, repère les stratégies de décodage de l'élève et maintient la motivation par la relation de confiance."
  }
];
```

### ETHICS_ZONES

```javascript
export const ETHICS_ZONES = [
  {
    min: 0, max: 25,
    bgColor: "#DCFCE7",
    label: "IA minimale",
    message: "L'IA comme calculatrice — un outil ponctuel. L'enseignant fait l'essentiel. L'IA intervient sur des tâches isolées (correction orthographique, mise en forme).",
    iaStrokeWidth: 1,
    iaDashArray: "4 4"
  },
  {
    min: 25, max: 60,
    bgColor: "#CCFBF1",
    label: "IA partenaire — RECOMMANDÉ",
    message: "L'assistant invisible — l'IA assiste sur la préparation et la différenciation. L'enseignant reste le pilote. C'est la zone d'équilibre : l'IA amplifie sans remplacer.",
    iaStrokeWidth: 2,
    iaDashArray: "none"
  },
  {
    min: 60, max: 85,
    bgColor: "#FFF7ED",
    label: "IA dominante — Attention",
    message: "L'IA génère la majorité des contenus et évaluations. Risque : la boucle de surcompensation s'enclenche. L'enseignant perd progressivement la main sur ses choix pédagogiques.",
    iaStrokeWidth: 4,
    iaDashArray: "none"
  },
  {
    min: 85, max: 100,
    bgColor: "#FEE2E2",
    label: "IA totale — ZONE ROUGE",
    message: "Enseigner en se trahissant. L'IA fait tout. L'enseignant n'a plus de rôle pédagogique. Le triangle s'effondre : la relation humaine disparaît, l'apprentissage devient mécanique.",
    iaStrokeWidth: 8,
    iaDashArray: "none"
  }
];
```

### REFERENCES

```javascript
export const REFERENCES = [
  { author: "Houssaye, J.", year: 1988, title: "Le Triangle pédagogique", detail: "Modèle fondateur des relations Enseignant-Élève-Savoir" },
  { author: "Dehaene, S.", year: 2018, title: "Apprendre ! Les talents du cerveau, le défi des machines", detail: "4 piliers de l'apprentissage : attention, engagement actif, retour sur erreur, consolidation" },
  { author: "MEN", year: 2025, title: "Cadre d'usage de l'IA en éducation", detail: "IA générative réservée enseignants, élèves à partir du CM1 uniquement" },
  { author: "UNESCO", year: 2024, title: "Compétences IA pour les enseignants", detail: "15 compétences en 5 dimensions : éthique, pédagogie, données, culture numérique, développement pro" },
  { author: "Hattie, J.", year: 2009, title: "Visible Learning", detail: "Méta-analyse : le feedback a l'une des plus grandes tailles d'effet sur l'apprentissage" },
  { author: "Anderson, L.W. & Krathwohl, D.R.", year: 2001, title: "Taxonomie de Bloom révisée", detail: "6 niveaux cognitifs : mémoriser, comprendre, appliquer, analyser, évaluer, créer" }
];
```

### OVERCOMPENSATION_LOOP (texte de l'alerte)

```javascript
export const OVERCOMPENSATION_LOOP = {
  title: "⚠️ La boucle de surcompensation",
  steps: [
    "L'IA fait de plus en plus de tâches à la place de l'enseignant",
    "L'enseignant ressent un sentiment d'illégitimité ('l'IA fait mieux que moi')",
    "Il surcompense en travaillant plus pour 'justifier' sa valeur",
    "Épuisement professionnel et perte de repères pédagogiques",
    "Dépendance accrue à l'IA pour compenser la fatigue",
    "Retour à l'étape 1 — la boucle se referme"
  ],
  conclusion: "La solution : rester dans la zone 'IA partenaire' (25-60%). L'IA amplifie, elle ne remplace pas."
};
```

---

## Prompt de démarrage

```
Lis attentivement le PRD ci-dessus dans son intégralité. Génère une application React 18 + Tailwind CSS complète et fonctionnelle en respectant EXACTEMENT les spécifications décrites : un triangle SVG interactif avec 3 sommets cliquables (Enseignant, Élève, Savoir) et un élément IA central, 3 modes de navigation (Explorer avec panneaux détail, Situations avec 6 scénarios reconfigurables, Éthique avec slider 0-100 et alertes dynamiques), toutes les données dans un fichier data.js séparé utilisant les constantes VERTICES, AXES, SCENARIOS, ETHICS_ZONES, REFERENCES et OVERCOMPENSATION_LOOP fournies dans la section 8, le design responsive mobile-first avec la palette teal/violet/corail/bleu sur fond #FAFAF9 et les fonts DM Sans + Instrument Serif, les animations CSS de 250ms ease-out pour les panneaux et 300ms ease pour les transitions SVG, et l'accessibilité clavier + aria-label sur toutes les zones interactives. Aucune API externe, aucun backend, aucun localStorage. Livre tous les fichiers prêts à déployer.
```

---

### {TES CONTRAINTES — rappel}

- Markdown valide, prêt à copier-coller dans Google Antigravity
- Chaque section = bloc indépendant utilisable isolément comme prompt
- Fonctionnalités en verbe d'action + résultat observable
- Logique métier en pseudo-code SI/ALORS/SINON exclusivement
- Champs du modèle de données avec types explicites
- Zéro feature post-MVP mentionnée
- Données complètes fournies dans la section 8 pour autonomie totale de l'agent
