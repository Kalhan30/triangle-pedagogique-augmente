export const CONTRAINTES_NIVEAU = {
  primaire: {
    niveau: 'primaire',
    manipulationDirecteVerrou: 0,
    manipulationDirectePlafond: null,
    messageExplicatif: "Cadre juin 2025 : les élèves ne manipulent pas d'IA générative ouverte avant la 4e. Cet axe est donc verrouillé à 0 à ce niveau. Les P2IA (services développés dans le cadre du Partenariat d'innovation en intelligence artificielle) sont une exception distincte — voir l'encart dédié.",
    referenceTexte: "Les élèves du 1er degré sont sensibilisés aux connaissances de base sur les IA, mais ne manipulent pas directement des services d'IA générative ouverts (ChatGPT, Gemini, Claude…). Ils peuvent en revanche utiliser les P2IA développés dans le cadre du partenariat ministériel, sous supervision enseignante.",
    bandeauExplorer: "⚠️ Rappel Cadre juin 2025 : à ce niveau, l'IA générative ouverte n'est pas manipulée directement par les élèves. Les exemples ci-dessous concernent l'impact médiatisé via l'usage professionnel de l'enseignant. Exception : les P2IA cycle 2 (Lalilo, Navi, Adaptiv'Math, Mathia, Smart Enseigno) peuvent être utilisés par les élèves sous supervision — voir l'encart dédié.",
  },
  college_6_5: {
    niveau: 'college_6_5',
    manipulationDirecteVerrou: 0,
    manipulationDirectePlafond: null,
    messageExplicatif: "Cadre juin 2025 : les élèves ne manipulent pas d'IA générative ouverte avant la 4e. Cet axe est donc verrouillé à 0 à ce niveau. Les P2IA cycle 3 (en expérimentation depuis janvier 2026) sont une exception pour les classes de 6ᵉ retenues.",
    referenceTexte: "La manipulation d'outils d'IA générative ouverte par les élèves n'est pas autorisée avant la 4e. Les classes de 6ᵉ retenues pour l'expérimentation P2IA cycle 3 peuvent utiliser Expliq, Edumalin, Mathia-C3, Origamia, Cards et yLANG.",
    bandeauExplorer: "⚠️ Rappel Cadre juin 2025 : à ce niveau, l'IA générative ouverte n'est pas manipulée directement par les élèves. Les exemples ci-dessous concernent l'impact médiatisé via l'usage professionnel de l'enseignant. Exception : les P2IA cycle 3 (en expérimentation dans certaines classes de 6ᵉ) — voir l'encart dédié.",
  },
  college_4_3: {
    niveau: 'college_4_3',
    manipulationDirecteVerrou: null,
    manipulationDirectePlafond: 65,
    messageExplicatif: "Cadre juin 2025 : l'usage est autorisé uniquement encadré et accompagné par l'enseignant. Au-delà de 65, vous décrivez un usage autonome non autorisé à ce niveau.",
    referenceTexte: "L'utilisation pédagogique des IA génératives par les élèves, limitée, encadrée, expliquée et accompagnée par l'enseignant, est autorisée en classe à partir de la 4e.",
    bandeauExplorer: "À ce niveau, l'élève peut manipuler l'IA en classe sous encadrement de l'enseignant. L'usage autonome hors cadre scolaire n'est pas autorisé.",
  },
  lycee_sup: {
    niveau: 'lycee_sup',
    manipulationDirecteVerrou: null,
    manipulationDirectePlafond: null,
    messageExplicatif: "Au lycée, les élèves peuvent utiliser l'IA de manière autonome dans un cadre d'apprentissage et de formation explicitement défini par l'enseignant (Cadre juin 2025).",
    referenceTexte: "Au lycée, les élèves peuvent utiliser les IA génératives de manière autonome dans un cadre d'apprentissage et de formation explicitement défini par l'enseignant.",
    bandeauExplorer: null,
  },
};

export const getContrainte = (niveauId) => CONTRAINTES_NIVEAU[niveauId];

// P2IA — Partenariat d'innovation en intelligence artificielle (MEN)
// Deux vagues distinctes : Cycle 2 (déployés depuis 2020) et Cycle 3 (en expérimentation
// depuis janvier 2026). Sources : Eduscol, Primàbord, DRANE Occitanie, MaProfBranchee.

// P2IA Cycle 2 — CP, CE1, CE2 — déployés depuis 2020
export const P2IA_CYCLE_2 = [
  {
    nom: 'Lalilo',
    discipline: 'Français',
    description: "Parcours d'apprentissage personnalisés en lecture, différenciation par l'IA pour les élèves de cycle 2.",
    precision: "Payant depuis septembre 2025 (19 à 49 €/an selon la classe). Version basique gratuite limitée. Accès gratuit maintenu dans les Territoires Numériques Éducatifs.",
  },
  {
    nom: 'Navi',
    discipline: 'Français',
    description: "Assistant pour la remédiation et la mémorisation de compétences de lecture et d'écriture au cycle 2. Parcours d'apprentissage personnalisés et adaptatifs.",
  },
  {
    nom: "Adaptiv'Math",
    discipline: 'Mathématiques',
    description: "Personnalisation des parcours d'apprentissage mathématiques par l'IA adaptative.",
    precision: "Gratuit pour 2025-2026 via EvidenceB, passage au payant prévu en septembre 2026.",
  },
  {
    nom: 'Mathia',
    discipline: 'Mathématiques',
    description: "Dispositif d'accompagnement par dialogue naturel et représentation holographique. L'élève apprend en parlant, en essayant et en s'amusant avec un robot sympathique.",
    precision: "Mathia reste actif pour le cycle 2 et a été sélectionné pour le cycle 3 sous le nom Mathia-C3.",
  },
  {
    nom: 'Smart Enseigno',
    discipline: 'Mathématiques',
    description: "Assistance numérique basée sur l'IA pour la personnalisation des apprentissages et des acquisitions notionnelles.",
  },
];

// P2IA Cycle 3 — CM1, CM2, 6ᵉ — en expérimentation depuis janvier 2026
export const P2IA_CYCLE_3 = [
  {
    nom: 'Expliq',
    discipline: 'Français',
    description: "Compréhension de texte via apprentissage interactif et personnalisé. L'élève collabore, exerce son esprit critique, ose s'exprimer, tout en s'exerçant de manière interactive.",
    realisePar: 'Edinnov, Mathena, Scopeo, IRIT – équipe SAMoVa (Université de Toulouse)',
  },
  {
    nom: 'Edumalin',
    discipline: 'Français',
    description: "Stratégies d'apprentissage avec un pas-à-pas méthodologique paramétrable par l'enseignant, enrichi de feedbacks en temps réel pour adapter le parcours.",
    realisePar: 'MFB',
  },
  {
    nom: 'Mathia-C3',
    discipline: 'Mathématiques',
    description: "Exploration des concepts mathématiques par la manipulation et la visualisation 3D, interaction avec un compagnon numérique. Construction du raisonnement par tâtonnement et essais-erreurs.",
    realisePar: 'Prof en Poche, Tralalere',
  },
  {
    nom: 'Origamia',
    discipline: 'Mathématiques',
    description: "Solution hybride combinant activités sur papier et plateforme numérique interactive. Extension de la feuille pour une expérimentation ludique. Parcours adaptés sur mesure.",
    realisePar: 'Cabrilog, Université de Grenoble Alpes, Cantoo, Le Livre scolaire, Vittascience',
  },
  {
    nom: 'Cards',
    discipline: 'Langues vivantes',
    description: "Jeu de cartes de compétences à collectionner pour progresser en langues. L'élève s'entraîne, relève des défis linguistiques et affronte des bots à l'aide des cartes obtenues.",
    realisePar: 'Beneylu',
  },
  {
    nom: 'yLANG',
    discipline: 'Langues vivantes',
    description: "Différenciation des apprentissages grâce à la reconnaissance vocale, améliorant l'expression orale et la prononciation. Bot conversationnel pour accompagner l'enseignant.",
    realisePar: 'Neuronys Nolej',
  },
];

export const P2IA_URL_EDUSCOL_CYCLE_2 = 'https://eduscol.education.fr/1911/partenariat-d-innovation-et-intelligence-artificielle-p2ia';
export const P2IA_URL_EDUSCOL_CYCLE_3 = 'https://eduscol.education.fr/4289/l-intelligence-artificielle-au-service-des-apprentissages-au-cycle-3';

export const AIDE_SLIDERS = {
  enseignantSavoir: {
    titre: 'Axe Enseignant–Savoir (préparation)',
    description: "Cet axe mesure la place de l'IA dans votre préparation de séance en amont.",
    reperes: [
      { plage: '0-20', texte: "Vous préparez tout vous-même sans IA" },
      { plage: '20-40', texte: "Vous utilisez l'IA comme ressource ponctuelle" },
      { plage: '40-65', texte: "L'IA génère une base que vous retravaillez" },
      { plage: '65-85', texte: "L'IA produit l'essentiel, vous validez" },
      { plage: '85-100', texte: "Vous déléguez quasi totalement à l'IA" },
    ],
  },
  enseignantEleve: {
    titre: 'Axe Enseignant–Élève (relation)',
    description: "Cet axe mesure si l'IA intervient dans votre relation directe avec les élèves pendant la séance.",
    reperes: [
      { plage: '0-20', texte: "Aucune intervention IA dans la relation" },
      { plage: '20-40', texte: "L'IA mentionnée mais non manipulée" },
      { plage: '40-65', texte: "L'IA utilisée pour adapter vos réponses à certains élèves" },
      { plage: '65-85', texte: "Les élèves interagissent avec l'IA sous votre supervision" },
      { plage: '85-100', texte: "L'IA remplace partiellement votre médiation — zone à questionner" },
    ],
  },
  eleveSavoirManipulation: {
    titre: 'Axe Élève–Savoir — Manipulation directe d\'IA générative',
    description: "Cet axe mesure uniquement la manipulation directe d'IA générative ouverte (ChatGPT, Gemini, Claude…) par l'élève. Les P2IA (assistants institutionnels validés) constituent une catégorie distincte non mesurée ici.",
    reperes: [
      { plage: '0', texte: "L'élève ne manipule aucune IA générative" },
      { plage: '20-40', texte: "L'élève observe une démonstration d'IA générative faite par l'enseignant" },
      { plage: '40-65', texte: "L'élève utilise l'IA générative ponctuellement sous supervision directe" },
      { plage: '65-85', texte: "L'élève utilise l'IA générative en autonomie dans un cadre défini" },
      { plage: '85-100', texte: "L'élève utilise l'IA générative sans cadre défini — zone rouge en contexte scolaire" },
    ],
    rappel: "Verrouillé à 0 en Primaire et 6e-5e, plafonné à 65 en 4e-3e. N'inclut pas les P2IA.",
  },
  eleveSavoirImpactMediatise: {
    titre: 'Axe Élève–Savoir — Impact médiatisé',
    description: "Cet axe mesure comment votre usage professionnel de l'IA impacte indirectement l'apprentissage de l'élève, même quand il ne manipule pas l'IA.",
    reperes: [
      { plage: '0-20', texte: "Votre usage IA n'a aucun impact sur ce que reçoit l'élève" },
      { plage: '20-40', texte: "L'IA vous aide à organiser votre pensée, l'élève reçoit un enseignement que vous auriez produit seul" },
      { plage: '40-65', texte: "L'IA vous aide à produire des supports différenciés que l'élève utilise" },
      { plage: '65-85', texte: "Une large part de ce que reçoit l'élève a été co-conçue avec l'IA" },
      { plage: '85-100', texte: "Ce que reçoit l'élève est quasi intégralement généré par IA, vous validez et transmettez" },
    ],
    rappel: "Libre à tous les niveaux — cet axe ne concerne pas la manipulation par l'élève.",
  },
};
