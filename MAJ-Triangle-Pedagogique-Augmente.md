# MISE À JOUR — Triangle Pédagogique Augmenté

## Contexte

L'application Triangle Pédagogique Augmenté est déjà déployée et fonctionnelle. Ce document décrit les modifications à apporter pour renforcer la rigueur théorique du modèle suite à une analyse critique basée sur les cadres de Jean Houssaye (Triangle Pédagogique, 1988) et André Tricot (psychologie cognitive, charge cognitive).

**Règle absolue : ne casser aucune fonctionnalité existante.** Toutes les modifications sont des ajouts ou des enrichissements. L'architecture, la navigation, le design et les données existantes restent intacts.

---

## Modification 1 — Intégrer le concept du « mort » (Houssaye)

### Principe théorique

Dans le modèle de Houssaye, quand deux pôles sont en relation privilégiée, le troisième est nécessairement marginalisé — il « fait le mort ». C'est une mécanique fondamentale, pas un défaut :

- Axe Enseignant ↔ Savoir actif (processus « enseigner ») → l'Élève fait le mort
- Axe Enseignant ↔ Élève actif (processus « former ») → le Savoir fait le mort
- Axe Élève ↔ Savoir actif (processus « apprendre ») → l'Enseignant fait le mort

### Modifications à apporter

**Dans le Mode Explorer — panneau AxisDetail de chaque axe :**

Ajouter une troisième section sous les colonnes « Ce que l'IA peut faire » et « Irremplaçable humain ». Cette section s'appelle « ⚠️ Le pôle en retrait » et contient :

Pour l'axe Enseignant ↔ Savoir (La préparation) :
- Titre : « Quand cet axe domine, l'Élève fait le mort »
- Texte : « L'enseignant se concentre sur le savoir (préparation, programmation, didactique). L'élève est temporairement absent de la réflexion. C'est normal et nécessaire — mais si l'IA accélère tellement la préparation que l'enseignant ne pense plus à ses élèves concrets en préparant, le "mort" devient un oublié. »
- Fond : gris clair avec bordure gauche orange (#EA580C)

Pour l'axe Enseignant ↔ Élève (La relation) :
- Titre : « Quand cet axe domine, le Savoir fait le mort »
- Texte : « L'enseignant se concentre sur la relation (écoute, accompagnement, gestion émotionnelle). Le contenu disciplinaire passe au second plan. L'IA peut maintenir un fil de rigueur disciplinaire pendant que l'enseignant gère l'humain — mais attention à ne pas vider la relation de tout contenu d'apprentissage. »
- Fond : gris clair avec bordure gauche orange

Pour l'axe Élève ↔ Savoir (L'apprentissage) :
- Titre : « Quand cet axe domine, l'Enseignant fait le mort »
- Texte : « L'élève est en prise directe avec le savoir (autonomie, exercices, révisions). L'enseignant s'efface. L'IA peut tenir ce rôle de tuteur individualisé — mais un algorithme ne repère pas que l'élève fait semblant de comprendre. Le "mort" ici, c'est le regard humain. »
- Fond : gris clair avec bordure gauche orange

**Dans le Mode Situations — carte de détail de chaque scénario :**

Ajouter un champ supplémentaire dans chaque carte de scénario. Sous « Rôle de l'IA » et « Rôle humain irremplaçable », ajouter :
- Titre : « Pôle en retrait »
- Contenu : une phrase identifiant quel sommet « fait le mort » dans ce scénario et ce que ça implique.

Voici les valeurs pour chaque scénario :

Scénario « Préparer une évaluation CE2 en maths » :
- Pôle en retrait : « L'Élève fait le mort — l'enseignant pense au programme, pas encore aux élèves concrets. L'IA aide à produire vite, mais c'est au moment de valider que l'enseignant doit "réveiller" l'élève dans sa tête. »

Scénario « Différencier pour un élève allophone » :
- Pôle en retrait : « Le Savoir disciplinaire fait le mort — l'attention est sur l'élève et ses besoins spécifiques. Vigilance : la différenciation ne doit pas vider l'exercice de son contenu d'apprentissage. »

Scénario « Animer une séance de révision espacée » :
- Pôle en retrait : « L'Enseignant fait le mort — l'élève travaille en autonomie avec l'outil. Le risque : confondre activité (l'élève clique) et apprentissage (l'élève comprend). »

Scénario « Préparer une réunion parents » :
- Pôle en retrait : « Le Savoir fait le mort — la communication porte sur la relation, pas sur les contenus. L'IA structure le discours, mais l'enseignant doit ancrer l'échange dans des faits d'apprentissage concrets. »

Scénario « Construire une séquence interdisciplinaire » :
- Pôle en retrait : « Aucun pôle ne fait clairement le mort — c'est pourquoi ce type de séquence est le plus complexe à concevoir. L'IA peut structurer les croisements, mais l'enseignant doit accepter que chaque séance privilégie un axe. »

Scénario « Accompagner un élève en difficulté de lecture » :
- Pôle en retrait : « L'Enseignant fait partiellement le mort — l'élève est en prise directe avec le texte, accompagné par l'outil. Mais un outil de fluence ne détecte pas l'anxiété de lecture. L'enseignant doit rester en observation active. »

**Dans le Mode Éthique — curseur éthique :**

Ajouter un texte supplémentaire dans le message de la zone 60-85% (IA dominante). Après le texte existant sur la surcompensation, ajouter :
- « Du point de vue du Triangle : quand l'IA domine, ce n'est plus l'enseignant qui choisit quel pôle fait le mort — c'est l'algorithme qui décide à sa place. La tension pédagogique n'est plus un choix professionnel conscient, elle devient une conséquence subie. »

**Modification visuelle sur le triangle SVG :**

Dans le Mode Situations, quand un scénario est sélectionné, le sommet qui « fait le mort » doit avoir une opacité réduite à 0.4 et un contour en pointillés. Les deux sommets actifs gardent leur opacité à 1.0. Cela rend visible la mécanique du mort sans explication textuelle supplémentaire.

---

## Modification 2 — Intégrer la charge cognitive (Tricot / Sweller)

### Principe théorique

La théorie de la charge cognitive (Sweller, 1988) distingue trois types de charge : intrinsèque (liée à la difficulté du contenu), extrinsèque (liée à la présentation — réductible par le design) et germane (liée à l'effort d'apprentissage — celle qu'on veut maximiser). L'IA peut réduire la charge extrinsèque de l'enseignant, mais elle peut aussi produire des contenus qui augmentent la charge extrinsèque de l'élève sans que personne ne s'en rende compte.

### Modifications à apporter

**Dans le panneau AxisDetail de l'axe Élève ↔ Savoir (L'apprentissage) :**

Ajouter un encadré spécifique après les colonnes IA/Humain. Cet encadré a un fond bleu clair (#EFF6FF), une bordure gauche bleue (#2563EB), et contient :

- Titre : « 🧠 Point neuro : la charge cognitive »
- Texte : « L'IA peut générer des exercices, des quiz, des reformulations. Mais respectent-ils la charge cognitive de l'élève ? Un exercice qui mélange texte, image et consigne orale surcharge la mémoire de travail (effet de redondance — Sweller). Un exercice trop guidé pour un élève avancé freine son apprentissage (effet d'expertise inversée). L'enseignant reste le seul à pouvoir évaluer si le contenu généré est cognitivement adapté à SES élèves. »

**Dans le panneau AxisDetail de l'axe Enseignant ↔ Savoir (La préparation) :**

Ajouter un encadré similaire :

- Titre : « 🧠 Point neuro : l'effet de génération »
- Texte : « La recherche montre que l'effort cognitif investi dans la production d'un contenu améliore sa mémorisation et sa compréhension (effet de génération — Slamecka & Graf, 1978). Quand un enseignant construit lui-même sa séquence, il apprend quelque chose sur sa matière et sur ses élèves. Quand l'IA la génère à sa place, cet apprentissage professionnel disparaît. Le gain de temps est réel — mais le coût caché est une érosion progressive de l'expertise didactique. »

---

## Modification 3 — Distinguer gain de temps et gain pédagogique

### Principe

Gagner du temps sur la préparation n'est pas automatiquement un gain pédagogique. Le temps gagné n'a de valeur que s'il est réinvesti dans la relation pédagogique, l'observation des élèves ou la réflexion didactique.

### Modifications à apporter

**Dans la section « Ce que l'IA ne remplacera jamais » :**

Ajouter un sixième item à la liste existante des HUMAN_IRREPLACEABLES :
- Emoji : ⏱️
- Texte : « La capacité à transformer du temps gagné en temps pédagogique utile — observer, écouter, ajuster »

**Dans le Mode Éthique — zone « IA partenaire » (25-60%) :**

Modifier le message de cette zone. Remplacer le message existant par :
- « L'assistant invisible — l'IA assiste sur la préparation et la différenciation. L'enseignant reste le pilote. C'est la zone d'équilibre : l'IA amplifie sans remplacer. Le temps gagné n'est un vrai gain que s'il est réinvesti dans l'observation des élèves, la relation pédagogique ou la réflexion sur sa pratique — pas dans davantage de production. »

---

## Modification 4 — Transparence sur les sources et les limites

### Principe

Un concept original (boucle de surcompensation) ne doit pas être présenté avec le même statut visuel qu'un concept validé empiriquement (4 piliers de Dehaene, charge cognitive de Sweller).

### Modifications à apporter

**Dans la modale Sources (footer) :**

Réorganiser les références en deux catégories visuellement distinctes :

Catégorie 1 — « Cadres théoriques et recherche » (fond blanc, bordure gauche teal) :
- Houssaye, J. (1988). Le Triangle pédagogique — et le processus du « mort ».
- Dehaene, S. (2018). Apprendre ! — 4 piliers de l'apprentissage.
- Sweller, J. (1988). Cognitive Load Theory — charge intrinsèque, extrinsèque, germane.
- Slamecka, N.J. & Graf, P. (1978). The Generation Effect — l'effort de production améliore la mémorisation.
- Anderson, L.W. & Krathwohl, D.R. (2001). Taxonomie de Bloom révisée.
- Hattie, J. (2009). Visible Learning — taille d'effet du feedback.
- MEN (2025). Cadre d'usage de l'IA en éducation.
- UNESCO (2024). Compétences IA pour les enseignants.

Catégorie 2 — « Observations de terrain (non validées empiriquement) » (fond crème, bordure gauche corail) :
- Le Scolan, V. (2025). La boucle de surcompensation — observation clinique issue de 200+ enseignants formés à l'IA. Concept original, non encore soumis à validation par la recherche. Décrit le mécanisme : IA fait trop → sentiment d'illégitimité → surcompensation → épuisement → dépendance accrue.
- Le Scolan, V. (2025). Le Triangle Pédagogique Augmenté — extension du modèle de Houssaye intégrant l'IA comme modulateur des trois relations. Cadre théorique original en cours de formalisation.

**Dans l'encadré OvercompensationAlert (curseur > 60%) :**

Ajouter en bas de l'encadré, en petit texte gris italique :
- « Concept original (V. Le Scolan, 2025) — observation de terrain issue de 200+ enseignants formés, non encore validée par une étude contrôlée. »

---

## Modification 5 — Enrichir le fichier data.js

Ajouter ces nouvelles constantes dans le fichier data.js existant, sans modifier les constantes déjà présentes :

```javascript
// --- Le processus du "mort" par axe ---
export const DEAD_POLE = {
  "ens-sav": {
    deadVertex: "eleve",
    title: "Quand cet axe domine, l'Élève fait le mort",
    text: "L'enseignant se concentre sur le savoir (préparation, programmation, didactique). L'élève est temporairement absent de la réflexion. C'est normal et nécessaire — mais si l'IA accélère tellement la préparation que l'enseignant ne pense plus à ses élèves concrets en préparant, le « mort » devient un oublié."
  },
  "ens-elev": {
    deadVertex: "savoir",
    title: "Quand cet axe domine, le Savoir fait le mort",
    text: "L'enseignant se concentre sur la relation (écoute, accompagnement, gestion émotionnelle). Le contenu disciplinaire passe au second plan. L'IA peut maintenir un fil de rigueur disciplinaire pendant que l'enseignant gère l'humain — mais attention à ne pas vider la relation de tout contenu d'apprentissage."
  },
  "elev-sav": {
    deadVertex: "enseignant",
    title: "Quand cet axe domine, l'Enseignant fait le mort",
    text: "L'élève est en prise directe avec le savoir (autonomie, exercices, révisions). L'enseignant s'efface. L'IA peut tenir ce rôle de tuteur individualisé — mais un algorithme ne repère pas que l'élève fait semblant de comprendre. Le « mort » ici, c'est le regard humain."
  }
};

// --- Pôle en retrait par scénario ---
export const SCENARIO_DEAD_POLES = {
  "eval-maths-ce2": "L'Élève fait le mort — l'enseignant pense au programme, pas encore aux élèves concrets. L'IA aide à produire vite, mais c'est au moment de valider que l'enseignant doit « réveiller » l'élève dans sa tête.",
  "differenciation-allophone": "Le Savoir disciplinaire fait le mort — l'attention est sur l'élève et ses besoins spécifiques. Vigilance : la différenciation ne doit pas vider l'exercice de son contenu d'apprentissage.",
  "revision-espacee": "L'Enseignant fait le mort — l'élève travaille en autonomie avec l'outil. Le risque : confondre activité (l'élève clique) et apprentissage (l'élève comprend).",
  "reunion-parents": "Le Savoir fait le mort — la communication porte sur la relation, pas sur les contenus. L'IA structure le discours, mais l'enseignant doit ancrer l'échange dans des faits d'apprentissage concrets.",
  "sequence-interdisciplinaire": "Aucun pôle ne fait clairement le mort — c'est pourquoi ce type de séquence est le plus complexe. L'IA peut structurer les croisements, mais l'enseignant doit accepter que chaque séance privilégie un axe.",
  "difficulte-lecture": "L'Enseignant fait partiellement le mort — l'élève est en prise directe avec le texte, accompagné par l'outil. Mais un outil de fluence ne détecte pas l'anxiété de lecture. L'enseignant doit rester en observation active."
};

// --- Encadrés neuro ---
export const NEURO_BOXES = {
  "elev-sav": {
    title: "🧠 Point neuro : la charge cognitive",
    text: "L'IA peut générer des exercices, des quiz, des reformulations. Mais respectent-ils la charge cognitive de l'élève ? Un exercice qui mélange texte, image et consigne orale surcharge la mémoire de travail (effet de redondance — Sweller). Un exercice trop guidé pour un élève avancé freine son apprentissage (effet d'expertise inversée). L'enseignant reste le seul à pouvoir évaluer si le contenu généré est cognitivement adapté à SES élèves.",
    bgColor: "#EFF6FF",
    borderColor: "#2563EB"
  },
  "ens-sav": {
    title: "🧠 Point neuro : l'effet de génération",
    text: "La recherche montre que l'effort cognitif investi dans la production d'un contenu améliore sa mémorisation et sa compréhension (effet de génération — Slamecka & Graf, 1978). Quand un enseignant construit lui-même sa séquence, il apprend quelque chose sur sa matière et sur ses élèves. Quand l'IA la génère à sa place, cet apprentissage professionnel disparaît. Le gain de temps est réel — mais le coût caché est une érosion progressive de l'expertise didactique.",
    bgColor: "#EFF6FF",
    borderColor: "#2563EB"
  }
};

// --- Références mises à jour (remplace REFERENCES existant) ---
export const REFERENCES_UPDATED = {
  validated: [
    { author: "Houssaye, J.", year: 1988, title: "Le Triangle pédagogique", detail: "Modèle fondateur des relations Enseignant-Élève-Savoir et processus du « mort »" },
    { author: "Dehaene, S.", year: 2018, title: "Apprendre ! Les talents du cerveau, le défi des machines", detail: "4 piliers : attention, engagement actif, retour sur erreur, consolidation" },
    { author: "Sweller, J.", year: 1988, title: "Cognitive Load Theory", detail: "Charge intrinsèque, extrinsèque et germane — cadre pour optimiser les supports d'apprentissage" },
    { author: "Slamecka, N.J. & Graf, P.", year: 1978, title: "The Generation Effect", detail: "L'effort de production améliore la mémorisation — implication directe sur l'usage de l'IA par l'enseignant" },
    { author: "Anderson, L.W. & Krathwohl, D.R.", year: 2001, title: "Taxonomie de Bloom révisée", detail: "6 niveaux cognitifs : mémoriser, comprendre, appliquer, analyser, évaluer, créer" },
    { author: "Hattie, J.", year: 2009, title: "Visible Learning", detail: "Méta-analyse : le feedback a l'une des plus grandes tailles d'effet sur l'apprentissage" },
    { author: "MEN", year: 2025, title: "Cadre d'usage de l'IA en éducation", detail: "IA générative réservée enseignants, élèves à partir du CM1 uniquement" },
    { author: "UNESCO", year: 2024, title: "Compétences IA pour les enseignants", detail: "15 compétences en 5 dimensions" }
  ],
  original: [
    { author: "Le Scolan, V.", year: 2025, title: "La boucle de surcompensation", detail: "Observation de terrain (200+ enseignants formés) — non validée par étude contrôlée. Mécanisme : IA fait trop → illégitimité → surcompensation → épuisement → dépendance accrue.", isOriginal: true },
    { author: "Le Scolan, V.", year: 2025, title: "Le Triangle Pédagogique Augmenté", detail: "Extension du modèle de Houssaye intégrant l'IA comme modulateur central. Cadre théorique original en cours de formalisation.", isOriginal: true }
  ]
};
```

---

## Résumé des modifications visuelles

| Élément | Modification | Priorité |
|---|---|---|
| AxisDetail (3 axes) | Ajouter section « Pôle en retrait » (fond gris, bordure orange) | Haute |
| AxisDetail (Élève ↔ Savoir) | Ajouter encadré neuro « Charge cognitive » (fond bleu) | Haute |
| AxisDetail (Enseignant ↔ Savoir) | Ajouter encadré neuro « Effet de génération » (fond bleu) | Haute |
| Mode Situations — triangle SVG | Sommet « mort » en opacité 0.4 + contour pointillés | Haute |
| Mode Situations — carte scénario | Ajouter champ « Pôle en retrait » | Moyenne |
| Mode Éthique — zone 25-60% | Enrichir le message avec mention du réinvestissement du temps | Moyenne |
| Mode Éthique — zone 60-85% | Ajouter texte sur la perte de contrôle de la tension pédagogique | Moyenne |
| OvercompensationAlert | Ajouter mention « concept original non validé empiriquement » en petit | Moyenne |
| Section « Ce que l'IA ne remplacera jamais » | Ajouter 6e item sur le temps réinvesti | Faible |
| Modale Sources | Réorganiser en 2 catégories (validé / original) avec styles distincts | Moyenne |

---

## Prompt de démarrage pour la mise à jour

```
Lis le document de mise à jour ci-dessus dans son intégralité. Applique TOUTES les modifications décrites à l'application Triangle Pédagogique Augmenté existante, sans casser aucune fonctionnalité actuelle. Les modifications principales sont : (1) ajouter une section "Pôle en retrait" dans chaque panneau AxisDetail avec le concept du "mort" de Houssaye et réduire l'opacité du sommet concerné à 0.4 dans le mode Situations, (2) ajouter deux encadrés neuro dans les panneaux AxisDetail des axes Enseignant-Savoir (effet de génération) et Élève-Savoir (charge cognitive) avec fond bleu #EFF6FF et bordure #2563EB, (3) ajouter un champ "Pôle en retrait" dans chaque carte de scénario du mode Situations, (4) enrichir les messages du curseur éthique zones 25-60% et 60-85%, (5) ajouter une mention "concept original non validé" sous l'alerte de surcompensation, (6) réorganiser la modale Sources en deux catégories visuellement distinctes (recherche validée vs. observations de terrain originales), (7) ajouter les nouvelles constantes DEAD_POLE, SCENARIO_DEAD_POLES, NEURO_BOXES et REFERENCES_UPDATED dans data.js sans supprimer les constantes existantes. Conserve le design, les couleurs et les animations actuels.
```
