const MOTS_PEDAGOGIQUES = new Set([
  'Enseignant', 'Enseignante', 'Élève', 'Eleve', 'Professeur', 'Professeure',
  'Classe', 'Cours', 'Séance', 'Seance', 'Leçon', 'Lecon',
  'Dictée', 'Dictee', 'Contrôle', 'Controle', 'Évaluation', 'Evaluation',
  'Mathématiques', 'Mathematiques', 'Français', 'Francais', 'Histoire', 'Géographie',
  'SVT', 'Physique', 'Chimie', 'EPS', 'Arts', 'Musique', 'Anglais', 'Espagnol',
  'Primaire', 'Collège', 'College', 'Lycée', 'Lycee', 'CE1', 'CE2', 'CM1', 'CM2',
  'CP', 'GS', 'MS', 'PS', 'IA', 'Claude', 'MaProfBranchee',
  'MEN', 'DRANE', 'ERUN', 'DNB', 'Bac', 'Paris', 'France', 'Cycle',
]);

export function detectPrenoms(text) {
  if (!text) return [];
  const matches = text.match(/\b[A-ZÉÀÂÄÇÈÊËÎÏÔÙÛÜ][a-zéàâäçèêëîïôùûüñ]{2,}\b/g) || [];
  const candidates = matches.filter((word, i, arr) => {
    if (MOTS_PEDAGOGIQUES.has(word)) return false;
    const idx = text.indexOf(word);
    if (idx === 0) return false;
    const before = text.slice(0, idx).trimEnd();
    if (/[.!?]$/.test(before) || before === '') return false;
    return true;
  });
  return [...new Set(candidates)];
}
