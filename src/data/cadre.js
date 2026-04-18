export const CADRE_SOURCE = {
  titre: "L'IA en éducation — Cadre d'usage",
  auteur: "Ministère de l'Éducation nationale (DNE)",
  date: "Juin 2025",
  url: 'https://education.gouv.fr/cadre-d-usage-de-l-ia-en-education-450647',
  mention: "Cadre d'usage de l'IA en éducation, Ministère de l'Éducation nationale, juin 2025.",
};

export const PRINCIPES = [
  {
    id: 1,
    titre: 'Plus-value pédagogique',
    citation: "S'assurer de la plus-value pédagogique du recours à l'IA.",
    application: "Chaque analyse répond à la question : qu'apporte l'IA ici par rapport à une pratique sans IA ?",
  },
  {
    id: 2,
    titre: 'Protection des données',
    citation: "Veiller à la protection des données saisies dans les outils grand public.",
    application: "Aucune donnée élève identifiante acceptée. Détection proactive des prénoms avant envoi.",
  },
  {
    id: 3,
    titre: 'Impact environnemental',
    citation: "Être conscient de l'impact environnemental de l'IA générative.",
    application: "Pas de retry automatique, pas d'appel spéculatif. L'IA est sollicitée uniquement à la demande.",
  },
  {
    id: 4,
    titre: 'Transparence',
    citation: "Faire preuve de transparence dans son utilisation.",
    application: "Chaque résultat Claude est signalé comme « analyse générée par IA ». Les contenus humains (citations, descriptifs) sont distingués.",
  },
  {
    id: 5,
    titre: 'Esprit critique',
    citation: "Exercer son esprit critique face aux contenus produits.",
    application: "L'application n'affirme jamais « voici la bonne réponse ». Les axes proposés sont des hypothèses à valider par l'enseignant.",
  },
];

export const ZONE_CITATIONS = {
  minimale: {
    citation: "L'usage de l'IA est conditionné à sa plus-value pédagogique.",
    interpretation: "Zone d'usage très limité, souvent justifiée par les enjeux de construction cognitive des apprentissages fondamentaux.",
    principeRef: 1,
  },
  partenaire: {
    citation: "L'usage de l'IA ne doit porter atteinte ni à la valeur fondamentale de la relation humaine, ni aux apprentissages des élèves, ni aux pratiques professionnelles des personnels.",
    interpretation: "Zone d'équilibre : l'IA amplifie l'expertise humaine sans la substituer.",
    principeRef: 1,
  },
  dominante: {
    citation: "L'usage de l'IA dans la prise de décision éducative, pédagogique ou administrative doit être exercé en toute transparence et responsabilité, avec une communication explicite sur son rôle et la façon dont elle a été utilisée.",
    interpretation: "Validation pédagogique critique : l'enseignant doit pouvoir justifier chaque choix délégué à l'IA.",
    principeRef: 4,
  },
  totale: {
    citation: "L'IA ne doit pas se substituer aux apprentissages des élèves. Tout recours à l'IA générative pour réaliser un devoir scolaire, sans autorisation explicite et sans travail personnel d'appropriation, sera considéré comme une fraude.",
    interpretation: "Zone à éviter en contexte scolaire : l'IA ne remplace pas les liens pédagogiques, elle les fait disparaître.",
    principeRef: 5,
  },
};

export const INTERDITS = [
  {
    id: 1,
    intitule: 'Données personnelles dans outils grand public',
    citation: "Aucune donnée personnelle ou confidentielle ne doit être saisie dans des outils d'IA accessibles au grand public.",
  },
  {
    id: 2,
    intitule: "Création de comptes par les élèves",
    citation: "Il est interdit de demander aux élèves de créer un compte sur des services IA externes.",
  },
  {
    id: 3,
    intitule: 'Devoirs faits par IA sans autorisation',
    citation: "Tout recours à l'IA générative pour réaliser un devoir scolaire, sans autorisation explicite et sans travail personnel d'appropriation, sera considéré comme une fraude.",
  },
  {
    id: 4,
    intitule: "Détecteurs d'IA comme preuve",
    citation: "L'usage de détecteurs de textes générés par IA est déconseillé. Ils sont peu fiables et risquent de pénaliser à tort.",
  },
  {
    id: 5,
    intitule: 'IA générative par les élèves avant la 4e',
    citation: "La manipulation d'outils d'IA générative par les élèves n'est autorisée qu'à partir de la classe de 4e.",
  },
];
