import jsPDF from 'jspdf';
import { getNiveau, getZoneEthique, AXES_META } from '../data/niveaux.js';
import { CADRE_JUIN_2025, CADRE_URL, CADRE_SOURCE_LABEL, REFERENCES_BO_PAR_NIVEAU, PROGRAMMES_EDUSCOL_URL, NIVEAU_LIBELLE } from '../data/cadreJuin2025.js';
import { trouverExtraitProgramme } from './trouverExtraitProgramme.js';
import mentionCfg from '../config/mention-recherche-action.json';

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN_L = 15;
const MARGIN_R = 15;
const MARGIN_T = 20;
const MARGIN_B = 25;
const CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R;
const USABLE_BOTTOM = PAGE_H - MARGIN_B;

const PALETTES = {
  light: {
    bgPage: [255, 255, 255],
    bgEncadre: [248, 250, 252],
    textPrimary: [15, 23, 42],
    textSecondary: [71, 85, 105],
    textMuted: [148, 163, 184],
    accentTeal: [15, 118, 110],
    accentTealLight: [230, 242, 240],
    accentVioletLight: [240, 234, 254],
    accentViolet: [124, 58, 237],
    accentAmber: [217, 119, 6],
    accentAmberLight: [254, 243, 230],
    accentEleve: [217, 119, 6],
    accentSavoir: [124, 58, 237],
    accentEns: [15, 118, 110],
    border: [226, 232, 240],
    linkColor: [15, 118, 110],
    vertexFill: [255, 255, 255],
    pillFill: [255, 255, 255],
  },
  dark: {
    bgPage: [11, 18, 32],
    bgEncadre: [26, 35, 50],
    textPrimary: [241, 245, 249],
    textSecondary: [203, 213, 225],
    textMuted: [148, 163, 184],
    accentTeal: [45, 212, 191],
    accentTealLight: [17, 64, 58],
    accentVioletLight: [44, 19, 89],
    accentViolet: [167, 139, 250],
    accentAmber: [251, 191, 36],
    accentAmberLight: [68, 44, 11],
    accentEleve: [251, 191, 36],
    accentSavoir: [167, 139, 250],
    accentEns: [45, 212, 191],
    border: [51, 65, 85],
    linkColor: [45, 212, 191],
    vertexFill: [26, 35, 50],
    pillFill: [26, 35, 50],
  },
};

function setFill(pdf, rgb) { pdf.setFillColor(rgb[0], rgb[1], rgb[2]); }
function setDraw(pdf, rgb) { pdf.setDrawColor(rgb[0], rgb[1], rgb[2]); }
function setText(pdf, rgb) { pdf.setTextColor(rgb[0], rgb[1], rgb[2]); }

function ensureSpace(ctx, needed) {
  if (ctx.y + needed > USABLE_BOTTOM) addPage(ctx);
}

function addPage(ctx) {
  drawFooter(ctx);
  ctx.pdf.addPage();
  ctx.pageIndex += 1;
  ctx.y = MARGIN_T;
  paintBackground(ctx);
}

function paintBackground(ctx) {
  setFill(ctx.pdf, ctx.palette.bgPage);
  ctx.pdf.rect(0, 0, PAGE_W, PAGE_H, 'F');
}

function drawFooter(ctx) {
  const y = PAGE_H - 12;
  setText(ctx.pdf, ctx.palette.textMuted);
  ctx.pdf.setFont('helvetica', 'normal');
  ctx.pdf.setFontSize(8);
  ctx.pdf.text(`${mentionCfg.marque} — Triangle Pédagogique Augmenté — Artefact de recherche-action`, PAGE_W / 2, y, { align: 'center' });
  ctx.pdf.text(`Page ${ctx.pageIndex} / ${ctx.totalPages || '•'}`, PAGE_W / 2, y + 4, { align: 'center' });
}

function drawSectionHeading(ctx, label, color) {
  ensureSpace(ctx, 10);
  setText(ctx.pdf, color);
  ctx.pdf.setFont('helvetica', 'bold');
  ctx.pdf.setFontSize(14);
  ctx.pdf.text(label, MARGIN_L, ctx.y);
  ctx.y += 7;
}

function drawHeader(ctx, diagnostic) {
  const p = ctx.palette;
  setFill(ctx.pdf, p.accentTeal);
  ctx.pdf.rect(0, 0, PAGE_W, 2, 'F');
  setText(ctx.pdf, p.accentTeal);
  ctx.pdf.setFont('helvetica', 'bold');
  ctx.pdf.setFontSize(20);
  ctx.pdf.text('Mon Diagnostic Pédagogique', MARGIN_L, MARGIN_T + 2);
  setText(ctx.pdf, p.textMuted);
  ctx.pdf.setFont('helvetica', 'normal');
  ctx.pdf.setFontSize(10);
  const date = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  ctx.pdf.text(`Document généré le ${date} — ${mentionCfg.auteure}`, MARGIN_L, MARGIN_T + 8);
  ctx.y = MARGIN_T + 16;
}

function drawContext(ctx, diagnostic) {
  const p = ctx.palette;
  const niveau = getNiveau(diagnostic.niveau);
  drawSectionHeading(ctx, 'Contexte de la séance', p.textPrimary);
  ensureSpace(ctx, 42);
  const boxH = 38;
  setFill(ctx.pdf, p.bgEncadre);
  setDraw(ctx.pdf, p.border);
  ctx.pdf.roundedRect(MARGIN_L, ctx.y, CONTENT_W, boxH, 2, 2, 'FD');

  const rows = [
    ['Niveau', niveau?.label ?? diagnostic.niveau, 'Discipline', diagnostic.discipline || '—'],
    ["Type d'activité", diagnostic.typeActivite || '—', 'Objectif pédagogique', diagnostic.objectif || '—'],
  ];
  const colW = CONTENT_W / 2;
  const labelX1 = MARGIN_L + 4;
  const labelX2 = MARGIN_L + colW + 4;
  let ly = ctx.y + 8;
  rows.forEach(([k1, v1, k2, v2]) => {
    ctx.pdf.setFontSize(8);
    ctx.pdf.setFont('helvetica', 'bold');
    setText(ctx.pdf, p.textMuted);
    ctx.pdf.text(k1.toUpperCase(), labelX1, ly);
    ctx.pdf.text(k2.toUpperCase(), labelX2, ly);
    ctx.pdf.setFont('helvetica', 'normal');
    ctx.pdf.setFontSize(10);
    setText(ctx.pdf, p.textPrimary);
    const v1Lines = ctx.pdf.splitTextToSize(v1, colW - 8);
    const v2Lines = ctx.pdf.splitTextToSize(v2, colW - 8);
    ctx.pdf.text(v1Lines.slice(0, 2), labelX1, ly + 4);
    ctx.pdf.text(v2Lines.slice(0, 2), labelX2, ly + 4);
    ly += 16;
  });
  ctx.y += boxH + 8;
}

function drawTriangle(ctx, diagnostic) {
  const p = ctx.palette;
  drawSectionHeading(ctx, 'Triangle diagnostic', p.textPrimary);
  const boxH = 100;
  ensureSpace(ctx, boxH + 12);

  const cx = PAGE_W / 2;
  const topY = ctx.y + 8;
  const bottomY = topY + 68;
  const halfBase = 45;
  const enseignant = { x: cx, y: topY };
  const eleve = { x: cx - halfBase, y: bottomY };
  const savoir = { x: cx + halfBase, y: bottomY };

  const axes = [
    { id: 'enseignantSavoir', a: enseignant, b: savoir, color: p.accentEns, value: diagnostic.axeEnseignantSavoir },
    { id: 'enseignantEleve', a: enseignant, b: eleve, color: p.accentEleve, value: diagnostic.axeEnseignantEleve },
    { id: 'eleveSavoir', a: eleve, b: savoir, color: p.accentSavoir, value: diagnostic.axeEleveSavoirVisualise ?? diagnostic.axeEleveSavoir ?? 0 },
  ];

  ctx.pdf.setLineWidth(0.8);
  axes.forEach(({ a, b, color }) => {
    setDraw(ctx.pdf, color);
    ctx.pdf.line(a.x, a.y, b.x, b.y);
  });

  const vertices = [
    { pt: enseignant, label: 'Enseignant', color: p.accentEns },
    { pt: eleve, label: 'Élève', color: p.accentEleve },
    { pt: savoir, label: 'Savoir', color: p.accentSavoir },
  ];
  vertices.forEach(({ pt, label, color }) => {
    setFill(ctx.pdf, p.vertexFill);
    setDraw(ctx.pdf, color);
    ctx.pdf.setLineWidth(0.7);
    ctx.pdf.circle(pt.x, pt.y, 6, 'FD');
    setText(ctx.pdf, p.textPrimary);
    ctx.pdf.setFont('helvetica', 'bold');
    ctx.pdf.setFontSize(9);
    const tY = pt === enseignant ? pt.y - 9 : pt.y + 12;
    ctx.pdf.text(label, pt.x, tY, { align: 'center' });
  });

  axes.forEach(({ a, b, color, value }) => {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    setFill(ctx.pdf, p.pillFill);
    setDraw(ctx.pdf, color);
    ctx.pdf.setLineWidth(0.3);
    ctx.pdf.roundedRect(mx - 9, my - 3.5, 18, 7, 2, 2, 'FD');
    setText(ctx.pdf, color);
    ctx.pdf.setFont('helvetica', 'bold');
    ctx.pdf.setFontSize(8);
    ctx.pdf.text(`${value}`, mx, my + 1.5, { align: 'center' });
  });

  const axeMean = Math.round((diagnostic.axeEnseignantSavoir + diagnostic.axeEnseignantEleve + (diagnostic.axeEleveSavoirVisualise ?? diagnostic.axeEleveSavoir ?? 0)) / 3);
  const zone = getZoneEthique(axeMean);
  const badgeY = bottomY + 22;
  const label = `Zone éthique estimée : ${zone.label}${zone.badge ? ' — ' + zone.badge : ''}`;
  ctx.pdf.setFont('helvetica', 'bold');
  ctx.pdf.setFontSize(10);
  const tw = ctx.pdf.getTextWidth(label);
  setFill(ctx.pdf, [zone.color.startsWith('#') ? parseInt(zone.color.slice(1, 3), 16) : 15, zone.color.startsWith('#') ? parseInt(zone.color.slice(3, 5), 16) : 118, zone.color.startsWith('#') ? parseInt(zone.color.slice(5, 7), 16) : 110]);
  ctx.pdf.roundedRect(cx - tw / 2 - 4, badgeY - 4, tw + 8, 7, 3, 3, 'F');
  setText(ctx.pdf, [255, 255, 255]);
  ctx.pdf.text(label, cx, badgeY + 1, { align: 'center' });

  ctx.y = bottomY + 32;
}

function drawRecommandations(ctx, diagnostic) {
  const p = ctx.palette;
  const reco = diagnostic.recommandationsFull;
  if (!reco) return;
  drawSectionHeading(ctx, 'Recommandations', p.accentTeal);

  (reco.recommandations || []).forEach((r, i) => {
    ctx.pdf.setFont('helvetica', 'bold');
    ctx.pdf.setFontSize(11);
    const titleLines = ctx.pdf.splitTextToSize(`${i + 1}. ${r.titre}`, CONTENT_W);
    ctx.pdf.setFont('helvetica', 'normal');
    ctx.pdf.setFontSize(10);
    const bodyLines = ctx.pdf.splitTextToSize(r.description || '', CONTENT_W);
    const refLines = r.referenceCadre ? ctx.pdf.splitTextToSize(`→ « ${r.referenceCadre} »`, CONTENT_W - 4) : [];
    const block = titleLines.length * 5 + 2 + bodyLines.length * 4.5 + (refLines.length ? refLines.length * 4 + 3 : 0) + 6;
    ensureSpace(ctx, block);

    setText(ctx.pdf, p.accentTeal);
    ctx.pdf.setFont('helvetica', 'bold');
    ctx.pdf.setFontSize(11);
    ctx.pdf.text(titleLines, MARGIN_L, ctx.y);
    ctx.y += titleLines.length * 5 + 1;
    setText(ctx.pdf, p.textPrimary);
    ctx.pdf.setFont('helvetica', 'normal');
    ctx.pdf.setFontSize(10);
    ctx.pdf.text(bodyLines, MARGIN_L, ctx.y);
    ctx.y += bodyLines.length * 4.5 + 1;
    if (refLines.length) {
      setText(ctx.pdf, p.accentAmber);
      ctx.pdf.setFont('helvetica', 'italic');
      ctx.pdf.setFontSize(9);
      ctx.pdf.text(refLines, MARGIN_L + 2, ctx.y);
      ctx.y += refLines.length * 4 + 1;
    }
    ctx.y += 4;
  });

  if (reco.pointFort) {
    const lines = ctx.pdf.splitTextToSize(`Point fort : ${reco.pointFort}`, CONTENT_W - 8);
    const h = lines.length * 4.5 + 8;
    ensureSpace(ctx, h + 3);
    setFill(ctx.pdf, p.accentTealLight);
    setDraw(ctx.pdf, p.accentTeal);
    ctx.pdf.rect(MARGIN_L, ctx.y, CONTENT_W, h, 'F');
    ctx.pdf.setLineWidth(1);
    ctx.pdf.line(MARGIN_L, ctx.y, MARGIN_L, ctx.y + h);
    setText(ctx.pdf, p.accentTeal);
    ctx.pdf.setFont('helvetica', 'normal');
    ctx.pdf.setFontSize(9.5);
    ctx.pdf.text(lines, MARGIN_L + 4, ctx.y + 5);
    ctx.y += h + 3;
  }
  if (reco.pointVigilance) {
    const lines = ctx.pdf.splitTextToSize(`Vigilance : ${reco.pointVigilance}`, CONTENT_W - 8);
    const h = lines.length * 4.5 + 8;
    ensureSpace(ctx, h + 3);
    setFill(ctx.pdf, p.accentAmberLight);
    setDraw(ctx.pdf, p.accentAmber);
    ctx.pdf.rect(MARGIN_L, ctx.y, CONTENT_W, h, 'F');
    ctx.pdf.setLineWidth(1);
    ctx.pdf.line(MARGIN_L, ctx.y, MARGIN_L, ctx.y + h);
    setText(ctx.pdf, p.accentAmber);
    ctx.pdf.setFont('helvetica', 'normal');
    ctx.pdf.setFontSize(9.5);
    ctx.pdf.text(lines, MARGIN_L + 4, ctx.y + 5);
    ctx.y += h + 3;
  }
  ctx.y += 4;
}

function drawReferenceCadre(ctx, diagnostic) {
  const p = ctx.palette;
  const cadre = CADRE_JUIN_2025[diagnostic.niveau];
  if (!cadre) return;
  drawSectionHeading(ctx, 'Références institutionnelles', p.accentTeal);

  const titleLines = ctx.pdf.splitTextToSize(cadre.titre, CONTENT_W - 8);
  const corpsLines = ctx.pdf.splitTextToSize(cadre.corps, CONTENT_W - 8);
  const principeLines = ctx.pdf.splitTextToSize(`« ${cadre.principe} »`, CONTENT_W - 8);
  const sourceLines = ctx.pdf.splitTextToSize(`Source : ${CADRE_SOURCE_LABEL}`, CONTENT_W - 8);
  const linkLines = ctx.pdf.splitTextToSize(CADRE_URL, CONTENT_W - 8);
  const h = titleLines.length * 5 + corpsLines.length * 4 + principeLines.length * 4 + sourceLines.length * 3.5 + linkLines.length * 3.5 + 22;
  ensureSpace(ctx, h + 4);

  setFill(ctx.pdf, p.accentVioletLight);
  ctx.pdf.rect(MARGIN_L, ctx.y, CONTENT_W, h, 'F');
  setDraw(ctx.pdf, p.accentViolet);
  ctx.pdf.setLineWidth(1);
  ctx.pdf.line(MARGIN_L, ctx.y, MARGIN_L, ctx.y + h);

  let innerY = ctx.y + 5;
  setText(ctx.pdf, p.accentViolet);
  ctx.pdf.setFont('helvetica', 'bold');
  ctx.pdf.setFontSize(11);
  ctx.pdf.text(titleLines, MARGIN_L + 4, innerY);
  innerY += titleLines.length * 5 + 1;
  setText(ctx.pdf, p.textPrimary);
  ctx.pdf.setFont('helvetica', 'normal');
  ctx.pdf.setFontSize(9.5);
  ctx.pdf.text(corpsLines, MARGIN_L + 4, innerY);
  innerY += corpsLines.length * 4 + 2;
  ctx.pdf.setFont('helvetica', 'italic');
  ctx.pdf.text(principeLines, MARGIN_L + 4, innerY);
  innerY += principeLines.length * 4 + 2;
  setText(ctx.pdf, p.textMuted);
  ctx.pdf.setFont('helvetica', 'italic');
  ctx.pdf.setFontSize(8);
  ctx.pdf.text(sourceLines, MARGIN_L + 4, innerY);
  innerY += sourceLines.length * 3.5 + 1;
  setText(ctx.pdf, p.linkColor);
  ctx.pdf.setFont('helvetica', 'normal');
  ctx.pdf.textWithLink(CADRE_URL, MARGIN_L + 4, innerY, { url: CADRE_URL });
  ctx.y += h + 6;
}

function drawReferenceProgrammes(ctx, diagnostic) {
  const p = ctx.palette;
  const niveauId = diagnostic.niveau;
  const extrait = trouverExtraitProgramme(niveauId, diagnostic.discipline);

  if (extrait) {
    const titleLines = ctx.pdf.splitTextToSize(extrait.titre, CONTENT_W - 8);
    const extraitLines = ctx.pdf.splitTextToSize(`« ${extrait.extrait} »`, CONTENT_W - 8);
    const sourceLines = ctx.pdf.splitTextToSize(`Source : ${extrait.source}`, CONTENT_W - 8);
    const linkLines = ctx.pdf.splitTextToSize(extrait.urlSource, CONTENT_W - 8);
    const h = titleLines.length * 5 + extraitLines.length * 4 + sourceLines.length * 3.5 + linkLines.length * 3.5 + 18;
    ensureSpace(ctx, h + 4);
    setFill(ctx.pdf, p.accentTealLight);
    ctx.pdf.rect(MARGIN_L, ctx.y, CONTENT_W, h, 'F');
    setDraw(ctx.pdf, p.accentTeal);
    ctx.pdf.setLineWidth(1);
    ctx.pdf.line(MARGIN_L, ctx.y, MARGIN_L, ctx.y + h);

    let innerY = ctx.y + 5;
    setText(ctx.pdf, p.accentTeal);
    ctx.pdf.setFont('helvetica', 'bold');
    ctx.pdf.setFontSize(11);
    ctx.pdf.text(titleLines, MARGIN_L + 4, innerY);
    innerY += titleLines.length * 5 + 1;
    setText(ctx.pdf, p.textPrimary);
    ctx.pdf.setFont('helvetica', 'italic');
    ctx.pdf.setFontSize(9.5);
    ctx.pdf.text(extraitLines, MARGIN_L + 4, innerY);
    innerY += extraitLines.length * 4 + 2;
    setText(ctx.pdf, p.textMuted);
    ctx.pdf.setFont('helvetica', 'normal');
    ctx.pdf.setFontSize(8);
    ctx.pdf.text(sourceLines, MARGIN_L + 4, innerY);
    innerY += sourceLines.length * 3.5 + 1;
    setText(ctx.pdf, p.linkColor);
    ctx.pdf.textWithLink(extrait.urlSource, MARGIN_L + 4, innerY, { url: extrait.urlSource });
    ctx.y += h + 4;
    return;
  }

  const bos = REFERENCES_BO_PAR_NIVEAU[niveauId] || [];
  const intro = `Les recommandations pédagogiques de ce diagnostic s'inscrivent dans le cadre des programmes officiels de l'Éducation nationale. Pour le niveau « ${NIVEAU_LIBELLE[niveauId] || niveauId} », les textes de référence sont les suivants :`;
  const note = "Note : les extraits disciplinaires détaillés seront progressivement intégrés dans l'outil dans les versions futures. En attendant, nous vous orientons vers la source institutionnelle officielle.";

  const titre = 'Programmes officiels de référence';
  ctx.pdf.setFont('helvetica', 'bold');
  ctx.pdf.setFontSize(11);
  const titleLines = ctx.pdf.splitTextToSize(titre, CONTENT_W - 8);
  ctx.pdf.setFont('helvetica', 'normal');
  ctx.pdf.setFontSize(9.5);
  const introLines = ctx.pdf.splitTextToSize(intro, CONTENT_W - 8);
  const bosLines = bos.map((b) => ctx.pdf.splitTextToSize(`— ${b}`, CONTENT_W - 12));
  const linkLabel = '→ Consulter les programmes officiels sur Eduscol';
  const linkLines = ctx.pdf.splitTextToSize(linkLabel, CONTENT_W - 8);
  const noteLines = ctx.pdf.splitTextToSize(note, CONTENT_W - 8);

  const flat = bosLines.reduce((acc, arr) => acc + arr.length, 0);
  const h = titleLines.length * 5 + introLines.length * 4 + flat * 4 + linkLines.length * 4.5 + noteLines.length * 3.5 + 22;
  ensureSpace(ctx, h + 4);

  setFill(ctx.pdf, p.accentTealLight);
  ctx.pdf.rect(MARGIN_L, ctx.y, CONTENT_W, h, 'F');
  setDraw(ctx.pdf, p.accentTeal);
  ctx.pdf.setLineWidth(1);
  ctx.pdf.line(MARGIN_L, ctx.y, MARGIN_L, ctx.y + h);

  let innerY = ctx.y + 5;
  setText(ctx.pdf, p.accentTeal);
  ctx.pdf.setFont('helvetica', 'bold');
  ctx.pdf.setFontSize(11);
  ctx.pdf.text(titleLines, MARGIN_L + 4, innerY);
  innerY += titleLines.length * 5 + 1;
  setText(ctx.pdf, p.textPrimary);
  ctx.pdf.setFont('helvetica', 'normal');
  ctx.pdf.setFontSize(9.5);
  ctx.pdf.text(introLines, MARGIN_L + 4, innerY);
  innerY += introLines.length * 4 + 2;
  bosLines.forEach((lines) => {
    ctx.pdf.text(lines, MARGIN_L + 4, innerY);
    innerY += lines.length * 4;
  });
  innerY += 2;
  setText(ctx.pdf, p.linkColor);
  ctx.pdf.setFont('helvetica', 'bold');
  ctx.pdf.textWithLink(linkLabel, MARGIN_L + 4, innerY, { url: PROGRAMMES_EDUSCOL_URL });
  innerY += linkLines.length * 4.5 + 2;
  setText(ctx.pdf, p.textMuted);
  ctx.pdf.setFont('helvetica', 'italic');
  ctx.pdf.setFontSize(8);
  ctx.pdf.text(noteLines, MARGIN_L + 4, innerY);

  ctx.y += h + 4;
}

export async function exporterFichePdf(diagnostic, themeChoice = 'light') {
  if (!diagnostic) throw new Error('Aucun diagnostic à exporter');
  const theme = themeChoice === 'dark' ? 'dark' : 'light';
  const palette = PALETTES[theme];

  const pdf = new jsPDF({ format: 'a4', unit: 'mm', orientation: 'portrait' });
  const ctx = { pdf, palette, y: MARGIN_T, pageIndex: 1, totalPages: 0 };
  paintBackground(ctx);

  drawHeader(ctx, diagnostic);
  drawContext(ctx, diagnostic);
  drawTriangle(ctx, diagnostic);
  drawRecommandations(ctx, diagnostic);
  drawReferenceCadre(ctx, diagnostic);
  drawReferenceProgrammes(ctx, diagnostic);

  const total = pdf.getNumberOfPages();
  ctx.totalPages = total;
  for (let i = 1; i <= total; i += 1) {
    pdf.setPage(i);
    ctx.pageIndex = i;
    drawFooter(ctx);
  }

  pdf.save(`diagnostic-triangle-${Date.now()}.pdf`);
}
