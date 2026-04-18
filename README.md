# Triangle Pédagogique Augmenté — V2

Application React + Vite + Tailwind. Dark mode par défaut, palette MaProfBranchee (teal/violet/ambre), proxy serverless Claude Anthropic.

## Stack
- React 18 + Vite
- Tailwind CSS 3 (config `darkMode: class`, classe `.dark` forcée sur `<html>`)
- lucide-react (icônes outline)
- jsPDF + html2canvas (export PDF A4)
- React Context (état applicatif) + localStorage (diagnostic actif)
- Fonction serverless Vercel `/api/claude` (proxy Anthropic, modèle `claude-sonnet-4-5`)

## Démarrage local

```bash
npm install

# 1. Fichier d'environnement
cp .env.example .env
# éditer .env et ajouter la vraie clé ANTHROPIC_API_KEY

# 2a. Dev front uniquement (mock API bloqué)
npm run dev
# ouvre http://localhost:5173

# 2b. Dev complet avec /api/claude
npm i -g vercel
vercel dev
# ouvre http://localhost:3000
```

> **Note :** `npm run dev` ne lance QUE Vite (sans les fonctions `/api`). Pour tester l'appel à Claude, lancer `vercel dev` qui émule les serverless functions.

## Déploiement Vercel

1. Pousser le dossier sur un repo GitHub
2. Sur le dashboard Vercel, importer le repo et choisir `triangle-v2/` comme dossier racine
3. Dans **Settings → Environment Variables**, ajouter :
   ```
   ANTHROPIC_API_KEY = sk-ant-api03-...
   ```
   Scope : **Production** + **Preview** + **Development**
4. Redeploy

## Sécurité de la clé API

- La clé `ANTHROPIC_API_KEY` n'est JAMAIS exposée côté client
- Elle vit uniquement dans `process.env.ANTHROPIC_API_KEY` de la fonction serverless
- Le client appelle `/api/claude`, qui appelle Anthropic côté serveur
- Vérification : ouvrir les DevTools → Network → aucune requête vers `api.anthropic.com` ne doit apparaître, ni aucune occurrence de la clé dans le bundle

## Structure

```
triangle-v2/
├── api/
│   └── claude.js                    # Proxy serverless Anthropic
├── src/
│   ├── main.jsx                     # Entry Vite
│   ├── App.jsx                      # Routing par état (Accueil ↔ Onglets)
│   ├── index.css                    # Tailwind + focus global
│   ├── contexts/AppContext.jsx      # État global (niveau, onglet, diagnostic, curseur)
│   ├── data/
│   │   ├── niveaux.js               # 4 niveaux + axes + zones éthiques
│   │   ├── axesDetails.js           # Contenu IA peut / Humain / Exemple (4×3)
│   │   ├── scenarios.js             # 16 scénarios (4 par niveau)
│   │   └── faq.js                   # 8 Q/R
│   ├── components/
│   │   ├── Accueil.jsx              # Écran 1 (4 cartes niveau)
│   │   ├── Header.jsx               # En-tête avec sélecteur niveau + Export
│   │   ├── Tabs.jsx                 # 4 onglets
│   │   ├── Triangle.jsx             # SVG interactif (3 sommets, 3 axes, halo)
│   │   ├── FloatingFAQ.jsx          # Bouton flottant + modale
│   │   └── tabs/
│   │       ├── Explorer.jsx         # Sommets et axes cliquables
│   │       ├── Situations.jsx       # Générateur Claude + 4 scénarios
│   │       ├── Ethique.jsx          # Curseur + halo IA
│   │       └── MonDiagnostic.jsx    # Formulaire + 3 sliders + reco IA
│   ├── services/claudeService.js    # Appels /api/claude avec prompts V2
│   └── utils/
│       ├── detectPrenoms.js         # Détection pattern prénom d'élève
│       └── exportPdf.js             # jsPDF + html2canvas fiche A4
├── index.html                       # Entry HTML Vite
├── tailwind.config.js               # Palette Design System V2
├── vite.config.js
├── vercel.json
└── .env.example
```

## Accessibilité

- Classe `.dark` forcée + contraste WCAG AA testé sur slate-900/slate-50
- `aria-label` sur tous les éléments interactifs
- `prefers-reduced-motion` respecté
- Focus ring visible cohérent

## Conformité PRD V2

Liste des critères d'acceptation et leur statut :

- [x] Chargement < 2s (bundle Vite optimisé)
- [x] 4 niveaux fonctionnels avec configuration complète
- [x] Triangle SVG interactif (sommets + axes + halo)
- [x] Curseur éthique temps réel (halo modulé en opacité)
- [x] Générateur Claude avec fallback scénario
- [x] Clé API jamais exposée côté client
- [x] Validation 5 champs formulaire diagnostic
- [x] Export PDF A4 avec triangle et recommandations
- [x] FAQ flottante accessible tous onglets (8 Q/R)
- [x] Dark mode intégral
- [x] Aucune donnée élève identifiante stockée (détection prénom + anonymisation par Claude)
- [x] Responsive 375px → 1920px (mobile-first Tailwind)
```
