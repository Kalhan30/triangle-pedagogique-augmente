export const CONTRAINTES_NIVEAU = {
  primaire: {
    niveau: 'primaire',
    manipulationDirecteVerrou: 0,
    manipulationDirectePlafond: null,
    messageExplicatif: "Cadre juin 2025 : les élèves ne manipulent pas d'IA générative avant la 4e. Cet axe est donc verrouillé à 0 à ce niveau.",
    referenceTexte: "Les élèves du 1er degré sont sensibilisés aux connaissances de base sur les IA, mais ne manipulent pas directement des services d'IA générative.",
    bandeauExplorer: "⚠️ Rappel Cadre juin 2025 : à ce niveau, l'IA n'est pas manipulée directement par les élèves. Les exemples ci-dessous concernent l'impact médiatisé via l'usage professionnel de l'enseignant.",
  },
  college_6_5: {
    niveau: 'college_6_5',
    manipulationDirecteVerrou: 0,
    manipulationDirectePlafond: null,
    messageExplicatif: "Cadre juin 2025 : les élèves ne manipulent pas d'IA générative avant la 4e. Cet axe est donc verrouillé à 0 à ce niveau.",
    referenceTexte: "La manipulation d'outils d'IA générative par les élèves n'est pas autorisée avant la 4e.",
    bandeauExplorer: "⚠️ Rappel Cadre juin 2025 : à ce niveau, l'IA n'est pas manipulée directement par les élèves. Les exemples ci-dessous concernent l'impact médiatisé via l'usage professionnel de l'enseignant.",
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
    titre: 'Axe Élève–Savoir — Manipulation directe',
    description: "Cet axe mesure uniquement la manipulation directe de l'IA par l'élève.",
    reperes: [
      { plage: '0', texte: "L'élève ne touche jamais l'IA" },
      { plage: '20-40', texte: "L'élève observe une démonstration de l'IA faite par l'enseignant" },
      { plage: '40-65', texte: "L'élève utilise l'IA ponctuellement sous supervision directe (cours encadré)" },
      { plage: '65-85', texte: "L'élève utilise l'IA en autonomie dans un cadre défini" },
      { plage: '85-100', texte: "L'élève utilise l'IA sans cadre défini — zone rouge en contexte scolaire" },
    ],
    rappel: "Verrouillé à 0 en Primaire et 6e-5e, plafonné à 65 en 4e-3e.",
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
