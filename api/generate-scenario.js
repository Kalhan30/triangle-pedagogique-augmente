const { Mistral } = require('@mistralai/mistralai');

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, level } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Le champ title est requis.' });
  }

  if (!process.env.MISTRAL_API_KEY || process.env.MISTRAL_API_KEY === 'votre_cle_api_mistral_ici') {
    return res.status(500).json({
      error: 'Clé API Mistral manquante',
      message: 'Veuillez configurer MISTRAL_API_KEY dans les variables d\'environnement Vercel.'
    });
  }

  const mistral = new Mistral({
    apiKey: process.env.MISTRAL_API_KEY,
  });

  const levelContexts = {
    'primaire': "Contexte : niveau Primaire (Cycles 1-3). L'IA générative est réservée EXCLUSIVEMENT aux enseignants. Les élèves ne manipulent pas d'IA. L'enseignant utilise l'IA pour préparer et différencier.",
    'college-inf': "Contexte : niveau Collège 6e-5e. L'IA générative est INTERDITE aux élèves avant la 4e (cadre MEN 2025). L'enseignant utilise l'IA pour préparer, différencier et suivre. Les élèves sont sensibilisés sans manipulation directe.",
    'college-sup': "Contexte : niveau Collège 4e-3e. L'IA générative est AUTORISÉE pour les élèves à partir de la 4e, strictement encadrée par l'enseignant. Formation obligatoire à l'IA en 4e. L'élève peut interagir avec l'IA sous supervision.",
    'lycee-sup': "Contexte : niveau Lycée & Supérieur. L'IA peut être utilisée de manière autonome par les élèves dans un cadre défini par l'enseignant. Focus sur l'esprit critique, l'éthique et l'appropriation personnelle."
  };
  const levelContext = levelContexts[level] || levelContexts['primaire'];

  try {
    const prompt = `
Tu es un expert en pédagogie et en intégration de l'IA en éducation.
${levelContext}

L'utilisateur a donné le titre suivant pour une situation pédagogique : "${title}"

Génère une réponse au format JSON strict avec la structure suivante :
{
  "ia_role": "Description courte de ce que fait l'IA dans cette situation (environ 1-2 phrases). Respecte le cadre réglementaire du niveau.",
  "human_role": "Description courte de ce que fait l'enseignant, son rôle irremplaçable (environ 1-2 phrases).",
  "axes": {
    "ens-sav": 0.5,
    "ens-elev": 0.5,
    "elev-sav": 0.5
  }
}

Ne fournis que l'objet JSON valide, sans aucun markdown ni texte autour.
`;

    const chatCompletion = await mistral.chat.complete({
      messages: [{ role: 'user', content: prompt }],
      model: 'mistral-small-latest',
      responseFormat: { type: 'json_object' }
    });

    const content = chatCompletion.choices[0].message.content;
    const result = JSON.parse(content);

    res.json(result);

  } catch (error) {
    console.error("Erreur avec l'API Mistral:", error);
    res.status(500).json({
      error: 'Erreur lors de la génération avec Mistral',
      message: error.message
    });
  }
};
