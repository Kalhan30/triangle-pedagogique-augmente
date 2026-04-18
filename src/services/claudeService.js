const SYSTEM_ANALYSE = `Tu es un expert en didactique, en neuroéducation et en usage raisonné de l'IA en éducation. Tu t'appuies sur le cadre du Triangle Pédagogique de Jean Houssaye (1988) augmenté par l'intégration de l'IA générative, et sur les 4 piliers de l'apprentissage de Stanislas Dehaene (attention, engagement actif, feedback, consolidation).

Ton rôle est d'analyser une situation pédagogique proposée par un enseignant et de produire une analyse structurée qui positionne l'IA sur les 3 axes du triangle, identifie le rôle de l'IA et le rôle irremplaçable de l'humain.

Règles impératives :
- Tu réponds EXCLUSIVEMENT en JSON valide, sans texte avant ni après.
- Tu ne reformules aucune donnée identifiante d'élève (nom, prénom). Si l'utilisateur en saisit, tu les remplaces par "un élève" ou "l'élève".
- Tu restes factuel et pédagogique, sans jugement moral sur les choix de l'enseignant.
- Tu évites le jargon didactique obscur. Tes formulations sont claires pour un enseignant de terrain.
- Tu ne recommandes jamais d'exposer des données élèves à une IA générative externe.`;

const SYSTEM_DIAGNOSTIC = `Tu es un expert en didactique, en neuroéducation et en usage raisonné de l'IA en éducation. Tu t'appuies sur le cadre du Triangle Pédagogique Augmenté de Houssaye (1988) et sur le Cadre d'usage de l'IA en éducation publié par le Ministère français en juin 2025.

Ton rôle est de fournir à un enseignant 3 recommandations concrètes, opérationnelles et bienveillantes, en regard du diagnostic qu'il vient de saisir sur sa propre pratique.

Règles impératives :
- Tu réponds EXCLUSIVEMENT en JSON valide, sans texte avant ni après.
- Tu ne juges jamais le positionnement de l'enseignant comme "bon" ou "mauvais". Tu proposes des pistes d'ajustement.
- Tu formules chaque recommandation en une phrase courte commençant par un verbe d'action (Identifier, Ajuster, Vérifier, Réserver, Consolider, Déléguer, etc.).
- Tu rappelles discrètement la protection des données élèves si le diagnostic concerne un usage IA direct avec élèves.
- Tu n'utilises ni jargon excessif ni langage moralisateur. Tu es collègue, pas inspecteur.`;

async function callClaudeProxy(systemPrompt, userPrompt, maxTokens = 1024) {
  const response = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ systemPrompt, userPrompt, maxTokens }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${response.status}`);
  }

  return await response.json();
}

export async function analyserSituation(situation, niveauLabel) {
  const userPrompt = `Situation pédagogique à analyser :
"${situation}"

Niveau scolaire : ${niveauLabel}

Analyse cette situation selon le cadre du Triangle Pédagogique Augmenté et retourne une analyse au format JSON strict suivant :

{
  "axes": {
    "enseignantSavoir": <nombre entre 0 et 100>,
    "enseignantEleve": <nombre entre 0 et 100>,
    "eleveSavoir": <nombre entre 0 et 100>
  },
  "roleIA": "<description en 1-2 phrases du rôle que l'IA peut jouer dans cette situation>",
  "roleHumain": "<description en 1-2 phrases du rôle irremplaçable de l'enseignant>",
  "pointsAttention": [
    "<point de vigilance pédagogique n°1, 1 phrase>",
    "<point de vigilance pédagogique n°2, 1 phrase>"
  ],
  "titreSyntheque": "<titre court, 3-6 mots, qui résume la situation analysée>"
}

Rappel des axes :
- enseignantSavoir : degré d'intervention de l'IA côté préparation et production de supports (0 = IA absente, 100 = IA produit tout)
- enseignantEleve : degré d'intervention de l'IA côté relation et médiation (0 = IA absente, 100 = IA remplace le lien pédagogique)
- eleveSavoir : degré d'intervention de l'IA côté accès au savoir pour l'élève (0 = IA absente, 100 = IA remplace l'effort cognitif)

Retourne uniquement le JSON, sans balises, sans commentaires.`;

  return callClaudeProxy(SYSTEM_ANALYSE, userPrompt, 1024);
}

export async function genererRecommandations(diagnostic, niveauLabel, zoneEthiqueLabel) {
  const userPrompt = `Diagnostic saisi par un enseignant :

- Niveau : ${niveauLabel}
- Discipline : ${diagnostic.discipline}
- Type d'activité : ${diagnostic.typeActivite}
- Profil d'élève cible : ${diagnostic.profilEleve}
- Objectif pédagogique : ${diagnostic.objectif}

Axes d'activation IA positionnés par l'enseignant :
- Axe Enseignant-Savoir : ${diagnostic.axeEnseignantSavoir}/100
- Axe Enseignant-Élève : ${diagnostic.axeEnseignantEleve}/100
- Axe Élève-Savoir : ${diagnostic.axeEleveSavoir}/100

Zone éthique calculée : ${zoneEthiqueLabel}

Produis 3 recommandations personnalisées au format JSON strict suivant :

{
  "recommandations": [
    { "titre": "<titre court commençant par un verbe d'action, 3-6 mots>", "description": "<explication en 1-2 phrases, tournée vers l'action>" },
    { "titre": "<titre court commençant par un verbe d'action>", "description": "<explication en 1-2 phrases>" },
    { "titre": "<titre court commençant par un verbe d'action>", "description": "<explication en 1-2 phrases>" }
  ],
  "pointFort": "<point positif que tu identifies dans le diagnostic, 1 phrase>",
  "pointVigilance": "<point de vigilance principal à surveiller, 1 phrase>"
}

Retourne uniquement le JSON, sans balises, sans commentaires.`;

  return callClaudeProxy(SYSTEM_DIAGNOSTIC, userPrompt, 1024);
}
