# CORRECTIFS & INTÉGRATION MISTRAL — Triangle Pédagogique Augmenté

## Contexte

L'application est déployée et fonctionnelle. Ce document décrit les correctifs à apporter et l'intégration de l'API Mistral pour la génération de scénarios personnalisés. **Ne casser aucune fonctionnalité existante.**

---

## Correctif 1 — Classes Tailwind « bleu » non appliquées

### Problème

Les encadrés neuro (Point neuro : charge cognitive, Point neuro : effet de génération) utilisent les classes `bg-bleu-50` et `border-bleu-600` dans le composant `AxisDetail`. Or Tailwind CDN ne génère pas automatiquement les classes utilitaires pour des couleurs custom nommées `bleu`. Résultat : les encadrés s'affichent probablement sans fond bleu ni bordure bleue.

### Correction

Dans le composant `AxisDetail`, remplacer :

```jsx
// AVANT (ne fonctionne pas avec Tailwind CDN)
<div class="bg-bleu-50 border-l-4 border-bleu-600 p-5 rounded-r-xl mb-6 shadow-sm">
```

Par :

```jsx
// APRÈS (valeurs arbitraires Tailwind, fonctionne toujours)
<div class="bg-[#EFF6FF] border-l-4 border-[#2563EB] p-5 rounded-r-xl mb-6 shadow-sm">
```

Faire cette même substitution pour TOUTES les occurrences de `bg-bleu-50`, `border-bleu-600` et `text-bleu-900` dans le fichier index.html. Remplacer `text-bleu-900` par `text-[#1e3a5f]`.

---

## Correctif 2 — Meta Open Graph image en URL absolue

### Problème

L'aperçu LinkedIn/Twitter ne fonctionne pas car l'image OG est en chemin relatif.

### Correction

Remplacer :

```html
<meta property="og:image" content="./logo.jpg" />
```

Par :

```html
<meta property="og:image" content="https://triangle.maprofbranchee.fr/logo.jpg" />
<meta property="og:url" content="https://triangle.maprofbranchee.fr/" />
```

---

## Correctif 3 — Intégration API Mistral pour la génération de scénarios

### Problème actuel

Le composant `ScenarioForm` appelle `fetch('/api/generate-scenario', {...})` — un endpoint backend Node.js qui n'est pas déployé sur Vercel. Tout utilisateur qui clique « Générer avec l'IA » obtient une erreur 404.

### Solution

Remplacer l'appel backend par un appel direct côté client à l'API Mistral AI. La clé API est stockée dans localStorage et configurée via une modale dédiée.

### Modifications dans index.html

#### A) Ajouter la gestion de la clé API Mistral

Dans le composant `App`, ajouter un state pour la modale de configuration :

```jsx
const [showMistralConfig, setShowMistralConfig] = useState(false);
```

Ajouter un nouveau composant `MistralConfigModal` (à placer avant le composant `App`) :

```jsx
const MistralConfigModal = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('mistral-api-key') || '';
      setApiKey(stored);
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('mistral-api-key', apiKey.trim());
      setSaved(true);
      setTimeout(() => onClose(), 800);
    }
  };

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-dark/30 backdrop-blur-md" onClick={onClose}></div>
      <div class="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 w-full max-w-md relative p-6 sm:p-8 animate-[slideIn_0.2s_ease-out]">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-serif text-dark">Configuration Mistral AI</h2>
          <button onClick={onClose} class="text-stone-400 hover:text-stone-600 p-2 rounded-full hover:bg-stone-100 transition-colors" aria-label="Fermer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <p class="text-sm text-stone-500 mb-4">
          Pour générer des scénarios avec l'IA, entrez votre clé API Mistral. 
          Obtenez-la sur <a href="https://console.mistral.ai/api-keys/" target="_blank" class="text-teal-600 underline">console.mistral.ai</a>.
          La clé est stockée uniquement dans votre navigateur.
        </p>
        <div class="space-y-4">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Votre clé API Mistral..."
            class="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm"
          />
          <button
            onClick={handleSave}
            disabled={!apiKey.trim()}
            class={`w-full py-3 rounded-xl font-medium transition-all ${
              saved
                ? 'bg-green-500 text-white'
                : apiKey.trim()
                  ? 'bg-teal-600 hover:bg-teal-700 text-white'
                  : 'bg-stone-100 text-stone-400 cursor-not-allowed'
            }`}
          >
            {saved ? '✓ Clé sauvegardée' : 'Sauvegarder'}
          </button>
          <p class="text-[10px] text-stone-400 text-center">
            Aucune donnée n'est envoyée à un serveur tiers hormis l'API Mistral pour la génération.
          </p>
        </div>
      </div>
    </div>
  );
};
```

#### B) Ajouter un bouton de configuration dans le Header

Dans le composant `Header`, à côté du lien MaProfBranchee (ou dans la zone droite du header), ajouter un bouton ⚙️ :

```jsx
<button
  onClick={() => setShowMistralConfig(true)}
  class="p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors"
  aria-label="Configuration IA"
  title="Configurer la clé API Mistral"
>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
  </svg>
</button>
```

Note : il faudra passer `setShowMistralConfig` en prop au composant `Header` depuis `App`.

#### C) Rendre la modale dans App

Dans le return du composant `App`, à côté de `<SourcesModal .../>`, ajouter :

```jsx
<MistralConfigModal isOpen={showMistralConfig} onClose={() => setShowMistralConfig(false)} />
```

#### D) Réécrire la fonction handleGenerate dans ScenarioForm

Remplacer INTÉGRALEMENT la fonction `handleGenerate` existante (lignes 722-751) par :

```jsx
const handleGenerate = async () => {
  setApiError('');
  if (!title) {
    alert("Veuillez entrer un titre de situation d'abord.");
    return;
  }

  const apiKey = localStorage.getItem('mistral-api-key');
  if (!apiKey) {
    setApiError("Clé API Mistral non configurée. Cliquez sur l'icône ⚙️ dans le header pour la configurer.");
    return;
  }

  setIsGenerating(true);
  try {
    const levelLabel = window.LEVELS.find(l => l.id === level)?.label || level;

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        temperature: 0.7,
        max_tokens: 500,
        messages: [
          {
            role: 'system',
            content: `Tu es un expert en pédagogie et en intégration de l'IA en éducation, spécialiste du Triangle Pédagogique de Houssaye (1988) augmenté par l'IA.

Pour chaque situation pédagogique, tu dois déterminer :
1. Le rôle concret de l'IA (ce qu'elle peut faire pour aider l'enseignant — jamais en remplacement)
2. Le rôle humain irremplaçable (ce que seul l'enseignant peut faire)
3. L'activation des 3 axes du triangle (valeur entre 0.0 et 1.0) :
   - ens-sav : axe Enseignant ↔ Savoir (préparation, didactique)
   - ens-elev : axe Enseignant ↔ Élève (relation, accompagnement)
   - elev-sav : axe Élève ↔ Savoir (apprentissage, autonomie)
4. Le pôle en retrait : quel sommet "fait le mort" (concept de Houssaye) et pourquoi

Le contexte est le système éducatif français, niveau : ${levelLabel}.
Cadre réglementaire : IA générative réservée aux enseignants en primaire, autorisée pour les élèves à partir de la 4e uniquement (cadre MEN juin 2025).

Réponds UNIQUEMENT en JSON valide, sans markdown, sans commentaire, dans ce format exact :
{"ia_role": "...", "human_role": "...", "axes": {"ens-sav": 0.7, "ens-elev": 0.5, "elev-sav": 0.8}, "dead_pole": "..."}`
          },
          {
            role: 'user',
            content: `Situation pédagogique : "${title}" — Niveau : ${levelLabel}. Génère l'analyse Triangle Pédagogique Augmenté.`
          }
        ]
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || `Erreur API Mistral (${response.status})`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    // Parser le JSON de la réponse (nettoyer si backticks markdown)
    const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    const parsed = JSON.parse(cleaned);

    if (parsed.ia_role) setIaRole(parsed.ia_role);
    if (parsed.human_role) setHumanRole(parsed.human_role);
    if (parsed.axes) {
      setAxes({
        "ens-sav": Math.max(0, Math.min(1, parsed.axes["ens-sav"] || 0.5)),
        "ens-elev": Math.max(0, Math.min(1, parsed.axes["ens-elev"] || 0.5)),
        "elev-sav": Math.max(0, Math.min(1, parsed.axes["elev-sav"] || 0.5))
      });
    }
    // Stocker le dead_pole pour les scénarios custom
    if (parsed.dead_pole) {
      setDeadPole(parsed.dead_pole);
    }

  } catch (error) {
    console.error("Erreur Mistral:", error);
    if (error.message.includes('401')) {
      setApiError("Clé API Mistral invalide. Vérifiez votre clé dans les réglages (⚙️).");
    } else if (error.message.includes('JSON')) {
      setApiError("L'IA a renvoyé une réponse mal formatée. Réessayez.");
    } else {
      setApiError(`Erreur : ${error.message}`);
    }
  } finally {
    setIsGenerating(false);
  }
};
```

#### E) Gérer le dead_pole dans les scénarios custom

Dans le composant `ScenarioForm`, ajouter un state :

```jsx
const [deadPole, setDeadPole] = useState('');
```

Modifier la fonction `handleSubmit` pour inclure le dead_pole :

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  const newId = `custom-scenario-${Date.now()}`;
  const newScenario = {
    id: newId,
    title: title || 'Nouvelle Situation',
    axes_activation: axes,
    ia_role: iaRole || "Rôle de l'IA à définir",
    human_role: humanRole || "Rôle de l'humain à définir"
  };
  // Stocker le dead_pole du scénario custom dans SCENARIO_DEAD_POLES
  if (deadPole) {
    window.SCENARIO_DEAD_POLES[newId] = deadPole;
  }
  onSave(newScenario);
};
```

#### F) Afficher le dead_pole dans le formulaire (aperçu)

Après la section « Activation des Axes Pédagogiques » dans le formulaire, ajouter un aperçu du pôle en retrait si généré :

```jsx
{deadPole && (
  <div class="p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-start gap-3">
    <span class="text-xl mt-0.5">⚠️</span>
    <div>
      <h4 class="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Pôle en retrait (généré par l'IA)</h4>
      <p class="text-sm text-stone-600 italic">{deadPole}</p>
    </div>
  </div>
)}
```

---

## Correctif 4 — Item « ⏱️ temps gagné » dupliqué dans chaque axe

### Problème

L'item « ⏱️ La capacité à transformer du temps gagné en temps pédagogique utile — observer, écouter, ajuster » est répété dans les `human_only` des 3 axes pour chaque niveau. C'est un principe transversal, pas une compétence spécifique à un axe.

### Correction dans data.js

Retirer l'item « ⏱️ La capacité à transformer du temps gagné... » des tableaux `human_only` des 3 axes (pour les 4 niveaux).

À la place, ajouter une nouvelle constante globale dans data.js :

```javascript
window.TRANSVERSAL_HUMAN = {
  emoji: "⏱️",
  text: "La capacité à transformer du temps gagné en temps pédagogique utile — observer, écouter, ajuster"
};
```

Dans le composant `AxisDetail` du index.html, afficher ce principe transversal dans un encadré séparé, APRÈS les colonnes IA/Humain et AVANT le pôle en retrait :

```jsx
{/* Principe transversal */}
{window.TRANSVERSAL_HUMAN && (
  <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
    <span class="text-xl">{window.TRANSVERSAL_HUMAN.emoji}</span>
    <p class="text-sm text-amber-900 font-medium leading-relaxed">{window.TRANSVERSAL_HUMAN.text}</p>
  </div>
)}
```

---

## Correctif 5 — Libellé du bouton « Générer avec l'IA »

### Correction

Changer le libellé du bouton dans `ScenarioForm` de :

```
Générer avec l'IA
```

À :

```
Générer avec Mistral
```

Et changer l'icône `✨` par `🤖` pour éviter toute confusion avec une feature intégrée.

---

## Récapitulatif des fichiers modifiés

| Fichier | Modifications |
|---|---|
| `index.html` | Correctif classes Tailwind bleu → valeurs arbitraires. Correctif meta OG. Ajout composant `MistralConfigModal`. Réécriture `handleGenerate` avec API Mistral. Ajout state `deadPole` dans `ScenarioForm`. Ajout state `showMistralConfig` dans `App`. Bouton ⚙️ dans Header. Encadré transversal dans `AxisDetail`. |
| `data.js` | Retrait des items « ⏱️ » dupliqués dans `human_only`. Ajout `window.TRANSVERSAL_HUMAN`. |

---

## Informations techniques sur l'API Mistral

- **Endpoint :** `https://api.mistral.ai/v1/chat/completions`
- **Méthode :** POST
- **Auth :** Header `Authorization: Bearer {API_KEY}`
- **Modèle :** `mistral-small-latest` (bon rapport qualité/coût pour de la génération de texte structuré)
- **Format réponse :** `data.choices[0].message.content` (string)
- **Obtenir une clé :** https://console.mistral.ai/api-keys/
- **Tarif :** Mistral Small = ~0.001€ par génération de scénario (négligeable)
- **Pas de CORS bloquant :** l'API Mistral autorise les appels depuis le navigateur (pas besoin de proxy)

---

## Prompt de démarrage pour la mise à jour

```
Lis le document de correctifs ci-dessus dans son intégralité. Applique TOUTES les modifications à l'application Triangle Pédagogique Augmenté existante sans casser aucune fonctionnalité actuelle. Les modifications sont : (1) remplacer toutes les classes Tailwind bg-bleu-50, border-bleu-600 et text-bleu-900 par les valeurs arbitraires bg-[#EFF6FF], border-[#2563EB] et text-[#1e3a5f] dans index.html, (2) corriger la meta og:image en URL absolue https://triangle.maprofbranchee.fr/logo.jpg et ajouter og:url, (3) ajouter un composant MistralConfigModal avec gestion de clé API en localStorage et un bouton ⚙️ dans le Header, (4) réécrire intégralement la fonction handleGenerate du composant ScenarioForm pour appeler l'API Mistral (https://api.mistral.ai/v1/chat/completions, modèle mistral-small-latest) côté client avec le prompt système fourni qui génère ia_role + human_role + axes + dead_pole en JSON, (5) ajouter un state deadPole dans ScenarioForm et stocker le dead_pole généré dans window.SCENARIO_DEAD_POLES pour les scénarios custom, (6) retirer les items ⏱️ dupliqués des tableaux human_only dans data.js et les remplacer par une constante window.TRANSVERSAL_HUMAN affichée dans un encadré séparé dans AxisDetail, (7) changer le libellé du bouton en "Générer avec Mistral". Conserver le design, les couleurs et toutes les données existantes.
```
