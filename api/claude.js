const MANIPULATION_LOCKED = new Set(['primaire', 'college_6_5']);
const MANIPULATION_PLAFOND_CAP = { college_4_3: 65 };

function enforceCadreConformity(parsed, niveauId) {
  if (!parsed || !niveauId || !parsed.axes) return parsed;
  if (MANIPULATION_LOCKED.has(niveauId) && parsed.axes.eleveSavoirManipulation > 0) {
    console.warn(`[Cadre] Forcing eleveSavoirManipulation=0 (niveau=${niveauId})`);
    parsed.axes.eleveSavoirManipulation = 0;
    parsed.conformiteCadre = {
      estConforme: false,
      observation: "Valeur forcée à 0 par validation serveur (manipulation directe interdite avant la 4e).",
    };
  }
  const cap = MANIPULATION_PLAFOND_CAP[niveauId];
  if (cap !== undefined && parsed.axes.eleveSavoirManipulation > cap) {
    console.warn(`[Cadre] Capping eleveSavoirManipulation to ${cap} (niveau=${niveauId})`);
    parsed.axes.eleveSavoirManipulation = cap;
    parsed.conformiteCadre = {
      estConforme: false,
      observation: `Valeur plafonnée à ${cap} par validation serveur (usage autonome non autorisé en 4e-3e).`,
    };
  }
  return parsed;
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { systemPrompt, userPrompt, maxTokens = 1024, niveauId } = req.body || {};

  if (!systemPrompt || !userPrompt) {
    return res.status(400).json({ error: 'Missing prompts' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY missing');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: maxTokens,
        temperature: 0.4,
        system: [
          { type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } },
        ],
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      return res.status(response.status).json({ error: 'API call failed' });
    }

    const data = await response.json();
    const content = data.content?.[0]?.text ?? '';

    const u = data.usage || {};
    console.log(`[cache] write=${u.cache_creation_input_tokens || 0} read=${u.cache_read_input_tokens || 0} uncached=${u.input_tokens || 0} out=${u.output_tokens || 0}`);

    let parsed;
    try {
      const cleaned = content.replace(/```json\s*|\s*```/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (parseError) {
      console.error('JSON parse error:', parseError.message, 'Content:', content);
      return res.status(502).json({ error: 'Invalid JSON response' });
    }

    parsed = enforceCadreConformity(parsed, niveauId);

    return res.status(200).json(parsed);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
