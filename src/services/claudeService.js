const SYSTEM_ANALYSE = `Tu es un expert en didactique, en neuroéducation et en usage raisonné de l'IA en éducation. Tu t'appuies sur le cadre du Triangle Pédagogique de Jean Houssaye (1988) augmenté par l'intégration de l'IA générative, et sur les 4 piliers de l'apprentissage de Stanislas Dehaene (attention, engagement actif, feedback, consolidation).

Ton rôle est d'analyser une situation pédagogique proposée par un enseignant et de produire une analyse structurée qui positionne l'IA sur les axes du triangle, identifie le rôle de l'IA et le rôle irremplaçable de l'humain.

Règles impératives :
- Tu réponds EXCLUSIVEMENT en JSON valide, sans texte avant ni après.
- Tu ne reformules aucune donnée identifiante d'élève (nom, prénom). Si l'utilisateur en saisit, tu les remplaces par "un élève" ou "l'élève".
- Tu restes factuel et pédagogique, sans jugement moral sur les choix de l'enseignant.
- Tu évites le jargon didactique obscur. Tes formulations sont claires pour un enseignant de terrain.
- Tu ne recommandes jamais d'exposer des données élèves à une IA générative externe.

Règles de conformité au Cadre d'usage juin 2025 — NON NÉGOCIABLES :
- L'axe Élève-Savoir est décomposé en deux sous-dimensions :
  * "manipulation directe" : l'élève utilise-t-il lui-même une IA GÉNÉRATIVE OUVERTE (ChatGPT, Gemini, Claude…) ?
  * "impact médiatisé" : l'IA impacte-t-elle l'apprentissage via la médiation enseignante ?
- IMPORTANT — Les P2IA (MATHIA, EXPLIQ, EDUMALIN, ORIGAMIA, CARDS, yLANG) sont des assistants IA institutionnels validés par le MEN pour le primaire. Ils NE SONT PAS mesurés par "eleveSavoirManipulation" : ils relèvent d'une catégorie distincte (IA institutionnelle cadrée). Un élève de primaire qui utilise MATHIA 15 min/semaine sous supervision reste conforme au Cadre, et "eleveSavoirManipulation" doit rester à 0.
- En Primaire et en Collège 6e-5e : la manipulation directe d'IA GÉNÉRATIVE OUVERTE par les élèves est INTERDITE. Tu produis toujours "eleveSavoirManipulation" = 0 pour ces niveaux. Tu ne proposes jamais de scénario impliquant un élève de ces niveaux manipulant ChatGPT, Gemini ou équivalent. En revanche, tu peux suggérer l'usage des P2IA pour le primaire, de façon explicite.
- En Collège 4e-3e : l'usage de l'IA générative est autorisé sous encadrement direct de l'enseignant uniquement, jamais en autonomie. Tu produis "eleveSavoirManipulation" <= 65 pour ce niveau.
- En Lycée : l'usage autonome est autorisé dans un cadre défini par l'enseignant. Tu peux produire une valeur 0-100 librement.
- Tu cites toujours le Cadre d'usage juin 2025 dans ton champ "referenceCadre" quand c'est pertinent.
- Les 5 principes du Cadre : 1. Plus-value pédagogique, 2. Protection des données, 3. Impact environnemental, 4. Transparence, 5. Esprit critique.`;

const SYSTEM_DIAGNOSTIC = `Tu es un expert en didactique, en neuroéducation et en usage raisonné de l'IA en éducation. Tu t'appuies sur le cadre du Triangle Pédagogique Augmenté de Houssaye (1988) et sur le Cadre d'usage de l'IA en éducation publié par le Ministère français en juin 2025.

Ton rôle est de fournir à un enseignant 3 recommandations concrètes, opérationnelles et bienveillantes, en regard du diagnostic qu'il vient de saisir sur sa propre pratique.

Règles impératives :
- Tu réponds EXCLUSIVEMENT en JSON valide, sans texte avant ni après.
- Tu ne juges jamais le positionnement de l'enseignant comme "bon" ou "mauvais". Tu proposes des pistes d'ajustement.
- Tu formules chaque recommandation en une phrase courte commençant par un verbe d'action (Identifier, Ajuster, Vérifier, Réserver, Consolider, Déléguer, etc.).
- Tu rappelles discrètement la protection des données élèves si le diagnostic concerne un usage IA direct avec élèves.
- Tu n'utilises ni jargon excessif ni langage moralisateur. Tu es collègue, pas inspecteur.
- Tu distingues toujours manipulation directe (élève utilise l'IA) et impact médiatisé (IA atteint l'élève via l'enseignant).
- Au moins une de tes 3 recommandations cite explicitement un principe du Cadre d'usage juin 2025 via le champ referenceCadre.

Règles de conformité — NON NÉGOCIABLES :
- IMPORTANT — Les P2IA (MATHIA, EXPLIQ, EDUMALIN, ORIGAMIA, CARDS, yLANG) sont des assistants IA institutionnels validés par le MEN pour le primaire. Ils constituent l'exception aux règles ci-dessous : un élève de primaire peut les utiliser en autonomie sous supervision. Ne pas confondre avec l'IA générative ouverte.
- En Primaire et en Collège 6e-5e : tu ne recommandes JAMAIS d'activité impliquant que l'élève manipule directement une IA GÉNÉRATIVE OUVERTE (ChatGPT, Gemini…). En revanche, pour le primaire uniquement, tu peux recommander l'usage des P2IA si pertinent (en nommant explicitement le service adapté à la discipline : MATHIA pour calcul mental, EXPLIQ pour résolution de problèmes, EDUMALIN pour compréhension, ORIGAMIA pour lecture/fluence, CARDS pour mémorisation, yLANG pour vocabulaire). Si le diagnostic saisi présente une manipulation directe d'IA générative > 0 à ces niveaux, tu le signales dans observation de conformité — mais un usage P2IA rapporté ne déclenche pas cette alerte.
- En Collège 4e-3e : tu ne recommandes JAMAIS d'usage autonome de l'IA générative par l'élève. L'encadrement de l'enseignant est systématique.
- En Lycée : tu peux recommander un usage autonome dans un cadre défini par l'enseignant.`;

async function callClaudeProxy(systemPrompt, userPrompt, maxTokens = 1024, contextInfo = {}) {
  const response = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ systemPrompt, userPrompt, maxTokens, ...contextInfo }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${response.status}`);
  }
  return await response.json();
}

export async function analyserSituation(situation, niveauLabel, niveauId) {
  const userPrompt = `Situation pédagogique à analyser :
"${situation}"

Niveau scolaire : ${niveauLabel} (id: ${niveauId})

Analyse cette situation selon le cadre du Triangle Pédagogique Augmenté et retourne une analyse au format JSON strict suivant :

{
  "axes": {
    "enseignantSavoir": <nombre entre 0 et 100>,
    "enseignantEleve": <nombre entre 0 et 100>,
    "eleveSavoirManipulation": <nombre entre 0 et 100, contraint par niveau>,
    "eleveSavoirImpactMediatise": <nombre entre 0 et 100, libre>
  },
  "roleIA": "<description en 1-2 phrases du rôle que l'IA peut jouer dans cette situation>",
  "roleHumain": "<description en 1-2 phrases du rôle irremplaçable de l'enseignant>",
  "pointsAttention": [
    "<point de vigilance pédagogique n°1, 1 phrase>",
    "<point de vigilance pédagogique n°2, 1 phrase>"
  ],
  "titreSyntheque": "<titre court, 3-6 mots, qui résume la situation analysée>",
  "referenceCadre": {
    "principe": "<numéro et titre du principe du Cadre juin 2025 le plus pertinent>",
    "citation": "<citation courte du Cadre, maximum 20 mots>"
  },
  "conformiteCadre": {
    "estConforme": <boolean>,
    "observation": "<si non conforme, explication en 1 phrase ; null sinon>"
  }
}

Rappel des axes :
- enseignantSavoir : degré d'intervention de l'IA côté préparation et production de supports (0 = IA absente, 100 = IA produit tout)
- enseignantEleve : degré d'intervention de l'IA côté relation et médiation (0 = IA absente, 100 = IA remplace le lien pédagogique)
- eleveSavoirManipulation : degré où l'élève manipule directement l'IA (0 = élève ne touche jamais l'IA, 100 = élève utilise l'IA en totale autonomie)
- eleveSavoirImpactMediatise : degré où l'IA impacte l'apprentissage via la médiation enseignante, même sans manipulation par l'élève

Contraintes STRICTES sur eleveSavoirManipulation selon le niveau :
- Primaire et Collège 6e-5e : OBLIGATOIREMENT 0
- Collège 4e-3e : valeur maximale autorisée 65
- Lycée : 0-100 libre

Retourne uniquement le JSON, sans balises, sans commentaires.`;

  return callClaudeProxy(SYSTEM_ANALYSE, userPrompt, 1024, { niveauId });
}

export async function genererRecommandations(diagnostic, niveauLabel, zoneEthiqueLabel) {
  const hasLibelles = diagnostic.libelleQ1 && diagnostic.libelleQ5;
  const positionnement = hasLibelles
    ? `Positionnement qualitatif (questionnaire guidé) :

Question 1 — Préparation :
"${diagnostic.libelleQ1}" (valeur : ${diagnostic.axeEnseignantSavoir}/100)

Question 2 — Relation :
"${diagnostic.libelleQ2}" (valeur : ${diagnostic.axeEnseignantEleve}/100)

Question 3 — Manipulation directe élève :
"${diagnostic.libelleQ3}" (valeur : ${diagnostic.axeEleveSavoirManipulation}/100)

Question 4 — Impact médiatisé :
"${diagnostic.libelleQ4}" (valeur : ${diagnostic.axeEleveSavoirImpactMediatise}/100)

Question 5 — Intention éthique :
"${diagnostic.libelleQ5}" (valeur : ${diagnostic.valeurEthiqueGlobale}/100)`
    : `Axes d'activation IA positionnés par l'enseignant (mode avancé) :
- Axe Enseignant-Savoir (préparation) : ${diagnostic.axeEnseignantSavoir}/100
- Axe Enseignant-Élève (relation) : ${diagnostic.axeEnseignantEleve}/100
- Axe Élève-Savoir — manipulation directe : ${diagnostic.axeEleveSavoirManipulation}/100
- Axe Élève-Savoir — impact médiatisé : ${diagnostic.axeEleveSavoirImpactMediatise}/100`;

  const p2iaBlock = diagnostic.p2iaIntegration
    ? `
Intégration P2IA déclarée (question bonus primaire) :
"${diagnostic.p2iaIntegration.libelle}" (code: ${diagnostic.p2iaIntegration.code})

Rappel : les P2IA sont des assistants IA institutionnels validés pour le primaire (MATHIA = calcul mental, EXPLIQ = résolution de problèmes, EDUMALIN = compréhension, ORIGAMIA = lecture/fluence, CARDS = mémorisation, yLANG = vocabulaire). Ils ne sont pas mesurés par l'axe manipulation. Tu peux en tenir compte dans tes recommandations : valoriser un usage déjà existant, suggérer un service P2IA pertinent si "pas encore".
`
    : '';

  const userPrompt = `Diagnostic saisi par un enseignant :

- Niveau : ${niveauLabel} (id: ${diagnostic.niveau || 'unknown'})
- Discipline : ${diagnostic.discipline}
- Type d'activité : ${diagnostic.typeActivite}
- Profil d'élève cible : ${diagnostic.profilEleve}
- Objectif pédagogique : ${diagnostic.objectif}

${positionnement}
${p2iaBlock}
Zone éthique calculée : ${zoneEthiqueLabel}

${hasLibelles ? 'IMPORTANT : au moins une de tes 3 recommandations doit citer explicitement le libellé qualitatif d\'une des réponses (ex: "Vous avez indiqué que l\'IA génère une base que vous retravaillez...").\n\n' : ''}Produis 3 recommandations personnalisées au format JSON strict suivant :

{
  "recommandations": [
    { "titre": "<titre court commençant par un verbe d'action, 3-6 mots>", "description": "<explication en 1-2 phrases, tournée vers l'action>", "referenceCadre": "<citation du Cadre juin 2025 si pertinent, null sinon>" },
    { "titre": "<titre court>", "description": "<explication>", "referenceCadre": "<citation ou null>" },
    { "titre": "<titre court>", "description": "<explication>", "referenceCadre": "<citation ou null>" }
  ],
  "pointFort": "<point positif, 1 phrase>",
  "pointVigilance": "<point de vigilance, 1 phrase>",
  "conformiteCadre": {
    "estConforme": <boolean>,
    "observation": "<si non conforme, explication ; null sinon>"
  }
}

Au moins une recommandation doit avoir un champ "referenceCadre" renseigné (non null).

Retourne uniquement le JSON, sans balises, sans commentaires.`;

  return callClaudeProxy(SYSTEM_DIAGNOSTIC, userPrompt, 1024, { niveauId: diagnostic.niveau });
}
