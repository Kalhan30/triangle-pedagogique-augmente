export const NIVEAUX = [
  {
    id: 'primaire',
    label: 'Primaire (Cycles 1-3)',
    shortLabel: 'Primaire',
    citation: "À 6 ans, l'enfant a besoin d'un regard, pas d'un écran.",
    cadreReglementaire: "IA générative ouverte réservée EXCLUSIVEMENT aux enseignants. Les élèves ne manipulent pas ChatGPT, Gemini, Claude. L'enseignant utilise l'IA générative pour préparer et différencier (Cadre MEN 2025). Les P2IA cycle 2 (Lalilo, Navi, Adaptiv'Math, Mathia, Smart Enseigno) sont une exception : services numériques développés par le MEN, autorisés en usage élève sous supervision.",
    regleAutorisation: "Les élèves du 1er degré sont sensibilisés aux connaissances de base sur les IA, mais ne manipulent pas directement des services d'IA générative ouverts (ChatGPT, Gemini, Claude…). Ils peuvent en revanche utiliser les P2IA développés dans le cadre du partenariat ministériel, sous supervision enseignante.",
    autorises: [
      "Sensibilisation aux notions de base de l'IA",
      "Développement de l'esprit critique sur l'IA",
      "Usage par l'enseignant pour préparer ses cours (sans données élèves)",
      "Usage des P2IA cycle 2 (Lalilo, Navi, Adaptiv'Math, Mathia, Smart Enseigno) par les élèves sous supervision",
    ],
    nonAutorises: [
      "Manipulation directe d'IA générative ouverte (ChatGPT, Gemini, Claude…) par les élèves",
      "Saisie de données personnelles d'élèves dans des services grand public",
    ],
    formulationAffichage: "Au primaire, l'IA générative ouverte est un outil professionnel de l'enseignant. Les élèves n'y accèdent pas directement — mais les P2IA cycle 2 (Lalilo, Navi, Adaptiv'Math, Mathia, Smart Enseigno) leur sont accessibles sous supervision.",
  },
  {
    id: 'college_6_5',
    label: 'Collège 6e-5e',
    shortLabel: '6e-5e',
    citation: "Avant la 4e, l'IA générative ouverte reste en coulisse : l'enseignant prépare, l'élève apprend sans médiation algorithmique directe.",
    cadreReglementaire: "IA générative ouverte INTERDITE aux élèves avant la 4e (Cadre MEN 2025). Sensibilisation possible sans manipulation directe. Exception 6ᵉ : les P2IA cycle 3 (Expliq, Edumalin, Mathia-C3, Origamia, Cards, yLANG) sont en expérimentation depuis janvier 2026 dans certaines académies.",
    regleAutorisation: "La manipulation d'outils d'IA générative ouverte par les élèves n'est pas autorisée avant la 4e. Les classes de 6ᵉ retenues pour l'expérimentation P2IA cycle 3 peuvent utiliser les six services correspondants.",
    autorises: [
      "Sensibilisation à l'IA, ses potentialités, ses risques et ses limites",
      "Usage par l'enseignant pour préparer ses cours",
      "Éveil à la citoyenneté numérique et à l'EMI",
      "Expérimentation P2IA cycle 3 en 6ᵉ (Expliq, Edumalin, Mathia-C3, Origamia, Cards, yLANG) — dans les académies retenues uniquement",
    ],
    nonAutorises: [
      "Utilisation autonome d'IA générative ouverte (ChatGPT, Gemini, Claude…) par les élèves de 6e et 5e",
    ],
    formulationAffichage: "Avant la 4e, l'IA générative ouverte reste l'outil de l'enseignant. Les classes de 6ᵉ retenues pour l'expérimentation P2IA cycle 3 sont l'exception.",
  },
  {
    id: 'college_4_3',
    label: 'Collège 4e-3e',
    shortLabel: '4e-3e',
    citation: "La 4e ouvre un nouveau territoire : l'IA devient objet d'apprentissage, sous l'œil attentif de l'enseignant.",
    cadreReglementaire: "IA générative AUTORISÉE à partir de la 4e, strictement encadrée. Formation obligatoire à l'IA en 4e.",
    regleAutorisation: "L'utilisation pédagogique des IA génératives par les élèves, limitée, encadrée, expliquée et accompagnée par l'enseignant, est autorisée en classe à partir de la 4e, en lien avec les objectifs des programmes scolaires et du CRCN.",
    autorises: [
      "Usage encadré en classe sous la responsabilité de l'enseignant",
      "Formation obligatoire à l'IA via parcours Pix IA (4e obligatoire)",
      "Supports pédagogiques construits avec IA",
    ],
    nonAutorises: [
      "Usage d'IA générative pour réaliser un devoir sans autorisation explicite (considéré comme fraude)",
      "Création de comptes sur services IA grand public à la demande de l'école",
    ],
    formulationAffichage: "À partir de la 4e, l'IA devient un objet pédagogique pour les élèves — encadrée, expliquée, accompagnée.",
  },
  {
    id: 'lycee_sup',
    label: 'Lycée & Supérieur',
    shortLabel: 'Lycée+',
    citation: "L'autonomie numérique se gagne quand l'esprit critique a été outillé.",
    cadreReglementaire: "Usage autonome par les élèves dans un cadre défini. Focus sur l'esprit critique, l'éthique et l'appropriation personnelle.",
    regleAutorisation: "Au lycée, les élèves peuvent utiliser les IA génératives de manière autonome dans un cadre d'apprentissage et de formation explicitement défini par l'enseignant.",
    autorises: [
      "Usage autonome par les élèves dans un cadre défini",
      "Formation obligatoire à l'IA en seconde (voies générales, technologiques, professionnelles)",
      "Formation obligatoire en 1re année de CAP",
      "Intégration aux projets d'évaluation pour préserver l'équité",
    ],
    nonAutorises: [
      "Usage non autorisé d'IA générative pour produire un devoir (assimilé à une fraude)",
      "Substitution à l'effort cognitif de l'élève dans les productions évaluées",
    ],
    formulationAffichage: "Au lycée, l'élève utilise l'IA en autonomie — mais toujours dans un cadre explicitement défini par l'enseignant.",
  },
];

export const getNiveau = (id) => NIVEAUX.find((n) => n.id === id);

export const AXES_META = {
  enseignantSavoir: {
    id: 'enseignantSavoir',
    label: 'Enseignant–Savoir',
    shortLabel: 'La préparation',
    color: '#0F766E',
    description: "Dimension professionnelle : l'enseignant et le savoir qu'il maîtrise, la préparation et la production de supports.",
  },
  enseignantEleve: {
    id: 'enseignantEleve',
    label: 'Enseignant–Élève',
    shortLabel: 'La relation',
    color: '#D97706',
    description: "Dimension humaine : la chaleur relationnelle, le regard, la médiation pédagogique.",
  },
  eleveSavoir: {
    id: 'eleveSavoir',
    label: 'Élève–Savoir',
    shortLabel: "L'apprentissage",
    color: '#7C3AED',
    description: "Dimension cognitive : la pensée en train de se construire, l'accès au savoir pour l'élève.",
  },
};

export const VERTICES_META = {
  enseignant: {
    id: 'enseignant',
    label: 'Enseignant',
    color: '#0F766E',
    description: "Le professionnel qui conçoit, médie et évalue. L'IA l'assiste mais ne le remplace pas.",
  },
  eleve: {
    id: 'eleve',
    label: 'Élève',
    color: '#D97706',
    description: "Le sujet qui apprend. Son effort cognitif, sa motivation et sa relation à l'enseignant sont irréductibles à l'IA.",
  },
  savoir: {
    id: 'savoir',
    label: 'Savoir',
    color: '#7C3AED',
    description: "Les contenus disciplinaires structurés. L'IA peut produire, reformuler, illustrer — l'humain valide.",
  },
};

export const ETHICS_ZONES = [
  { id: 'minimale', min: 0, max: 25, label: 'IA Minimale', color: '#0F766E', bgColor: 'rgba(15, 118, 110, 0.1)', message: "L'IA comme simple outil de forme. L'enseignant reste le seul maître à bord." },
  { id: 'partenaire', min: 25, max: 60, label: 'IA Partenaire', badge: 'ÉQUILIBRE', color: '#059669', bgColor: 'rgba(5, 150, 105, 0.1)', message: "Zone recommandée : l'IA amplifie l'expertise humaine sans la substituer." },
  { id: 'dominante', min: 60, max: 85, label: 'IA Dominante', badge: 'ATTENTION', color: '#D97706', bgColor: 'rgba(217, 119, 6, 0.1)', message: "Risque de surcompensation : l'enseignant délègue ses choix fondamentaux." },
  { id: 'totale', min: 85, max: 100, label: 'IA Totale', badge: 'ZONE ROUGE', color: '#DC2626', bgColor: 'rgba(220, 38, 38, 0.1)', message: "Effondrement du triangle : la relation humaine disparaît au profit du mécanique." },
];

export const getZoneEthique = (value) => {
  if (value < 25) return ETHICS_ZONES[0];
  if (value < 60) return ETHICS_ZONES[1];
  if (value < 85) return ETHICS_ZONES[2];
  return ETHICS_ZONES[3];
};

export const CONTENU_ACCUEIL = {
  titre: 'Triangle Pédagogique Augmenté',
  baseline: "L'IA en périphérie, l'humain au cœur.",
  blocHoussaye: {
    titre: 'Le cadre de base — Jean Houssaye, 1988',
    texte: "Une situation d'enseignement, c'est toujours un équilibre entre trois pôles : l'enseignant, l'élève et le savoir. Entre eux, trois processus : enseigner (Enseignant–Savoir), former (Enseignant–Élève), apprendre (Élève–Savoir). Quand un processus est privilégié, le troisième pôle « fait le mort ».",
  },
  blocAugmentation: {
    titre: "L'augmentation par l'IA",
    texte: "L'IA ne remplace aucun des trois pôles. Elle agit en périphérie, sur les axes. Elle peut absorber certaines tâches pour que l'enseignant garde du temps sur la relation humaine et la médiation. La question n'est plus « faut-il utiliser l'IA ? » mais « où a-t-elle sa place sans faire disparaître les liens qui constituent l'apprentissage ? ».",
  },
  modaleDetail: {
    titre: 'À propos du triangle pédagogique',
    texte: "Le triangle pédagogique de Jean Houssaye, publié en 1988 dans son ouvrage « Le triangle pédagogique », propose trois processus constitutifs de la situation d'enseignement : ENSEIGNER (l'axe Enseignant-Savoir, où l'enseignant prépare et structure le contenu) ; FORMER (l'axe Enseignant-Élève, relation humaine et médiation pédagogique) ; APPRENDRE (l'axe Élève-Savoir, l'effort cognitif de l'élève pour s'approprier le contenu). Houssaye démontre que privilégier un axe aboutit toujours à faire le mort le troisième pôle : une pédagogie qui sur-investit la préparation oublie l'élève, une pédagogie relationnelle perd parfois le savoir, une pédagogie centrée sur l'apprentissage autonome peut effacer l'enseignant. Le Triangle Augmenté par l'IA conserve ce cadre : l'IA n'est jamais un pôle du triangle — elle n'est ni enseignant, ni élève, ni savoir. Elle module les axes, en périphérie. Cette distinction est essentielle pour ne pas la laisser coloniser la relation pédagogique.",
  },
};
