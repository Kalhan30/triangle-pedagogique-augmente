export const QUESTIONS = [
  {
    id: 1,
    axe: 'enseignantSavoir',
    enonce: "Pour concevoir cette séance, qui produit les supports pédagogiques (fiches, exercices, consignes, corrigés) ?",
    choix: [
      { index: 1, libelle: "Je prépare tout moi-même, sans aide d'IA", valeur: 10 },
      { index: 2, libelle: "J'utilise l'IA comme ressource ponctuelle pour quelques idées", valeur: 30 },
      { index: 3, libelle: "L'IA génère une base que je retravaille beaucoup", valeur: 52 },
      { index: 4, libelle: "L'IA produit l'essentiel, je valide et j'ajuste", valeur: 75 },
      { index: 5, libelle: "Je délègue quasi totalement la production à l'IA", valeur: 92 },
    ],
  },
  {
    id: 2,
    axe: 'enseignantEleve',
    enonce: "Pendant la séance en classe, l'IA intervient-elle dans votre relation avec les élèves ?",
    choix: [
      { index: 1, libelle: "Aucune intervention de l'IA dans ma relation avec les élèves", valeur: 10 },
      { index: 2, libelle: "Je mentionne l'IA mais je ne la manipule pas devant eux", valeur: 30 },
      { index: 3, libelle: "J'utilise l'IA pour adapter mes réponses à certains élèves en temps réel", valeur: 52 },
      { index: 4, libelle: "Les élèves me voient utiliser l'IA et interagissent indirectement avec elle", valeur: 75 },
      { index: 5, libelle: "L'IA remplace partiellement ma médiation directe", valeur: 92, declencheAlerte: true, texteAlerte: "Cette option signale un usage à questionner : l'IA ne doit pas se substituer à la relation pédagogique." },
    ],
  },
  {
    id: 3,
    axe: 'eleveSavoirManipulation',
    contrainte: 'manipulation',
    enonce: "Dans cette séance, l'élève utilise-t-il lui-même une IA générative ouverte (ChatGPT, Gemini, Claude…) ?",
    aide: "Cette question ne concerne pas les P2IA (assistants institutionnels validés par le MEN comme MATHIA). Une question dédiée est prévue pour le primaire.",
    choix: [
      { index: 1, libelle: "L'élève ne touche aucune IA générative pendant cette séance", valeur: 10 },
      { index: 2, libelle: "L'élève observe une démonstration d'IA générative que je fais devant lui", valeur: 30 },
      { index: 3, libelle: "L'élève utilise l'IA générative ponctuellement sous ma supervision directe", valeur: 52 },
      { index: 4, libelle: "L'élève utilise l'IA générative en autonomie dans un cadre que j'ai défini", valeur: 75 },
      { index: 5, libelle: "L'élève utilise l'IA générative librement sans cadre strict", valeur: 92 },
    ],
  },
  {
    id: 4,
    axe: 'eleveSavoirImpactMediatise',
    enonce: "Même si l'élève ne manipule pas l'IA, dans quelle mesure votre usage professionnel de l'IA impacte-t-il son apprentissage ?",
    choix: [
      { index: 1, libelle: "Mon usage de l'IA n'a aucun impact sur ce que reçoit l'élève", valeur: 10 },
      { index: 2, libelle: "L'IA m'aide à organiser ma pensée, l'élève reçoit mon enseignement habituel", valeur: 30 },
      { index: 3, libelle: "L'IA m'aide à produire des supports différenciés que l'élève utilise", valeur: 52 },
      { index: 4, libelle: "Une large part de ce que l'élève reçoit a été co-conçue avec l'IA", valeur: 75 },
      { index: 5, libelle: "Ce que reçoit l'élève est quasi intégralement généré par IA (je valide et transmets)", valeur: 92 },
    ],
  },
  {
    id: 5,
    axe: 'ethiqueGlobal',
    enonce: "Parmi ces affirmations, laquelle décrit le mieux votre intention pédagogique dans cette séance ?",
    choix: [
      { index: 1, libelle: "Je limite volontairement l'IA pour protéger la construction cognitive de l'élève", valeur: 10 },
      { index: 2, libelle: "L'IA est un partenaire discret qui amplifie mon expertise sans la substituer", valeur: 30 },
      { index: 3, libelle: "L'IA prend une place significative, je reste vigilant sur les axes humains", valeur: 52 },
      { index: 4, libelle: "L'IA prend une place dominante dans cette séance, j'en mesure les enjeux", valeur: 75 },
      { index: 5, libelle: "L'IA est quasi omniprésente, je teste les limites acceptables en conscience", valeur: 92 },
    ],
  },
  {
    id: 6,
    axe: 'p2iaContextuel',
    visibleNiveaux: ['primaire'],
    enonce: "Intégrez-vous un P2IA (MATHIA, EXPLIQ, EDUMALIN, ORIGAMIA, CARDS, yLANG) dans vos séances ?",
    aide: "Les P2IA sont des assistants IA institutionnels validés par le Ministère, utilisables par les élèves de primaire sous supervision enseignante. Ils sont distincts des IA génératives ouvertes.",
    choix: [
      { index: 1, libelle: "Oui, régulièrement", valeur: null, code: 'oui_regulier' },
      { index: 2, libelle: "Ponctuellement", valeur: null, code: 'ponctuel' },
      { index: 3, libelle: "Pas encore, mais j'y réfléchis", valeur: null, code: 'pas_encore' },
    ],
  },
];

export function getQuestionsForNiveau(niveauId) {
  return QUESTIONS.filter((q) => !q.visibleNiveaux || q.visibleNiveaux.includes(niveauId));
}

export function choixEtat(question, choix, niveauId) {
  if (question.contrainte !== 'manipulation') return { state: 'free', alerte: choix.declencheAlerte ? choix.texteAlerte : null };
  if (niveauId === 'primaire' || niveauId === 'college_6_5') {
    return choix.index === 1
      ? { state: 'free', alerte: null }
      : { state: 'locked', alerte: "Le Cadre d'usage de l'IA en éducation (juin 2025) interdit la manipulation directe d'IA générative par les élèves avant la 4e." };
  }
  if (niveauId === 'college_4_3') {
    if (choix.index === 5) return { state: 'locked', alerte: "Non autorisé à ce niveau selon le Cadre juin 2025." };
    if (choix.index === 4) return { state: 'warning', alerte: "Attention : l'usage autonome de l'IA générative par l'élève n'est pas autorisé en 4e-3e selon le Cadre juin 2025. Cet usage doit rester encadré et accompagné." };
    return { state: 'free', alerte: null };
  }
  return { state: 'free', alerte: null };
}

export function valeurChoisie(question, choix, niveauId) {
  if (question.contrainte === 'manipulation') {
    if ((niveauId === 'primaire' || niveauId === 'college_6_5') && choix.index === 1) return 0;
    if (niveauId === 'college_4_3' && choix.index === 4) return 65;
  }
  return choix.valeur;
}

export function computeAxesFromResponses(responses, niveauId) {
  const find = (qid) => {
    const q = QUESTIONS.find((x) => x.id === qid);
    const r = responses[qid];
    if (!q || !r) return { valeur: 0, libelle: '' };
    const c = q.choix.find((ch) => ch.index === r);
    if (!c) return { valeur: 0, libelle: '' };
    return { valeur: valeurChoisie(q, c, niveauId), libelle: c.libelle };
  };
  const q1 = find(1), q2 = find(2), q3 = find(3), q4 = find(4), q5 = find(5);
  const axeEleveSavoirVisualise = Math.round(0.7 * q3.valeur + 0.3 * q4.valeur);

  let p2iaIntegration = null;
  const q6Meta = QUESTIONS.find((x) => x.id === 6);
  const q6Resp = responses[6];
  if (q6Meta && q6Resp && (!q6Meta.visibleNiveaux || q6Meta.visibleNiveaux.includes(niveauId))) {
    const choix = q6Meta.choix.find((c) => c.index === q6Resp);
    if (choix) p2iaIntegration = { code: choix.code, libelle: choix.libelle };
  }

  return {
    axeEnseignantSavoir: q1.valeur,
    axeEnseignantEleve: q2.valeur,
    axeEleveSavoirManipulation: q3.valeur,
    axeEleveSavoirImpactMediatise: q4.valeur,
    axeEleveSavoirVisualise,
    valeurEthiqueGlobale: q5.valeur,
    libelleQ1: q1.libelle,
    libelleQ2: q2.libelle,
    libelleQ3: q3.libelle,
    libelleQ4: q4.libelle,
    libelleQ5: q5.libelle,
    p2iaIntegration,
  };
}
