# Prompt pour Google Antigravity — Triangle Pédagogique Augmenté

## Instructions

Voici le code complet d'une application React 18 appelée **Triangle Pédagogique Augmenté**.

Déploie cette application en respectant les contraintes suivantes :

### Stack technique
- **React 18** avec hooks (useState, useEffect, useCallback, useRef)
- **Tailwind CSS** pour les classes utilitaires si disponible, sinon inline styles (le code utilise déjà des inline styles, il est autonome)
- **SVG natif** pour le triangle interactif (pas de librairie graphique)
- **Google Fonts** : DM Sans + Instrument Serif (import via CSS @import)

### Contraintes
- **Zéro backend, zéro API, zéro base de données, zéro localStorage**
- Toutes les données sont en dur dans le fichier (constantes VERTICES, AXES, SCENARIOS, ETHICS_ZONES, REFERENCES, OVERCOMPENSATION_LOOP)
- L'app doit fonctionner en standalone ET en iframe WordPress
- Responsive mobile-first : 375px → 1440px
- Accessibilité : tous les éléments interactifs ont des aria-label et sont navigables au clavier

### Ce que l'app fait
1. **Onboarding** : une overlay d'accueil guide l'utilisateur dès l'arrivée (3 actions clés)
2. **Mode Explorer** : cliquer sur un axe ou un sommet du triangle SVG ouvre un panneau détail avec deux colonnes « Ce que l'IA peut faire » / « Irremplaçable humain » + exemple terrain
3. **Mode Situations** : 6 scénarios pédagogiques reconfigurables qui modifient visuellement le triangle (opacité, épaisseur des axes selon les poids)
4. **Mode Éthique** : un slider 0-100 transforme progressivement le triangle, avec 4 zones (minimale / partenaire / dominante / zone rouge) et une alerte « boucle de surcompensation » à partir de 60%
5. **Panneau latéral** avec bouton de fermeture bien visible (✕ avec bordure et ombre)
6. **Modale Sources** avec 6 références académiques
7. **Guide contextuel** sous le triangle (toujours visible sans scroll)

### Palette de couleurs
- Teal : #0D9488 (Enseignant, recommandé)
- Violet : #7C3AED (IA, axes)
- Bleu : #2563EB (Élève)
- Corail : #EA580C (Savoir, attention)
- Rouge : #dc2626 (zone rouge)
- Vert : #16a34a (humain irremplaçable)
- Fond : #FAFAF9

### Fichier unique
Le code est livré en un seul fichier JSX avec export default. Il contient toutes les données et tous les composants. Aucune dépendance externe autre que React et les Google Fonts.

## Améliorations UX intégrées (v2)
Par rapport à la v1, ce code intègre les corrections suivantes :
- ✅ Onboarding d'accueil pour guider le premier clic
- ✅ Curseur éthique avec label « ← Déplacez-moi → » pour inviter à l'interaction
- ✅ Guide contextuel sous le triangle (toujours visible, résout le scroll)
- ✅ Bouton de fermeture du panneau latéral bien visible (bordure + ombre + hover)
- ✅ Colonnes « IA » et « Humain » avec même poids visuel (même border-left, même padding)
- ✅ Navigation simplifiée en 3 onglets (Explorer / Situations / Éthique) sans surcharge
- ✅ Triangle plus grand (viewBox 700×510, max-width 600px)
