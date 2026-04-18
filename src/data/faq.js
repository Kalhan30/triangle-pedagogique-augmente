export const FAQ_ENTRIES = [
  {
    id: 'faq-1',
    ordre: 1,
    question: "Le Triangle Pédagogique Augmenté, c'est quoi exactement ?",
    reponse: "C'est un outil de réflexivité professionnelle. Il reprend le triangle de Jean Houssaye (1988) — Enseignant / Élève / Savoir — et y ajoute la dimension IA comme quatrième variable qui module les trois relations existantes. L'objectif est de permettre à un enseignant de positionner ses propres choix sans recevoir une prescription descendante.",
  },
  {
    id: 'faq-2',
    ordre: 2,
    question: "Pourquoi quatre niveaux scolaires distincts ?",
    reponse: "Parce que le cadre réglementaire du MEN (juin 2025) distingue explicitement ces quatre paliers : l'IA est interdite aux élèves avant la 4e, autorisée sous supervision en 4e-3e, et utilisée en autonomie au lycée et dans le supérieur. L'outil reflète cette gradation.",
  },
  {
    id: 'faq-3',
    ordre: 3,
    question: "Mes données pédagogiques sont-elles enregistrées quelque part ?",
    reponse: "Non. Seul ton diagnostic actif est enregistré dans le navigateur (localStorage), uniquement sur ta machine. Aucune donnée n'est transmise à un serveur MaProfBranchee. Les appels à l'IA Claude ne persistent pas et ne sont pas utilisés à des fins d'entraînement.",
  },
  {
    id: 'faq-4',
    ordre: 4,
    question: "Que faire si je tape un prénom d'élève par erreur ?",
    reponse: "L'application détecte les patterns qui ressemblent à des prénoms et te propose de les remplacer par un terme générique avant l'envoi. Claude est également instruit dans son prompt système d'anonymiser toute donnée identifiante qui passerait malgré tout.",
  },
  {
    id: 'faq-5',
    ordre: 5,
    question: "Le générateur Claude est en panne, que se passe-t-il ?",
    reponse: "L'application bascule automatiquement sur un scénario prédéfini du niveau courant, avec le message 'Le générateur se repose'. Tu peux continuer à explorer l'outil sans interruption.",
  },
  {
    id: 'faq-6',
    ordre: 6,
    question: "À quoi sert la zone éthique du curseur ?",
    reponse: "Elle traduit visuellement la tension croissante entre usage outillé de l'IA (zones froides, 0-60 %) et usage dominant voire total (zones chaudes, 60-100 %). La zone Partenaire (25-60 %) est recommandée pour la plupart des situations — c'est l'équilibre, pas le centre arithmétique.",
  },
  {
    id: 'faq-7',
    ordre: 7,
    question: "Puis-je utiliser la fiche PDF en formation professionnelle ?",
    reponse: "Oui. La fiche est conçue pour être imprimée A4 et circulée en salle des profs, en formation continue ou dans un rapport d'autoévaluation. Elle contient ton diagnostic, les axes positionnés et trois recommandations actionnables.",
  },
  {
    id: 'faq-8',
    ordre: 8,
    question: "Qui a conçu cet outil ?",
    reponse: "Vanessa Le Scolan-Nguyen, auteure du blog MaProfBranchee, coach scolaire et formatrice. L'outil s'inscrit dans sa feuille de route SINPA 2026 autour de la formation des enseignants au numérique pédagogique responsable.",
  },
];
