export const FAQ_ENTRIES = [
  {
    id: 'faq-1',
    ordre: 1,
    categorie: 'reglementaire',
    question: "Peut-on utiliser l'IA avec les élèves ?",
    reponse: "Cela dépend du niveau et du type d'IA. En primaire et en 6e-5e, les élèves ne manipulent pas directement d'IA générative ouverte (ChatGPT, Gemini…) ; l'enseignant peut en utiliser pour préparer ses cours. En revanche, les élèves peuvent utiliser les P2IA, des services numériques d'assistance développés dans le cadre du Partenariat d'innovation en intelligence artificielle (voir question dédiée). À partir de la 4e, les élèves peuvent utiliser l'IA générative en classe sous encadrement. Au lycée, ils peuvent l'utiliser en autonomie dans un cadre défini par l'enseignant. Source : Cadre d'usage de l'IA, juin 2025.",
  },
  {
    id: 'faq-p2ia',
    ordre: 1.5,
    categorie: 'reglementaire',
    question: "Et les P2IA ? Les élèves de primaire peuvent-ils les utiliser ?",
    reponse: "Oui, sous supervision enseignante. Les P2IA (Partenariat d'innovation en intelligence artificielle) sont des services numériques développés par le Ministère de l'Éducation nationale qui permettent aux élèves d'accéder à une assistance personnalisée dans leurs apprentissages. Cinq services sont déployés pour le cycle 2 depuis 2020 : Lalilo et Navi en français, Adaptiv'Math, Mathia et Smart Enseigno en mathématiques. À la différence des IA génératives ouvertes, ces outils fonctionnent dans un cadre juridique et éthique strict, sans saisie de données personnelles d'élèves dans des services grand public. Pour le cycle 3 (CM1, CM2, 6ᵉ), six nouveaux services sont en phase d'expérimentation depuis janvier 2026 : Expliq, Edumalin, Mathia-C3, Origamia, Cards, yLANG. Sources : Eduscol, Primàbord, DRANE Occitanie.",
  },
  {
    id: 'faq-2',
    ordre: 2,
    categorie: 'reglementaire',
    question: "Que risque un élève qui rend un devoir fait par IA sans autorisation ?",
    reponse: "Le cadre d'usage de juin 2025 assimile à une fraude scolaire tout recours à l'IA générative pour réaliser un devoir sans autorisation explicite de l'enseignant et sans travail personnel d'appropriation. Les établissements sont invités à diversifier les modalités d'évaluation pour préserver l'équité.",
  },
  {
    id: 'faq-3',
    ordre: 3,
    categorie: 'reglementaire',
    question: "Quelles données d'élèves puis-je saisir dans une IA ?",
    reponse: "Aucune donnée personnelle identifiante. Le cadre de juin 2025 est très clair : on parle de « un élève dyslexique » ou « un élève allophone », jamais de « Léa » ou « Mohamed ». Il est également interdit de demander aux élèves de créer un compte sur un service IA externe.",
  },
  {
    id: 'faq-4',
    ordre: 4,
    categorie: 'usage',
    question: "Le Triangle Pédagogique Augmenté, c'est quoi exactement ?",
    reponse: "C'est un outil de réflexivité professionnelle. Il reprend le triangle de Jean Houssaye (1988) — Enseignant / Élève / Savoir — et y ajoute la dimension IA comme quatrième variable qui module les trois relations existantes. L'objectif est de permettre à un enseignant de positionner ses propres choix sans recevoir une prescription descendante.",
  },
  {
    id: 'faq-5',
    ordre: 5,
    categorie: 'usage',
    question: "À quoi sert la zone éthique du curseur ?",
    reponse: "Elle traduit visuellement la tension croissante entre usage outillé de l'IA (zones froides, 0-60 %) et usage dominant voire total (zones chaudes, 60-100 %). La zone Partenaire (25-60 %) est recommandée pour la plupart des situations — c'est l'équilibre, pas le centre arithmétique. Chaque zone est associée à une citation du Cadre d'usage de juin 2025.",
  },
  {
    id: 'faq-6',
    ordre: 6,
    categorie: 'technique',
    question: "Mes données pédagogiques sont-elles enregistrées quelque part ?",
    reponse: "Non. Seul ton diagnostic actif est enregistré dans le navigateur (localStorage), uniquement sur ta machine. Aucune donnée n'est transmise à un serveur MaProfBranchee. Les appels à l'IA Claude passent par un proxy serveur qui protège ta clé d'API, et ne sont pas utilisés pour entraîner un modèle.",
  },
  {
    id: 'faq-7',
    ordre: 7,
    categorie: 'technique',
    question: "Une requête IA, ça consomme quoi côté environnement ?",
    reponse: "Une requête IA consomme environ 10 fois plus d'énergie qu'une recherche classique. Cette application est conçue pour un usage frugal : elle appelle l'IA uniquement quand tu le demandes explicitement, sans retry automatique, et les scénarios prédéfinis n'appellent pas d'API du tout.",
  },
  {
    id: 'faq-8',
    ordre: 8,
    categorie: 'usage',
    question: "Qui a conçu cet outil ?",
    reponse: "Vanessa Le Scolan-Nguyen, auteure du blog MaProfBranchee, coach scolaire et formatrice. L'outil s'inscrit dans sa feuille de route SINPA 2026 autour de la formation des enseignants au numérique pédagogique responsable.",
  },
];

export const CATEGORIES_META = {
  usage: { label: "Usage pédagogique", color: '#14B8A6' },
  technique: { label: 'Technique', color: '#8B5CF6' },
  reglementaire: { label: 'Cadre réglementaire', color: '#F59E0B' },
};
