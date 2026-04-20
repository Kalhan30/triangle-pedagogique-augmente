import programmesData from '../data/programmes.json';

function normaliser(str) {
  return (str || '')
    .toLowerCase()
    .trim()
    .replace(/[àâ]/g, 'a')
    .replace(/[éèêë]/g, 'e')
    .replace(/[îï]/g, 'i')
    .replace(/[ôö]/g, 'o')
    .replace(/[ùûü]/g, 'u')
    .replace(/ç/g, 'c');
}

export function trouverExtraitProgramme(niveauApp, disciplineSaisie) {
  if (!niveauApp || !disciplineSaisie) return null;
  const disciplineNorm = normaliser(disciplineSaisie);
  const candidats = (programmesData.extraits || []).filter((fiche) => {
    if (!fiche.niveaux.includes(niveauApp)) return false;
    if (fiche.statut !== 'integre' || !fiche.extrait) return false;
    return fiche.motsClesDiscipline.some((mc) => disciplineNorm.includes(normaliser(mc)));
  });
  return candidats.length > 0 ? candidats[0] : null;
}
