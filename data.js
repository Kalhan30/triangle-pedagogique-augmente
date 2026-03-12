// Triangle Pédagogique Augmenté - Données par Niveau Scolaire
// Déclarées globalement sur window pour un usage sans module/bundler

// --- Icônes SVG partagées ---
const ICON_ENSEIGNANT = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full drop-shadow-md"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M9 21h6"/><path d="M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/><path d="M5.5 13a4.5 4.5 0 0 1-1.5 8"/><path d="M18.5 13a4.5 4.5 0 0 0 1.5 8"/></svg>`;
const ICON_ELEVE = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full drop-shadow-md"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
const ICON_SAVOIR = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full drop-shadow-md"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>`;

// --- Helpers de construction ---
function buildVertices(overrides) {
  const base = [
    { id: "enseignant", label: "Enseignant", icon: ICON_ENSEIGNANT, color: "#ec4899", position: { x: 50, y: 8 } },
    { id: "eleve", label: "Élève", icon: ICON_ELEVE, color: "#06b6d4", position: { x: 15, y: 82 } },
    { id: "savoir", label: "Savoir", icon: ICON_SAVOIR, color: "#f97316", position: { x: 85, y: 82 } }
  ];
  return base.map(v => ({ ...v, ...overrides[v.id] }));
}

function buildAxes(overrides) {
  const base = [
    { id: "ens-sav", from: "enseignant", to: "savoir", label: "La préparation", color: "#d946ef" },
    { id: "ens-elev", from: "enseignant", to: "eleve", label: "La relation", color: "#8b5cf6" },
    { id: "elev-sav", from: "eleve", to: "savoir", label: "L'apprentissage", color: "#3b82f6" }
  ];
  return base.map(a => ({ ...a, ...overrides[a.id] }));
}

// --- Définition des niveaux ---
window.LEVELS = [
  {
    id: "primaire",
    label: "Primaire (Cycles 1-3)",
    shortLabel: "Primaire",
    icon: "🏫",
    color: "#10b981",
    regulation: "IA générative réservée aux enseignants uniquement. Pas de manipulation directe par les élèves. Sensibilisation aux bases de l'IA autorisée.",
    regulationSource: "Cadre IA — MEN 2025"
  },
  {
    id: "college-inf",
    label: "Collège 6e-5e",
    shortLabel: "6e-5e",
    icon: "📘",
    color: "#3b82f6",
    regulation: "IA générative interdite aux élèves avant la 4e. L'enseignant utilise l'IA pour préparer et différencier. Sensibilisation sans manipulation directe.",
    regulationSource: "Cadre IA — MEN 2025"
  },
  {
    id: "college-sup",
    label: "Collège 4e-3e",
    shortLabel: "4e-3e",
    icon: "📗",
    color: "#8b5cf6",
    regulation: "IA générative autorisée pour les élèves à partir de la 4e, strictement encadrée par l'enseignant. Formation obligatoire à l'IA et à ses enjeux en classe de 4e.",
    regulationSource: "Cadre IA — MEN 2025"
  },
  {
    id: "lycee-sup",
    label: "Lycée & Supérieur",
    shortLabel: "Lycée+",
    icon: "🎓",
    color: "#f59e0b",
    regulation: "Usage autonome de l'IA par les élèves dans un cadre défini par l'enseignant. Développement de l'esprit critique, de l'éthique et de l'appropriation personnelle.",
    regulationSource: "Cadre IA — MEN 2025, UNESCO 2024"
  }
];

// ========================================
// DONNÉES PAR NIVEAU
// ========================================

window.DATA_BY_LEVEL = {

  // ===================== PRIMAIRE =====================
  "primaire": {
    vertices: buildVertices({
      enseignant: {
        description: "Le maître polyvalent. Il enseigne toutes les matières, construit le cadre de confiance et accompagne les premiers apprentissages fondamentaux. L'IA est son assistant de préparation, jamais un interlocuteur pour ses jeunes élèves.",
        citation: "À 6 ans, l'enfant a besoin d'un regard, pas d'un écran."
      },
      eleve: {
        description: "Le jeune apprenant. Il découvre le monde par les sens, le jeu et l'expérimentation. Il ne manipule pas d'IA générative — l'effort cognitif, la manipulation concrète et l'interaction humaine sont ses leviers d'apprentissage.",
        citation: "On n'apprend pas à lire en demandant à une machine."
      },
      savoir: {
        description: "Les fondamentaux : lire, écrire, compter, respecter autrui. Les programmes de cycles 2 et 3 structurent ces apprentissages essentiels. L'IA peut les reformuler pour l'enseignant, mais la légitimité du savoir vient des programmes officiels.",
        citation: "Les fondamentaux ne se négocient pas — l'IA les sert, pas l'inverse."
      }
    }),
    axes: buildAxes({
      "ens-sav": {
        ia_can_do: [
          "Générer des séquences pédagogiques adaptées aux cycles 2 et 3",
          "Différencier les exercices en 3 niveaux (soutien, consolidation, approfondissement)",
          "Créer des évaluations alignées sur les attendus de fin de cycle",
          "Proposer des supports visuels et des jeux pédagogiques",
          "Structurer des programmations annuelles conformes aux programmes"
        ],
        human_only: [
          "Juger la pertinence didactique pour SA classe de CP, CE ou CM",
          "Adapter au contexte local et au vécu des jeunes élèves",
          "Choisir la progression en fonction du rythme et de la maturité du groupe",
          "Prioriser selon les besoins observés au quotidien",
          "Valider la conformité aux programmes officiels du cycle",
          "⏱️ La capacité à transformer du temps gagné en temps pédagogique utile — observer, écouter, ajuster"
        ],
        terrain_example: "En CE2, j'utilise l'IA pour générer 3 niveaux de différenciation sur une leçon de grammaire. L'IA me propose les variantes en 2 minutes. Mais c'est moi qui décide laquelle colle à ma classe, à mes élèves, à ce qu'on a fait la semaine dernière.",
        cta: { label: "Découvrir la méthode CRAFT", url: "https://maprofbranchee.fr/outils-ia/" }
      },
      "ens-elev": {
        ia_can_do: [
          "Fournir des rapports de suivi individualisés par compétence",
          "Générer des fiches de communication pour les parents",
          "Proposer des adaptations pour les élèves à besoins particuliers (PAP/PPS)",
          "Alerter sur les patterns de difficulté via les outils numériques",
          "Suggérer des activités de remédiation ciblées"
        ],
        human_only: [
          "Le regard bienveillant et la présence physique rassurante",
          "L'intuition pédagogique face à un enfant en détresse",
          "La gestion des émotions et des conflits dans la classe",
          "La construction du lien de confiance élève-adulte",
          "Le repérage de ce qu'aucun algorithme ne voit : le non-dit"],
        terrain_example: "Quand un enfant de CP pleure parce qu'il ne comprend pas, aucune IA ne peut s'asseoir à côté de lui et lui dire : 'Regarde, on va reprendre ensemble'. L'empathie n'est pas automatisable — surtout à 6 ans.",
        cta: { label: "Mes prompts pour enseignants", url: "https://maprofbranchee.fr/mes-prompts-enseignants/" }
      },
      "elev-sav": {
        ia_can_do: [
          "(Réservé enseignant) Planifier des révisions espacées pour la classe",
          "(Réservé enseignant) Générer des quiz adaptés au niveau de chaque élève",
          "(Réservé enseignant) Créer des exercices de fluence en lecture",
          "(Réservé enseignant) Adapter les problèmes de maths au vécu des élèves",
          "(Réservé enseignant) Reformuler les consignes pour les élèves en difficulté"
        ],
        human_only: [
          "L'apprentissage par la manipulation et l'expérimentation directe",
          "La construction du sens par le jeu et l'interaction entre pairs",
          "L'erreur comme levier d'apprentissage — pas de correction automatique",
          "La mémorisation par la répétition active et le vécu corporel",
          "L'éveil de la curiosité et du plaisir d'apprendre"],
        terrain_example: "En CP, on apprend à lire en touchant des lettres, en chantant des syllabes, en jouant avec les mots. Aucune IA ne remplace le moment où un enfant déchiffre son premier mot et que toute la classe applaudit.",
        cta: { label: "Lire l'article sur IA et mémorisation", url: "https://maprofbranchee.fr/ia-memorisation/" }
      }
    }),
    scenarios: [
      {
        id: "eval-maths-ce2", title: "Préparer une évaluation CE2 en maths",
        axes_activation: { "ens-sav": 0.9, "ens-elev": 0.3, "elev-sav": 0.5 },
        ia_role: "L'IA génère des exercices adaptés aux attendus de fin de cycle et propose une grille de correction automatique.",
        human_role: "L'enseignant valide la pertinence pédagogique, ajuste la longueur et prévoit les aides pour les élèves fragiles."
      },
      {
        id: "differenciation-allophone", title: "Différencier pour un élève allophone",
        axes_activation: { "ens-sav": 0.7, "ens-elev": 0.9, "elev-sav": 0.6 },
        ia_role: "L'IA traduit les consignes et propose des aides visuelles spécifiques pour faciliter l'accès au sens.",
        human_role: "L'enseignant accompagne l'intégration dans la classe, gère l'aspect émotionnel et vérifie la compréhension réelle."
      },
      {
        id: "revision-espacee", title: "Animer une séance de révision espacée",
        axes_activation: { "ens-sav": 0.5, "ens-elev": 0.4, "elev-sav": 0.9 },
        ia_role: "L'IA planifie les rappels et propose des flashcards basées sur les erreurs précédentes des élèves.",
        human_role: "L'enseignant orchestre la séance, encourage les progrès et s'assure que l'automatisme ne remplace pas le sens."
      },
      {
        id: "reunion-parents", title: "Préparer une réunion parents",
        axes_activation: { "ens-sav": 0.4, "ens-elev": 0.9, "elev-sav": 0.3 },
        ia_role: "L'IA aide à structurer le discours et à préparer des fiches de suivi claires pour chaque famille.",
        human_role: "L'enseignant porte le lien de confiance, nuance les propos et ancre l'échange dans le vécu de l'enfant."
      },
      {
        id: "sequence-interdisciplinaire", title: "Construire une séquence interdisciplinaire",
        axes_activation: { "ens-sav": 0.9, "ens-elev": 0.6, "elev-sav": 0.7 },
        ia_role: "L'IA propose des ponts entre les disciplines et structure les activités transversales.",
        human_role: "L'enseignant garantit la cohérence des apprentissages et l'équilibre entre les différents objectifs."
      },
      {
        id: "difficulte-lecture", title: "Accompagner un élève en difficulté de lecture",
        axes_activation: { "ens-sav": 0.6, "ens-elev": 0.8, "elev-sav": 0.9 },
        ia_role: "L'IA propose des textes à niveau de lecture adapté et offre une aide à la fluence en temps réel.",
        human_role: "L'enseignant observe les blocages, rassure l'élève et maintient le plaisir de lire malgré l'effort."
      }
    ],
    ethicsZones: [
      { min: 0, max: 25, bgColor: "#DCFCE7", label: "IA minimale", message: "L'enseignant utilise occasionnellement l'IA pour des tâches isolées (mise en forme, correction). Les élèves n'ont aucun contact direct avec l'IA générative.", iaStrokeWidth: 1, iaDashArray: "4 4" },
      { min: 25, max: 60, bgColor: "#CCFBF1", label: "IA partenaire — RECOMMANDÉ", message: "L'assistant invisible — l'IA assiste sur la préparation et la différenciation. L'enseignant reste le pilote. C'est la zone d'équilibre : l'IA amplifie sans remplacer. Le temps gagné n'est un vrai gain que s'il est réinvesti dans l'observation des élèves, la relation pédagogique ou la réflexion sur sa pratique — pas dans davantage de production.", iaStrokeWidth: 2, iaDashArray: "none" },
      { min: 60, max: 85, bgColor: "#FFF7ED", label: "IA dominante — Attention", message: "L'enseignant délègue trop : séquences entières générées sans adaptation, évaluations copiées-collées. Risque de perte de contact avec les besoins réels des jeunes élèves. Du point de vue du Triangle : quand l'IA domine, ce n'est plus l'enseignant qui choisit quel pôle fait le mort — c'est l'algorithme qui décide à sa place. La tension pédagogique n'est plus un choix professionnel conscient, elle devient une conséquence subie.", iaStrokeWidth: 4, iaDashArray: "none" },
      { min: 85, max: 100, bgColor: "#FEE2E2", label: "IA totale — ZONE ROUGE", message: "L'enseignant ne conçoit plus rien. Les séquences, évaluations et remédiations sont entièrement générées. Le triangle s'effondre : la relation humaine, essentielle en primaire, disparaît.", iaStrokeWidth: 8, iaDashArray: "none" }
    ]
  },

  // ===================== COLLÈGE 6e-5e =====================
  "college-inf": {
    vertices: buildVertices({
      enseignant: {
        description: "Le professeur disciplinaire. Il maîtrise sa matière et accompagne la transition vers l'autonomie. L'IA l'aide à préparer et différencier, mais ne s'adresse pas directement aux élèves de ce niveau.",
        citation: "En 6e, l'élève apprend à apprendre. L'IA aide l'enseignant, pas l'élève."
      },
      eleve: {
        description: "L'élève en transition. Il apprend l'autonomie, découvre les disciplines et construit ses méthodes de travail. Sensibilisé à l'existence de l'IA sans la manipuler, il développe sa curiosité et son esprit logique.",
        citation: "Avant de maîtriser l'IA, il faut maîtriser le raisonnement."
      },
      savoir: {
        description: "Le socle commun de connaissances et de compétences. Les programmes de cycles 3 et 4 structurent les savoirs disciplinaires. L'IA peut aider l'enseignant à les organiser, mais la validation reste institutionnelle.",
        citation: "Le programme cadre. L'IA outille. L'enseignant relie les deux."
      }
    }),
    axes: buildAxes({
      "ens-sav": {
        ia_can_do: [
          "Structurer des cours disciplinaires alignés sur le socle commun",
          "Générer des évaluations diagnostiques de début de cycle 3/4",
          "Créer des fiches de révision et des exercices progressifs",
          "Adapter les supports pour les élèves à besoins éducatifs particuliers",
          "Proposer des ressources interdisciplinaires (EPI, parcours)"
        ],
        human_only: [
          "Gérer l'hétérogénéité de la transition primaire-collège",
          "Construire la progressivité entre la 6e et la 5e",
          "Choisir les œuvres et supports qui parlent à SES élèves",
          "Articuler les programmes entre disciplines (interdisciplinarité)",
          "Évaluer la cohérence pédagogique dans le cadre du cycle"],
        terrain_example: "En 6e, mes élèves arrivent avec des niveaux très différents du primaire. L'IA m'aide à créer rapidement 3 parcours de révision en maths. Mais c'est moi qui observe qui a besoin de quoi, et qui adapte le rythme de chacun.",
        cta: { label: "Outils IA pour le collège", url: "https://maprofbranchee.fr/outils-ia/" }
      },
      "ens-elev": {
        ia_can_do: [
          "Personnaliser les parcours d'apprentissage par profil d'élève",
          "Générer des bilans de compétences pour le suivi du socle",
          "Proposer des exercices de remédiation adaptés au diagnostic",
          "Faciliter la communication avec les familles (comptes-rendus)",
          "Créer des supports de tutorat entre pairs"
        ],
        human_only: [
          "Accompagner la transition primaire-collège (repères, autonomie)",
          "Gérer les dynamiques de groupe propres à la préadolescence",
          "Repérer le décrochage scolaire derrière les comportements",
          "Construire une posture d'autorité éducative et de confiance",
          "Le dialogue avec les familles sur les sujets sensibles"],
        terrain_example: "En 6e, un élève qui ne rend plus ses devoirs, ce n'est pas un problème d'organisation — c'est souvent un signal. L'IA peut m'alerter sur la baisse de résultats, mais c'est moi qui prends le temps de comprendre ce qui se passe.",
        cta: { label: "Mes prompts pour enseignants", url: "https://maprofbranchee.fr/mes-prompts-enseignants/" }
      },
      "elev-sav": {
        ia_can_do: [
          "(Via l'enseignant) Planifier des révisions espacées par matière",
          "(Via l'enseignant) Générer des quiz de consolidation personnalisés",
          "(Via l'enseignant) Créer des exercices d'automatisation ciblés",
          "(Via l'enseignant) Produire des fiches de synthèse visuelles",
          "(Via l'enseignant) Proposer des exercices de méthodologie adaptés"
        ],
        human_only: [
          "L'apprentissage de l'autonomie et de l'organisation personnelle",
          "La compréhension profonde au-delà de la mémorisation",
          "Le développement du raisonnement logique et de l'abstraction",
          "La collaboration entre pairs (travail de groupe, tutorat)",
          "La métacognition : apprendre à apprendre"],
        terrain_example: "En 5e, mes élèves utilisent des flashcards que j'ai générées avec l'IA et imprimées. Ils ne touchent pas d'IA, mais ils bénéficient d'exercices parfaitement calibrés. L'IA est derrière le rideau, l'apprentissage est devant.",
        cta: { label: "Lire l'article sur IA et mémorisation", url: "https://maprofbranchee.fr/ia-memorisation/" }
      }
    }),
    scenarios: [
      {
        id: "histoire-6e", title: "Préparer un cours d'histoire sur l'Antiquité en 6e",
        axes_activation: { "ens-sav": 0.9, "ens-elev": 0.3, "elev-sav": 0.5 },
        ia_role: "L'IA génère une séquence structurée avec documents d'époque, frise chronologique interactive et évaluation par compétences.",
        human_role: "L'enseignant choisit l'angle d'entrée, sélectionne les documents adaptés au niveau des élèves et guide la construction du récit historique."
      },
      {
        id: "grammaire-5e", title: "Différencier un exercice de grammaire en 5e",
        axes_activation: { "ens-sav": 0.8, "ens-elev": 0.4, "elev-sav": 0.6 },
        ia_role: "L'IA crée 3 niveaux d'exercices sur les propositions subordonnées : repérage, transformation, production, avec des textes-supports variés.",
        human_role: "L'enseignant attribue les niveaux selon sa connaissance des élèves, observe les stratégies et ajuste en cours de séance."
      },
      {
        id: "diagnostic-maths-6e", title: "Créer une évaluation diagnostique en maths 6e",
        axes_activation: { "ens-sav": 0.9, "ens-elev": 0.5, "elev-sav": 0.7 },
        ia_role: "L'IA génère un test couvrant les compétences de fin de CM2 (numération, calcul, géométrie, mesures) avec grille d'analyse automatique.",
        human_role: "L'enseignant interprète les résultats, identifie les groupes de besoin et construit les parcours de remédiation adaptés."
      },
      {
        id: "dyslexie-5e", title: "Adapter un texte littéraire pour un élève dyslexique",
        axes_activation: { "ens-sav": 0.6, "ens-elev": 0.9, "elev-sav": 0.7 },
        ia_role: "L'IA reformate le texte (police adaptée, espacement, surlignage syllabique) et propose un glossaire simplifié des mots difficiles.",
        human_role: "L'enseignant connaît le profil de l'élève, vérifie que les adaptations ne dénaturent pas l'œuvre et accompagne la compréhension par le dialogue."
      },
      {
        id: "progression-svt-5e", title: "Structurer une progression annuelle en SVT 5e",
        axes_activation: { "ens-sav": 0.9, "ens-elev": 0.3, "elev-sav": 0.4 },
        ia_role: "L'IA propose un découpage annuel aligné sur les programmes, avec des liens entre les thèmes et des évaluations de fin de chapitre.",
        human_role: "L'enseignant ajuste le rythme aux projets de l'établissement, intègre les sorties terrain et priorise selon les acquis de ses classes."
      },
      {
        id: "conseil-classe", title: "Préparer un conseil de classe avec données de suivi",
        axes_activation: { "ens-sav": 0.4, "ens-elev": 0.9, "elev-sav": 0.3 },
        ia_role: "L'IA synthétise les moyennes, les évolutions et les alertes de décrochage en un tableau de bord visuel par élève.",
        human_role: "L'enseignant contextualise chaque situation, formule les appréciations avec nuance et porte les décisions d'orientation avec les familles."
      }
    ],
    ethicsZones: [
      { min: 0, max: 25, bgColor: "#DCFCE7", label: "IA minimale", message: "L'enseignant utilise ponctuellement l'IA pour des tâches isolées. Les élèves de 6e-5e ne sont pas exposés à l'IA générative, conformément au cadre MEN.", iaStrokeWidth: 1, iaDashArray: "4 4" },
      { min: 25, max: 60, bgColor: "#CCFBF1", label: "IA partenaire — RECOMMANDÉ", message: "L'assistant invisible — l'IA assiste sur la préparation et la différenciation. L'enseignant reste le pilote. C'est la zone d'équilibre : l'IA amplifie sans remplacer. Le temps gagné n'est un vrai gain que s'il est réinvesti dans l'observation des élèves, la relation pédagogique ou la réflexion sur sa pratique — pas dans davantage de production.", iaStrokeWidth: 2, iaDashArray: "none" },
      { min: 60, max: 85, bgColor: "#FFF7ED", label: "IA dominante — Attention", message: "L'enseignant génère trop de contenus sans adaptation. Risque de standardisation des cours et de perte de l'adaptation fine aux besoins de la transition primaire-collège. Du point de vue du Triangle : quand l'IA domine, ce n'est plus l'enseignant qui choisit quel pôle fait le mort — c'est l'algorithme qui décide à sa place. La tension pédagogique n'est plus un choix professionnel conscient, elle devient une conséquence subie.", iaStrokeWidth: 4, iaDashArray: "none" },
      { min: 85, max: 100, bgColor: "#FEE2E2", label: "IA totale — ZONE ROUGE", message: "L'enseignant n'a plus de prise sur ses cours. Tout est généré, rien n'est contextualisé. L'accompagnement humain de la transition disparaît. Le triangle s'effondre.", iaStrokeWidth: 8, iaDashArray: "none" }
    ]
  },

  // ===================== COLLÈGE 4e-3e =====================
  "college-sup": {
    vertices: buildVertices({
      enseignant: {
        description: "Le professeur-formateur. Il enseigne sa discipline ET forme les élèves à l'usage critique de l'IA générative. Double mission depuis la 4e : transmettre le savoir et armer l'esprit critique.",
        citation: "À partir de la 4e, on n'interdit plus l'IA — on apprend à la maîtriser."
      },
      eleve: {
        description: "L'élève en formation critique. À partir de la 4e, il découvre l'IA générative dans un cadre strict. Il apprend à l'utiliser comme un outil de travail, pas comme une béquille. Formation obligatoire à l'IA prévue par le cadre MEN.",
        citation: "L'IA répond vite. Apprendre prend du temps — et c'est ce temps qui compte."
      },
      savoir: {
        description: "Les savoirs disciplinaires enrichis par la culture de l'IA. Les programmes intègrent la compréhension de l'intelligence artificielle comme objet d'étude. Le DNB évalue des compétences que l'IA seule ne peut certifier.",
        citation: "Savoir utiliser l'IA, c'est d'abord savoir s'en passer."
      }
    }),
    axes: buildAxes({
      "ens-sav": {
        ia_can_do: [
          "Concevoir des activités où l'élève interagit avec l'IA sous supervision",
          "Préparer des séances de formation à l'IA et au fact-checking",
          "Générer des sujets de type DNB avec corrigés différenciés",
          "Créer des parcours de révision adaptatifs pour le brevet",
          "Structurer des projets mêlant disciplines et outils IA"
        ],
        human_only: [
          "Cadrer l'usage de l'IA par les élèves avec des règles claires",
          "Former les élèves à l'esprit critique face aux réponses générées",
          "Distinguer quand l'IA aide l'apprentissage vs quand elle le court-circuite",
          "Accompagner l'appropriation personnelle des contenus générés",
          "Garantir que le travail évalué reflète les compétences de l'élève"],
        terrain_example: "En 4e, j'autorise mes élèves à utiliser un chatbot pour reformuler un texte difficile. Mais je leur demande ensuite d'expliquer avec leurs propres mots ce qu'ils ont compris. L'IA reformule, l'élève s'approprie — ou pas.",
        cta: { label: "Guide IA pour les 4e-3e", url: "https://maprofbranchee.fr/outils-ia/" }
      },
      "ens-elev": {
        ia_can_do: [
          "Accompagner les élèves dans l'utilisation critique de l'IA",
          "Générer du feedback instantané sur les productions écrites",
          "Proposer des parcours d'orientation avec analyse de profil",
          "Créer des outils d'auto-évaluation et de métacognition",
          "Faciliter la préparation à l'oral du DNB"
        ],
        human_only: [
          "Former l'esprit critique des adolescents face aux IA génératives",
          "Poser le cadre éthique : plagiat, propriété intellectuelle, fiabilité",
          "Gérer les inégalités d'accès au numérique entre élèves",
          "Accompagner l'orientation avec une connaissance fine de l'élève",
          "Maintenir l'exigence intellectuelle face à la facilité de l'IA"],
        terrain_example: "Un élève de 3e me rend une dissertation parfaite — trop parfaite. Plutôt que d'accuser, je lui demande de m'expliquer sa démarche à l'oral. L'IA peut générer un texte, mais pas le regard de l'élève quand il défend ses idées.",
        cta: { label: "Mes prompts pour enseignants", url: "https://maprofbranchee.fr/mes-prompts-enseignants/" }
      },
      "elev-sav": {
        ia_can_do: [
          "Proposer un tutorat personnalisé encadré (type Mathia, MIA seconde)",
          "Générer des quiz adaptatifs pour les révisions du brevet",
          "Reformuler un concept de multiples façons sur demande de l'élève",
          "Offrir un feedback immédiat sur les exercices d'entraînement",
          "Créer des parcours de révision espacée intelligents"
        ],
        human_only: [
          "La compréhension profonde et la capacité de transfert",
          "L'esprit critique face aux réponses de l'IA (vérification, croisement)",
          "La production personnelle : argumentation, expression, créativité",
          "La métacognition active : savoir ce qu'on sait vs ce qu'on croit savoir",
          "L'appropriation des savoirs au-delà du copier-coller"],
        terrain_example: "Un élève de 4e utilise un chatbot pour réviser les maths. L'IA lui donne la méthode, pas la réponse. Quand il se trompe, l'IA lui pose des questions au lieu de corriger. C'est l'erreur accompagnée — exactement ce que Dehaene recommande.",
        cta: { label: "Lire l'article sur IA et mémorisation", url: "https://maprofbranchee.fr/ia-memorisation/" }
      }
    }),
    scenarios: [
      {
        id: "recherche-ia-4e", title: "Encadrer un travail de recherche avec IA en 4e",
        axes_activation: { "ens-sav": 0.6, "ens-elev": 0.8, "elev-sav": 0.9 },
        ia_role: "L'IA assiste la recherche documentaire, propose des synthèses et aide à structurer le plan du travail de l'élève.",
        human_role: "L'enseignant fixe les règles d'usage, vérifie les sources citées, enseigne le tri critique de l'information et évalue l'appropriation personnelle."
      },
      {
        id: "fact-checking", title: "Former les élèves au fact-checking avec l'IA",
        axes_activation: { "ens-sav": 0.5, "ens-elev": 0.9, "elev-sav": 0.7 },
        ia_role: "L'IA génère des affirmations (vraies, fausses, partielles) que les élèves doivent vérifier en croisant les sources.",
        human_role: "L'enseignant guide la démarche critique, enseigne les réflexes de vérification et anime le débat sur la fiabilité de l'IA."
      },
      {
        id: "revision-dnb", title: "Utiliser un tuteur IA pour les révisions du DNB",
        axes_activation: { "ens-sav": 0.4, "ens-elev": 0.5, "elev-sav": 0.9 },
        ia_role: "L'IA propose des quiz adaptatifs, des fiches de révision personnalisées et des exercices ciblés selon les lacunes identifiées.",
        human_role: "L'enseignant vérifie que l'élève apprend réellement et ne se contente pas de réponses toutes faites. Il accompagne la métacognition."
      },
      {
        id: "debat-ia", title: "Débattre : 'L'IA peut-elle remplacer le professeur ?'",
        axes_activation: { "ens-sav": 0.3, "ens-elev": 0.9, "elev-sav": 0.6 },
        ia_role: "L'IA fournit des arguments pour et contre, des données chiffrées et des exemples internationaux pour alimenter le débat.",
        human_role: "L'enseignant structure le débat, garantit l'écoute mutuelle, pousse la réflexion au-delà des idées reçues et cadre les conclusions."
      },
      {
        id: "projet-interdisciplinaire", title: "Créer un projet interdisciplinaire avec outils IA",
        axes_activation: { "ens-sav": 0.9, "ens-elev": 0.6, "elev-sav": 0.8 },
        ia_role: "L'IA aide à concevoir un EPI mêlant maths et technologie, génère des ressources et propose des activités collaboratives.",
        human_role: "Les enseignants coordonnent le projet, s'assurent de la cohérence pédagogique et accompagnent les groupes dans leur progression."
      },
      {
        id: "oral-dnb", title: "Préparer l'oral du DNB avec un assistant IA",
        axes_activation: { "ens-sav": 0.3, "ens-elev": 0.7, "elev-sav": 0.9 },
        ia_role: "L'IA aide l'élève à structurer son exposé, propose des reformulations et simule des questions du jury.",
        human_role: "L'enseignant travaille la posture, la voix, le regard. Il vérifie que l'élève maîtrise son sujet au-delà du texte préparé."
      }
    ],
    ethicsZones: [
      { min: 0, max: 25, bgColor: "#DCFCE7", label: "IA minimale", message: "L'IA n'est presque pas utilisée. Les élèves de 4e-3e pourraient bénéficier d'une introduction encadrée, conformément au cadre MEN qui l'autorise à partir de la 4e.", iaStrokeWidth: 1, iaDashArray: "4 4" },
      { min: 25, max: 60, bgColor: "#CCFBF1", label: "IA partenaire — RECOMMANDÉ", message: "L'assistant invisible — l'IA assiste sur la préparation et la différenciation. L'enseignant reste le pilote. C'est la zone d'équilibre : l'IA amplifie sans remplacer. Le temps gagné n'est un vrai gain que s'il est réinvesti dans l'observation des élèves, la relation pédagogique ou la réflexion sur sa pratique — pas dans davantage de production.", iaStrokeWidth: 2, iaDashArray: "none" },
      { min: 60, max: 85, bgColor: "#FFF7ED", label: "IA dominante — Attention", message: "Les élèves utilisent l'IA sans cadrage suffisant. Risque : les productions sont 'assistées' sans réelle appropriation. L'évaluation ne mesure plus les compétences réelles. Du point de vue du Triangle : quand l'IA domine, ce n'est plus l'enseignant qui choisit quel pôle fait le mort — c'est l'algorithme qui décide à sa place. La tension pédagogique n'est plus un choix professionnel conscient, elle devient une conséquence subie.", iaStrokeWidth: 4, iaDashArray: "none" },
      { min: 85, max: 100, bgColor: "#FEE2E2", label: "IA totale — ZONE ROUGE", message: "Les élèves délèguent tout à l'IA. Plus d'effort cognitif, plus de construction personnelle. Le DNB se prépare par copier-coller. L'apprentissage est une illusion.", iaStrokeWidth: 8, iaDashArray: "none" }
    ]
  },

  // ===================== LYCÉE & SUPÉRIEUR =====================
  "lycee-sup": {
    vertices: buildVertices({
      enseignant: {
        description: "Le professeur-mentor. Il guide vers l'autonomie intellectuelle dans un monde où l'IA est omniprésente. Son rôle : développer la pensée personnelle et l'éthique au-delà de la synthèse automatique.",
        citation: "L'IA génère du texte. L'enseignant éveille une pensée."
      },
      eleve: {
        description: "L'apprenant autonome. Il utilise l'IA comme outil de recherche, de synthèse et de création dans un cadre défini par l'enseignant. Son défi : produire une pensée originale, pas une compilation.",
        citation: "Le diplôme certifie ce que VOUS savez faire, pas ce que l'IA fait pour vous."
      },
      savoir: {
        description: "Les savoirs spécialisés et l'esprit de recherche. Le bac, les concours et les diplômes exigent une maîtrise personnelle des connaissances. L'IA transforme l'accès au savoir, mais ne remplace pas l'appropriation.",
        citation: "L'IA accélère l'accès au savoir. Elle ne garantit pas la compréhension."
      }
    }),
    axes: buildAxes({
      "ens-sav": {
        ia_can_do: [
          "Concevoir des projets intégrant l'IA comme objet d'étude et d'analyse",
          "Générer des sujets de bac et concours avec grilles critériées",
          "Créer des activités de vérification et confrontation de sources IA",
          "Produire des corpus de textes et données pour analyse assistée",
          "Structurer des parcours de préparation au Grand Oral avec l'IA"
        ],
        human_only: [
          "Enseigner la méthodologie de recherche face aux hallucinations",
          "Guider la construction d'une pensée personnelle au-delà de la synthèse IA",
          "Former à l'éthique de la citation et de l'appropriation intellectuelle",
          "Évaluer la qualité du raisonnement, pas seulement le résultat",
          "Préparer les élèves à un monde professionnel transformé par l'IA"],
        terrain_example: "En Terminale, mes élèves utilisent l'IA pour structurer leur Grand Oral. Mais je leur interdis de lire un texte généré. L'IA aide à organiser les idées, l'élève doit les porter avec ses mots, son regard, sa conviction.",
        cta: { label: "IA au lycée : bonnes pratiques", url: "https://maprofbranchee.fr/outils-ia/" }
      },
      "ens-elev": {
        ia_can_do: [
          "Fournir un feedback détaillé et personnalisé sur les copies",
          "Accompagner la préparation au Grand Oral (structure, argumentation)",
          "Générer des parcours de révision individuels pour le bac",
          "Proposer des ressources d'approfondissement selon les spécialités",
          "Créer des simulations d'entretien et de soutenance"
        ],
        human_only: [
          "Le mentorat intellectuel : guider une pensée en construction",
          "L'évaluation de la maturité du raisonnement, pas du style",
          "L'accompagnement à l'orientation post-bac (projet de vie)",
          "La transmission de la passion pour une discipline",
          "Le dialogue sur l'éthique professionnelle face à l'IA"],
        terrain_example: "En prépa, un étudiant utilise l'IA pour synthétiser 20 articles de recherche. Je ne m'y oppose pas. Mais je lui demande : 'Et toi, qu'est-ce que tu en penses ? Quelle est ta thèse ?' L'IA compile, l'humain pense.",
        cta: { label: "Mes prompts pour enseignants", url: "https://maprofbranchee.fr/mes-prompts-enseignants/" }
      },
      "elev-sav": {
        ia_can_do: [
          "Offrir un tutorat personnalisé 24h/24 sur les matières scientifiques",
          "Synthétiser des corpus documentaires pour amorcer la recherche",
          "Proposer des exercices de type bac avec correction détaillée",
          "Reformuler et vulgariser des concepts complexes à la demande",
          "Créer des fiches de révision structurées et des cartes mentales"
        ],
        human_only: [
          "La pensée critique et la capacité d'argumentation personnelle",
          "La créativité et l'innovation au-delà de la prédiction statistique",
          "Le jugement éthique et la responsabilité intellectuelle",
          "Le transfert de connaissances à des situations inédites",
          "La construction d'un projet intellectuel et professionnel personnel"],
        terrain_example: "Une étudiante utilise l'IA pour synthétiser 30 pages de cours en fiches. C'est utile. Mais quand je lui demande de résoudre un problème inédit avec ces connaissances, c'est là que l'apprentissage réel se révèle — ou pas.",
        cta: { label: "Lire l'article sur IA et mémorisation", url: "https://maprofbranchee.fr/ia-memorisation/" }
      }
    }),
    scenarios: [
      {
        id: "grand-oral", title: "Encadrer un Grand Oral avec sources IA",
        axes_activation: { "ens-sav": 0.5, "ens-elev": 0.7, "elev-sav": 0.9 },
        ia_role: "L'IA aide à structurer l'exposé, propose des sources complémentaires et simule des questions du jury pour l'entraînement.",
        human_role: "L'enseignant vérifie la maîtrise du sujet, travaille la posture et l'argumentation, et s'assure que la réflexion est personnelle."
      },
      {
        id: "bac-philo", title: "Préparer le bac de philosophie avec assistance IA",
        axes_activation: { "ens-sav": 0.6, "ens-elev": 0.4, "elev-sav": 0.9 },
        ia_role: "L'IA génère des plans de dissertation, propose des références philosophiques et reformule des concepts abstraits.",
        human_role: "L'enseignant exige la pensée personnelle, enseigne l'art de la problématisation et évalue l'originalité du raisonnement, pas la qualité de la synthèse."
      },
      {
        id: "hallucinations-ia", title: "Développer l'esprit critique face aux hallucinations",
        axes_activation: { "ens-sav": 0.4, "ens-elev": 0.9, "elev-sav": 0.7 },
        ia_role: "L'IA génère volontairement des contenus avec des erreurs factuelles que les élèves doivent identifier et corriger.",
        human_role: "L'enseignant guide la démarche de vérification, enseigne les réflexes de fact-checking et anime la réflexion sur les limites de l'IA."
      },
      {
        id: "projet-nsi", title: "Intégrer l'IA dans un projet de spécialité NSI",
        axes_activation: { "ens-sav": 0.9, "ens-elev": 0.5, "elev-sav": 0.8 },
        ia_role: "L'IA assiste le codage, propose des algorithmes, génère de la documentation technique et aide au débogage.",
        human_role: "L'enseignant guide la conception architecturale, vérifie la compréhension algorithmique et évalue la capacité à expliquer le code produit."
      },
      {
        id: "corpus-litteraire", title: "Analyser un corpus littéraire avec assistance IA",
        axes_activation: { "ens-sav": 0.7, "ens-elev": 0.3, "elev-sav": 0.9 },
        ia_role: "L'IA propose des analyses stylistiques, des comparaisons intertextuelles et des contextualisations historiques des œuvres.",
        human_role: "L'enseignant guide l'interprétation personnelle, développe la sensibilité littéraire et enseigne que la littérature ne se réduit pas à l'analyse."
      },
      {
        id: "ethique-recherche", title: "Former à l'éthique de l'IA en recherche universitaire",
        axes_activation: { "ens-sav": 0.5, "ens-elev": 0.9, "elev-sav": 0.6 },
        ia_role: "L'IA présente des cas concrets de plagiat assisté, de biais algorithmiques et de questions éthiques liées à l'IA en recherche.",
        human_role: "L'enseignant anime les débats éthiques, pose les cadres déontologiques et forme à la responsabilité intellectuelle du chercheur."
      }
    ],
    ethicsZones: [
      { min: 0, max: 25, bgColor: "#DCFCE7", label: "IA minimale", message: "L'IA est ignorée alors que les élèves l'utilisent hors classe. Risque de déconnexion entre l'école et la réalité. Les élèves n'apprennent pas à l'utiliser de manière éthique et critique.", iaStrokeWidth: 1, iaDashArray: "4 4" },
      { min: 25, max: 60, bgColor: "#CCFBF1", label: "IA partenaire — RECOMMANDÉ", message: "L'assistant invisible — l'IA assiste sur la préparation et la différenciation. L'enseignant reste le pilote. C'est la zone d'équilibre : l'IA amplifie sans remplacer. Le temps gagné n'est un vrai gain que s'il est réinvesti dans l'observation des élèves, la relation pédagogique ou la réflexion sur sa pratique — pas dans davantage de production.", iaStrokeWidth: 2, iaDashArray: "none" },
      { min: 60, max: 85, bgColor: "#FFF7ED", label: "IA dominante — Attention", message: "L'IA produit la majority du travail. Dissertations, synthèses et projets sont générés sans réelle réflexion personnelle. L'évaluation ne mesure plus les compétences réelles de l'élève. Du point de vue du Triangle : quand l'IA domine, ce n'est plus l'enseignant qui choisit quel pôle fait le mort — c'est l'algorithme qui décide à sa place. La tension pédagogique n'est plus un choix professionnel conscient, elle devient une conséquence subie.", iaStrokeWidth: 4, iaDashArray: "none" },
      { min: 85, max: 100, bgColor: "#FEE2E2", label: "IA totale — ZONE ROUGE", message: "L'IA remplace l'effort intellectuel. Grand Oral récité, mémoire généré, pensée critique absente. Le diplôme ne certifie plus rien. La formation perd tout son sens.", iaStrokeWidth: 8, iaDashArray: "none" }
    ]
  }
};

// --- Données partagées (identiques pour tous les niveaux) ---

// --- Références mises à jour ---
window.REFERENCES = {
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

window.OVERCOMPENSATION_LOOP = {
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

// --- Le processus du "mort" par axe ---
window.DEAD_POLE = {
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
window.SCENARIO_DEAD_POLES = {
  "eval-maths-ce2": "L'Élève fait le mort — l'enseignant pense au programme, pas encore aux élèves concrets. L'IA aide à produire vite, mais c'est au moment de valider que l'enseignant doit « réveiller » l'élève dans sa tête.",
  "differenciation-allophone": "Le Savoir disciplinaire fait le mort — l'attention est sur l'élève et ses besoins spécifiques. Vigilance : la différenciation ne doit pas vider l'exercice de son contenu d'apprentissage.",
  "revision-espacee": "L'Enseignant fait le mort — l'élève travaille en autonomie avec l'outil. Le risque : confondre activité (l'élève clique) et apprentissage (l'élève comprend).",
  "reunion-parents": "Le Savoir fait le mort — la communication porte sur la relation, pas sur les contenus. L'IA structure le discours, mais l'enseignant doit ancrer l'échange dans des faits d'apprentissage concrets.",
  "sequence-interdisciplinaire": "Aucun pôle ne fait clairement le mort — c'est pourquoi ce type de séquence est le plus complexe. L'IA peut structurer les croisements, mais l'enseignant doit accepter que chaque séance privilégie un axe.",
  "difficulte-lecture": "L'Enseignant fait partiellement le mort — l'élève est en prise directe avec le texte, accompagné par l'outil. Mais un outil de fluence ne détecte pas l'anxiété de lecture. L'enseignant doit rester en observation active."
};

// --- Encadrés neuro ---
window.NEURO_BOXES = {
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

// --- Backward compatibility (défaut = primaire) ---
window.VERTICES = window.DATA_BY_LEVEL["primaire"].vertices;
window.AXES = window.DATA_BY_LEVEL["primaire"].axes;
window.SCENARIOS = window.DATA_BY_LEVEL["primaire"].scenarios;
window.ETHICS_ZONES = window.DATA_BY_LEVEL["primaire"].ethicsZones;

window.TRANSVERSAL_HUMAN = {
  emoji: "⏱️",
  text: "La capacité à transformer du temps gagné en temps pédagogique utile — observer, écouter, ajuster"
};
