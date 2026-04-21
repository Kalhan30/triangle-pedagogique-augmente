// Détection de prénoms dans une saisie utilisateur.
// Triple filtre : liste noire (mots pédagogiques) + liste blanche (prénoms français courants)
// + analyse contextuelle. Par défaut, ne pas alerter — la liste blanche et les indicateurs
// contextuels sont les seuls déclencheurs. Cette stratégie évite les faux positifs sur les
// termes pédagogiques en majuscule (Réalisation, Histoire, Géographie…).

const LISTE_NOIRE = new Set([
  // Termes pédagogiques avec majuscule courante
  'Activité', 'Activite', 'Analyse', 'Apprentissage', 'Approche', 'Aspect',
  'Attente', 'Attendu',
  'Bilan', 'But',
  'Capacité', 'Capacite', 'Compétence', 'Competence', 'Compréhension', 'Comprehension',
  'Connaissance', 'Consigne', 'Contenu', 'Contexte', 'Créativité', 'Creativite',
  'Critère', 'Critere',
  'Démarche', 'Demarche', 'Développement', 'Developpement',
  'Différenciation', 'Differenciation', 'Dimension', 'Discipline', 'Domaine', 'Durée', 'Duree',
  'Échange', 'Echange', 'Écoute', 'Ecoute', 'Écriture', 'Ecriture', 'Effet', 'Élément', 'Element',
  'Environnement', 'Étape', 'Etape', 'Étude', 'Etude', 'Évaluation', 'Evaluation',
  'Exercice', 'Expérience', 'Experience', 'Explication', 'Exploration', 'Expression',
  'Formation', 'Groupe',
  'Implication', 'Impact', 'Importance', 'Indication', 'Individu', 'Information',
  'Interaction', 'Intérêt', 'Interet', 'Intervention',
  'Jeu', 'Lecture', 'Leçon', 'Lecon', 'Liberté', 'Liberte', 'Lien',
  'Manipulation', 'Méthode', 'Methode', 'Mission', 'Modalité', 'Modalite',
  'Moment', 'Motivation',
  'Niveau', 'Nombre', 'Notion', 'Objectif', 'Observation', 'Obstacle', 'Opération', 'Operation',
  'Organisation', 'Outil', 'Parcours', 'Partage', 'Pédagogie', 'Pedagogie',
  'Période', 'Periode', 'Personne', 'Pilotage', 'Point', 'Pratique', 'Principe', 'Problème', 'Probleme',
  'Procédure', 'Procedure', 'Processus', 'Production', 'Progression', 'Projet',
  'Question', 'Raisonnement', 'Réalisation', 'Realisation',
  'Recherche', 'Référence', 'Reference', 'Réflexion', 'Reflexion', 'Relation',
  'Remédiation', 'Remediation', 'Résolution', 'Resolution', 'Résultat', 'Resultat',
  'Rôle', 'Role', 'Savoir', 'Scénario', 'Scenario', 'Séance', 'Seance',
  'Séquence', 'Sequence', 'Situation', 'Stratégie', 'Strategie', 'Structure',
  'Support', 'Synthèse', 'Synthese', 'Tâche', 'Tache', 'Technique', 'Temps',
  'Trace', 'Transmission', 'Travail', 'Unité', 'Unite', 'Usage', 'Validation',
  'Variable', 'Vérification', 'Verification', 'Vigilance', 'Zone',

  // Disciplines et champs
  'Arts', 'Biologie', 'Chimie', 'Éducation', 'Education', 'EMC', 'EMI', 'EPS',
  'Espagnol', 'Français', 'Francais', 'Géographie', 'Geographie', 'Histoire',
  'Informatique', 'Langue', 'Langues', 'Littérature', 'Litterature',
  'Mathématiques', 'Mathematiques', 'Musique', 'Philosophie', 'Physique',
  'Plastique', 'Science', 'Sciences', 'SVT', 'Technologie', 'Vocabulaire',
  'Anglais', 'Allemand', 'Italien', 'Latin', 'Grec',

  // Débuts de phrase fréquents
  'Après', 'Apres', 'Alors', 'Avant', 'Celle', 'Cela', 'Celui', 'Ces', 'Cet',
  'Cette', 'Ceux', 'Chaque', 'Comment', 'Depuis', 'Dès', 'Des', 'Donc', 'Du',
  'Elle', 'Ensuite', 'Et', 'Il', 'Ils', 'Je', 'La', 'Le', 'Les', 'Lors',
  'Lorsque', 'Mais', 'Mes', 'Mon', 'Ni', 'Nos', 'Notre', 'Nous', 'On', 'Où',
  'Ou', 'Par', 'Parce', 'Pendant', 'Pour', 'Puis', 'Puisque', 'Quand', 'Que',
  'Quel', 'Quelle', 'Quels', 'Quelques', 'Qui', 'Quoi', 'Sa', 'Ses', 'Si',
  'Son', 'Sous', 'Sur', 'Ta', 'Tes', 'Ton', 'Tout', 'Toute', 'Toutes', 'Tous',
  'Très', 'Tres', 'Tu', 'Un', 'Une', 'Vers', 'Voici', 'Voilà', 'Voila',
  'Votre', 'Vous', 'Aux', 'Avec', 'Dans', 'En',

  // Niveaux et cycles scolaires
  'Cycle', 'CE1', 'CE2', 'CM1', 'CM2', 'CP', 'Collège', 'College', 'Lycée', 'Lycee',
  'Maternelle', 'Petite', 'Moyenne', 'Grande', 'Section', 'Primaire',
  'Première', 'Premiere', 'Seconde', 'Terminale', 'Sixième', 'Sixieme',
  'Cinquième', 'Cinquieme', 'Quatrième', 'Quatrieme', 'Troisième', 'Troisieme',

  // Outils, concepts IA, acronymes
  'Assistant', 'ChatGPT', 'Claude', 'Copilot', 'Eduscol', 'Gemini', 'IA',
  'Intelligence', 'MEN', 'Numérique', 'Numerique', 'P2IA', 'MATHIA', 'EXPLIQ',
  'EDUMALIN', 'ORIGAMIA', 'CARDS', 'yLANG', 'TPACK', 'SAMR', 'AIA', 'RGPD',
  'CNIL', 'DRANE', 'ERUN', 'DNB', 'Bac', 'MaProfBranchee',

  // Lieux et noms propres pédagogiques fréquents (éviter d'alerter sur Houssaye, Vygotsky…)
  'Paris', 'France', 'Houssaye', 'Faerber', 'Vygotsky', 'Dehaene', 'Bjork',
  'Perrenoud', 'Meirieu', 'Piaget', 'Bruner',

  // Termes conservés de la version précédente
  'Enseignant', 'Enseignante', 'Élève', 'Eleve', 'Professeur', 'Professeure',
  'Classe', 'Cours', 'Dictée', 'Dictee', 'Contrôle', 'Controle',
]);

// ~80 prénoms français courants. Un mot qui matche ici est très probablement un prénom.
const LISTE_BLANCHE_PRENOMS = new Set([
  'Adam', 'Adrien', 'Agathe', 'Alexandre', 'Alice', 'Alicia', 'Ambre', 'Anaïs',
  'Anna', 'Antoine', 'Arthur', 'Axel', 'Baptiste', 'Camille', 'Capucine',
  'Charlie', 'Charlotte', 'Chloé', 'Chloe', 'Clara', 'Clément', 'Clement',
  'Éléa', 'Elea', 'Éléna', 'Elena', 'Elise', 'Élodie', 'Elodie', 'Emma',
  'Ethan', 'Eva', 'Ève', 'Eve', 'Gabriel', 'Gabrielle', 'Hugo', 'Inès', 'Ines',
  'Jade', 'Jean', 'Jeanne', 'Jules', 'Julia', 'Juliette', 'Justine', 'Kenzo',
  'Léa', 'Lea', 'Leïla', 'Leila', 'Léna', 'Lena', 'Léo', 'Leo', 'Léon', 'Leon',
  'Léonie', 'Leonie', 'Liam', 'Lily', 'Lina', 'Lise', 'Livia', 'Lola', 'Lou',
  'Louis', 'Louise', 'Lucas', 'Lucie', 'Luna', 'Maël', 'Mael', 'Malo', 'Manon',
  'Margaux', 'Maria', 'Marie', 'Marius', 'Martin', 'Mathéo', 'Matheo', 'Mathias',
  'Mathieu', 'Mathilde', 'Matteo', 'Maxime', 'Mia', 'Mila', 'Mohamed', 'Naël',
  'Nael', 'Nathan', 'Nina', 'Noé', 'Noe', 'Noah', 'Nolan', 'Océane', 'Oceane',
  'Olivia', 'Oscar', 'Paul', 'Pauline', 'Raphaël', 'Raphael', 'Rayan', 'Romain',
  'Rose', 'Sacha', 'Sara', 'Sarah', 'Simon', 'Sofia', 'Stella', 'Thomas', 'Tiago',
  'Timéo', 'Timeo', 'Tom', 'Victor', 'Yasmine', 'Zoé', 'Zoe',
]);

// Indicateurs contextuels forts qui précèdent un prénom.
// Matches en fin de segment avant le mot (insensible à la casse).
const INDICATEURS_AVANT = [
  /(?:^|\s)(?:mon|ma|mes|notre|nos)\s+(?:élève|eleve|élèves|eleves)\s*$/i,
  /(?:^|\s)l['’](?:élève|eleve)\s*$/i,
  /(?:^|\s)(?:avec|pour|chez|à|a)\s*$/i,
  /(?:^|\s)(?:j['’]ai\s+travaillé|j['’]ai\s+accompagné|j['’]ai\s+aidé|j['’]ai\s+vu|j['’]ai\s+rencontré)\s+(?:un\s+élève\s+nommé|mon\s+élève)?\s*$/i,
];

// Indicateurs contextuels forts qui suivent un prénom.
const INDICATEURS_APRES = [
  /^\s*(?:a|est|était|etait|a\s+dit|a\s+écrit|a\s+ecrit|travaille|comprend|écrit|ecrit|lit|compte|progresse|a\s+des\s+difficultés)/i,
];

function aIndicateurAvant(contexteAvant) {
  return INDICATEURS_AVANT.some((re) => re.test(contexteAvant));
}

function aIndicateurApres(contexteApres) {
  return INDICATEURS_APRES.some((re) => re.test(contexteApres));
}

function estDebutPhrase(contexteAvant) {
  const t = contexteAvant.trimEnd();
  return t === '' || /[.!?]$/.test(t);
}

export function detectPrenoms(text) {
  if (!text) return [];
  const matches = [];
  const regex = /\b[A-ZÉÀÂÄÇÈÊËÎÏÔÙÛÜ][a-zéàâäçèêëîïôùûüñ’'-]{1,}\b/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    const mot = m[0];
    const idx = m.index;
    const contexteAvant = text.slice(Math.max(0, idx - 80), idx);
    const contexteApres = text.slice(idx + mot.length, Math.min(text.length, idx + mot.length + 60));

    // Règle 1 — Liste noire : jamais un prénom
    if (LISTE_NOIRE.has(mot)) continue;

    // Règle 2 — Liste blanche prime : si c'est un prénom courant, on alerte toujours
    if (LISTE_BLANCHE_PRENOMS.has(mot)) {
      matches.push(mot);
      continue;
    }

    // Règle 3 — Début de phrase : mot inconnu en tête de phrase → pas d'alerte
    if (estDebutPhrase(contexteAvant)) continue;

    // Règle 4 — Indicateur contextuel fort (avant OU après) : on alerte
    if (aIndicateurAvant(contexteAvant) || aIndicateurApres(contexteApres)) {
      matches.push(mot);
      continue;
    }

    // Par défaut : ne pas alerter sur un mot en majuscule inconnu
  }
  return [...new Set(matches)];
}
