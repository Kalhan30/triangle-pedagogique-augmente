import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getNiveau, getZoneEthique, AXES_META } from '../data/niveaux.js';

export async function exporterFichePdf(diagnostic) {
  if (!diagnostic) throw new Error('Aucun diagnostic à exporter');

  const pdf = new jsPDF({ format: 'a4', unit: 'mm', orientation: 'portrait' });
  const niveau = getNiveau(diagnostic.niveau);
  const zone = getZoneEthique(Math.round((diagnostic.axeEnseignantSavoir + diagnostic.axeEnseignantEleve + diagnostic.axeEleveSavoir) / 3));

  pdf.setFillColor(15, 23, 42);
  pdf.rect(0, 0, 210, 24, 'F');
  pdf.setTextColor(20, 184, 166);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Triangle Pédagogique Augmenté', 14, 12);
  pdf.setTextColor(203, 213, 225);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Fiche synthèse — MaProfBranchee', 14, 18);

  pdf.setTextColor(30, 41, 59);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Diagnostic personnel', 14, 36);

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(51, 65, 85);

  const rows = [
    ['Niveau', niveau?.label ?? diagnostic.niveau],
    ['Discipline', diagnostic.discipline],
    ['Type d\'activité', diagnostic.typeActivite],
    ['Profil d\'élève', diagnostic.profilEleve],
    ['Objectif', diagnostic.objectif],
  ];
  let y = 44;
  rows.forEach(([k, v]) => {
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${k} :`, 14, y);
    pdf.setFont('helvetica', 'normal');
    const split = pdf.splitTextToSize(v || '—', 150);
    pdf.text(split, 50, y);
    y += Math.max(6, split.length * 5);
  });

  y += 4;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.text('Positionnement des axes', 14, y);
  y += 6;

  pdf.setFontSize(10);
  const axesData = [
    { meta: AXES_META.enseignantSavoir, value: diagnostic.axeEnseignantSavoir },
    { meta: AXES_META.enseignantEleve, value: diagnostic.axeEnseignantEleve },
    { meta: AXES_META.eleveSavoir, value: diagnostic.axeEleveSavoir },
  ];
  axesData.forEach(({ meta, value }) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(51, 65, 85);
    pdf.text(meta.label, 14, y);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${value}/100`, 180, y, { align: 'right' });

    const [r, g, b] = hexToRgb(meta.color);
    pdf.setFillColor(226, 232, 240);
    pdf.rect(14, y + 2, 166, 3, 'F');
    pdf.setFillColor(r, g, b);
    pdf.rect(14, y + 2, 166 * (value / 100), 3, 'F');
    y += 10;
  });

  const triangleNode = document.getElementById('diagnostic-triangle');
  if (triangleNode) {
    try {
      const canvas = await html2canvas(triangleNode, { backgroundColor: '#0F172A', scale: 2 });
      const img = canvas.toDataURL('image/png');
      const w = 80;
      const h = (canvas.height / canvas.width) * w;
      if (y + h + 4 > 210) { pdf.addPage(); y = 20; }
      pdf.addImage(img, 'PNG', 115, y, w, h);
    } catch (e) {
      console.error('Triangle capture failed:', e);
    }
  }

  y += 4;
  if (y > 210) { pdf.addPage(); y = 20; }
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.setTextColor(51, 65, 85);
  pdf.text(`Zone éthique : ${zone.label}`, 14, y);
  y += 8;

  if (diagnostic.recommandationsFull?.recommandations?.length) {
    pdf.setFontSize(12);
    pdf.text('Recommandations', 14, y);
    y += 6;
    pdf.setFontSize(10);
    diagnostic.recommandationsFull.recommandations.forEach((r, i) => {
      if (y > 270) { pdf.addPage(); y = 20; }
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(15, 118, 110);
      pdf.text(`${i + 1}. ${r.titre}`, 14, y);
      y += 5;
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(71, 85, 105);
      const split = pdf.splitTextToSize(r.description, 180);
      pdf.text(split, 14, y);
      y += split.length * 5 + 3;
    });
  }

  if (diagnostic.recommandationsFull?.referenceCadre) {
    if (y > 250) { pdf.addPage(); y = 20; }
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor(245, 158, 11);
    pdf.text(`Référence : ${diagnostic.recommandationsFull.referenceCadre.principe}`, 14, y);
    y += 5;
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(71, 85, 105);
    const cit = pdf.splitTextToSize(`« ${diagnostic.recommandationsFull.referenceCadre.citation} »`, 180);
    pdf.text(cit, 14, y);
    y += cit.length * 5 + 3;
  }

  pdf.setFontSize(8);
  pdf.setTextColor(148, 163, 184);
  pdf.setFont('helvetica', 'italic');
  const mention = pdf.splitTextToSize("Analyse effectuée en cohérence avec le Cadre d'usage de l'IA en éducation, Ministère de l'Éducation nationale, juin 2025.", 180);
  pdf.text(mention, 14, 280);

  pdf.setFont('helvetica', 'normal');
  const date = new Date().toLocaleDateString('fr-FR');
  pdf.text(`Généré le ${date} — MaProfBranchee`, 14, 290);

  pdf.save(`diagnostic-triangle-${Date.now()}.pdf`);
}

function hexToRgb(hex) {
  const m = hex.replace('#', '').match(/.{1,2}/g) || [];
  return m.map((x) => parseInt(x, 16));
}
