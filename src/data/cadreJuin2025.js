export const CADRE_URL = 'https://www.education.gouv.fr/cadre-d-usage-de-l-ia-en-education-450647';

export const CADRE_SOURCE_LABEL = "Cadre d'usage de l'IA en éducation, Ministère de l'Éducation nationale, juin 2025.";

export const CADRE_JUIN_2025 = {
  primaire: {
    titre: "Cadre d'usage de l'IA en éducation — École primaire",
    corps: "Au premier degré, le cadre officiel prévoit une sensibilisation aux connaissances de base de l'intelligence artificielle, sans manipulation directe d'IA générative par les élèves. Les outils d'IA peuvent être utilisés par l'enseignant pour la préparation pédagogique (génération de supports différenciés, quiz, adaptations), dans le strict respect du RGPD et sans transmission de données personnelles d'élèves.",
    principe: "L'IA est un outil au service de l'enseignant, invisible pour les élèves à ce stade de la scolarité.",
  },
  college_6_5: {
    titre: "Cadre d'usage de l'IA en éducation — Collège 6e et 5e",
    corps: "En classes de 6e et 5e, la sensibilisation aux connaissances de base de l'IA se poursuit. La manipulation directe d'IA générative par les élèves n'est pas encore autorisée, mais les enseignants peuvent utiliser les IA pour leur préparation pédagogique et leur différenciation. Une introduction progressive à la littératie IA est recommandée, notamment dans le cadre de l'éducation aux médias et à l'information (EMI).",
    principe: "Préserver l'effort cognitif de l'élève, travailler la littératie IA sans manipulation directe.",
  },
  college_4_3: {
    titre: "Cadre d'usage de l'IA en éducation — Collège 4e et 3e",
    corps: "À partir de la classe de 4e, l'usage encadré des IA génératives par les élèves est autorisé, uniquement en classe et sous la supervision directe de l'enseignant. L'usage autonome hors classe n'est pas permis à ce niveau. Les règles de protection des données personnelles (RGPD) s'appliquent strictement : aucune donnée nominative ou sensible ne doit être transmise aux IA grand public.",
    principe: "Usage encadré en classe, supervision permanente de l'enseignant, préservation de la pensée critique.",
  },
  lycee_sup: {
    titre: "Cadre d'usage de l'IA en éducation — Lycée",
    corps: "Au lycée, dès la seconde générale et la première année de CAP, l'usage autonome encadré des IA génératives est autorisé pour les élèves. L'enseignant définit les règles d'usage disciplinaires et les moments où l'IA est mobilisée, en veillant à ce qu'elle ne se substitue pas à l'effort cognitif de l'élève. La littératie IA devient une compétence transversale attendue.",
    principe: "Autonomie responsable, usage disciplinaire raisonné, développement de la littératie IA comme compétence citoyenne.",
  },
};

export const PROGRAMMES_EDUSCOL_URL = 'https://eduscol.education.fr/74/j-enseigne';

export const REFERENCES_BO_PAR_NIVEAU = {
  primaire: [
    "Primaire Cycle 1 (maternelle) — Programmes de français et mathématiques, BO spécial n°40 du 31 octobre 2024",
    "Primaire Cycle 2 (CP-CE1-CE2) — Programmes de français et mathématiques, BO spécial n°40 du 31 octobre 2024",
    "Primaire Cycle 3 (CM1-CM2-6e) — Programmes de français et mathématiques, BO spécial n°16 du 17 avril 2025",
    "Enseignement moral et civique — BO du 13 juin 2024 (application progressive 2024-2027)",
  ],
  college_6_5: [
    "Cycle 3 (6e) — Programmes de français et mathématiques, BO spécial n°16 du 17 avril 2025",
    "Cycle 4 (5e) — Programmes en vigueur issus de l'arrêté du 9 novembre 2015 modifié",
    "Enseignement moral et civique — BO du 13 juin 2024 (application progressive 2024-2027)",
  ],
  college_4_3: [
    "Cycle 4 (5e-4e-3e) — Programmes en vigueur issus de l'arrêté du 9 novembre 2015 modifié",
    "Enseignement moral et civique — BO du 13 juin 2024 (application progressive 2024-2027)",
  ],
  lycee_sup: [
    "Lycée — Programmes en vigueur consultables sur Eduscol selon série (générale, technologique, professionnelle)",
    "Enseignement moral et civique — BO du 13 juin 2024 (application progressive 2024-2027)",
  ],
};

export const NIVEAU_LIBELLE = {
  primaire: 'Primaire (Cycles 1-3)',
  college_6_5: 'Collège (6e-5e)',
  college_4_3: 'Collège (4e-3e)',
  lycee_sup: 'Lycée',
};
