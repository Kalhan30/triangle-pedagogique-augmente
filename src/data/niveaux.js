export const NIVEAUX = [
  {
    id: 'primaire',
    label: 'Primaire (Cycles 1-3)',
    shortLabel: 'Primaire',
    citation: "À 6 ans, l'enfant a besoin d'un regard, pas d'un écran.",
    cadreReglementaire: "IA générative réservée EXCLUSIVEMENT aux enseignants. Les élèves ne manipulent pas d'IA. L'enseignant utilise l'IA pour préparer et différencier (Cadre MEN 2025).",
  },
  {
    id: 'college_6_5',
    label: 'Collège 6e-5e',
    shortLabel: '6e-5e',
    citation: "Avant la 4e, l'IA reste en coulisse : l'enseignant prépare, l'élève apprend sans médiation algorithmique.",
    cadreReglementaire: "IA générative INTERDITE aux élèves avant la 4e (Cadre MEN 2025). Sensibilisation possible sans manipulation directe.",
  },
  {
    id: 'college_4_3',
    label: 'Collège 4e-3e',
    shortLabel: '4e-3e',
    citation: "La 4e ouvre un nouveau territoire : l'IA devient objet d'apprentissage, sous l'œil attentif de l'enseignant.",
    cadreReglementaire: "IA générative AUTORISÉE à partir de la 4e, strictement encadrée. Formation obligatoire à l'IA en 4e.",
  },
  {
    id: 'lycee_sup',
    label: 'Lycée & Supérieur',
    shortLabel: 'Lycée+',
    citation: "L'autonomie numérique se gagne quand l'esprit critique a été outillé.",
    cadreReglementaire: "Usage autonome par les élèves dans un cadre défini. Focus sur l'esprit critique, l'éthique et l'appropriation personnelle.",
  },
];

export const getNiveau = (id) => NIVEAUX.find((n) => n.id === id);

export const AXES_META = {
  enseignantSavoir: {
    id: 'enseignantSavoir',
    label: 'Enseignant–Savoir',
    shortLabel: 'La préparation',
    color: '#14B8A6',
    description: "Dimension professionnelle : l'enseignant et le savoir qu'il maîtrise, la préparation et la production de supports.",
  },
  enseignantEleve: {
    id: 'enseignantEleve',
    label: 'Enseignant–Élève',
    shortLabel: 'La relation',
    color: '#F59E0B',
    description: "Dimension humaine : la chaleur relationnelle, le regard, la médiation pédagogique.",
  },
  eleveSavoir: {
    id: 'eleveSavoir',
    label: 'Élève–Savoir',
    shortLabel: "L'apprentissage",
    color: '#8B5CF6',
    description: "Dimension cognitive : la pensée en train de se construire, l'accès au savoir pour l'élève.",
  },
};

export const VERTICES_META = {
  enseignant: {
    id: 'enseignant',
    label: 'Enseignant',
    color: '#14B8A6',
    description: "Le professionnel qui conçoit, médie et évalue. L'IA l'assiste mais ne le remplace pas.",
  },
  eleve: {
    id: 'eleve',
    label: 'Élève',
    color: '#F59E0B',
    description: "Le sujet qui apprend. Son effort cognitif, sa motivation et sa relation à l'enseignant sont irréductibles à l'IA.",
  },
  savoir: {
    id: 'savoir',
    label: 'Savoir',
    color: '#8B5CF6',
    description: "Les contenus disciplinaires structurés. L'IA peut produire, reformuler, illustrer — l'humain valide.",
  },
};

export const ETHICS_ZONES = [
  { id: 'minimale', min: 0, max: 25, label: 'IA Minimale', color: '#14B8A6', bgColor: 'rgba(20, 184, 166, 0.15)', message: "L'IA comme simple outil de forme. L'enseignant reste le seul maître à bord." },
  { id: 'partenaire', min: 25, max: 60, label: 'IA Partenaire', badge: 'ÉQUILIBRE', color: '#22C55E', bgColor: 'rgba(34, 197, 94, 0.15)', message: "Zone recommandée : l'IA amplifie l'expertise humaine sans la substituer." },
  { id: 'dominante', min: 60, max: 85, label: 'IA Dominante', badge: 'ATTENTION', color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.15)', message: "Risque de surcompensation : l'enseignant délègue ses choix fondamentaux." },
  { id: 'totale', min: 85, max: 100, label: 'IA Totale', badge: 'ZONE ROUGE', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.15)', message: "Effondrement du triangle : la relation humaine disparaît au profit du mécanique." },
];

export const getZoneEthique = (value) => {
  if (value < 25) return ETHICS_ZONES[0];
  if (value < 60) return ETHICS_ZONES[1];
  if (value < 85) return ETHICS_ZONES[2];
  return ETHICS_ZONES[3];
};
