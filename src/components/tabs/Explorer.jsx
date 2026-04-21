import { useState } from 'react';
import { X, ChevronDown, Scale, CheckCircle2, XCircle, AlertTriangle, Sparkles, ExternalLink } from 'lucide-react';
import Triangle from '../Triangle.jsx';
import { AXES_META, VERTICES_META, getNiveau } from '../../data/niveaux.js';
import { AXES_DETAILS } from '../../data/axesDetails.js';
import { getContrainte, P2IA_CYCLE_2, P2IA_CYCLE_3, P2IA_URL_EDUSCOL_CYCLE_2, P2IA_URL_EDUSCOL_CYCLE_3 } from '../../data/contraintes.js';
import { useApp } from '../../contexts/AppContext.jsx';

export default function Explorer() {
  const { niveauId, ethicsValue } = useApp();
  const niveau = getNiveau(niveauId);
  const contrainte = getContrainte(niveauId);
  const [selectedVertex, setSelectedVertex] = useState(null);
  const [selectedAxis, setSelectedAxis] = useState(null);
  const [cadreOpen, setCadreOpen] = useState(false);

  const detail = niveauId && selectedAxis ? AXES_DETAILS[niveauId]?.[selectedAxis] : null;
  const vertexInfo = selectedVertex ? VERTICES_META[selectedVertex] : null;

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-6 animate-fade">
      <div className="grid md:grid-cols-[1fr_380px] gap-6">
      <div className="card p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-1">{niveau?.label}</h2>
          <p className="text-sm text-text-emphasized italic">« {niveau?.citation} »</p>
        </div>
        <Triangle
          axes={{ enseignantSavoir: 60, enseignantEleve: 60, eleveSavoir: 60 }}
          selectedVertex={selectedVertex}
          selectedAxis={selectedAxis}
          onSelectVertex={(v) => { setSelectedVertex(v); setSelectedAxis(null); }}
          onSelectAxis={(a) => { setSelectedAxis(a); setSelectedVertex(null); }}
          ethicsValue={ethicsValue}
        />
        <p className="text-sm text-text-emphasized mt-4 text-center">
          Cliquez sur un <span className="text-brand-teal-primary">sommet</span> ou un <span className="text-brand-violet-primary">axe</span> pour en explorer le contenu.
        </p>
      </div>

      <aside className="card p-6 min-h-[200px]">
        {!selectedAxis && !selectedVertex && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <p className="text-sm text-text-muted">Aucun élément sélectionné.</p>
            <p className="text-xs text-text-muted mt-2">Le panneau se remplira dès que vous cliquerez.</p>
          </div>
        )}

        {vertexInfo && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold" style={{ color: vertexInfo.color }}>{vertexInfo.label}</h3>
              <button onClick={() => setSelectedVertex(null)} aria-label="Fermer"><X size={16} className="text-text-muted hover:text-text" /></button>
            </div>
            <p className="text-sm text-text">{vertexInfo.description}</p>
          </div>
        )}

        {selectedAxis && detail && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: AXES_META[selectedAxis].color }}>
                {AXES_META[selectedAxis].label}
              </h3>
              <button onClick={() => setSelectedAxis(null)} aria-label="Fermer"><X size={16} className="text-text-muted hover:text-text" /></button>
            </div>
            {selectedAxis === 'eleveSavoir' && contrainte?.bandeauExplorer && (
              <div className="mb-4 p-3 rounded-lg flex gap-2 text-[13px]" style={{ background: 'rgba(245, 158, 11, 0.08)', borderLeft: '3px solid #F59E0B' }}>
                <AlertTriangle size={14} className="shrink-0 mt-0.5 text-brand-amber-primary" />
                <span className="text-text-emphasized leading-relaxed">{contrainte.bandeauExplorer}</span>
              </div>
            )}
            <Section color={AXES_META[selectedAxis].color} title={selectedAxis === 'eleveSavoir' && (niveauId === 'primaire' || niveauId === 'college_6_5') ? "Ce que l'IA peut (via l'enseignant)" : "IA peut"}>
              <ul className="space-y-1 text-sm text-text">
                {detail.iaPeut.map((it, i) => <li key={i}>▸ {it}</li>)}
              </ul>
            </Section>
            <Section color="#22C55E" title="Humain irremplaçable">
              <ul className="space-y-1 text-sm text-text">
                {detail.humainIrremplaçable.map((it, i) => <li key={i}>▸ {it}</li>)}
              </ul>
            </Section>
            <Section color="#64748B" title="Exemple terrain">
              <p className="text-sm italic text-text">« {detail.exempleTerrain} »</p>
            </Section>
          </div>
        )}
      </aside>
      </div>

      {(niveauId === 'primaire' || niveauId === 'college_6_5') && (
        <P2IASection niveauId={niveauId} />
      )}

      <section className="card mt-6 overflow-hidden" aria-labelledby="cadre-title">
        <button
          onClick={() => setCadreOpen((v) => !v)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-background-elevated transition"
          aria-expanded={cadreOpen}
          aria-controls="cadre-panel"
        >
          <div className="flex items-center gap-3">
            <Scale size={18} className="text-brand-amber-primary" strokeWidth={1.75} />
            <h3 id="cadre-title" className="text-base font-semibold">Cadre réglementaire — {niveau?.label}</h3>
          </div>
          <ChevronDown size={18} className={`text-text-muted transition ${cadreOpen ? 'rotate-180' : ''}`} />
        </button>
        {cadreOpen && (
          <div id="cadre-panel" className="px-5 pb-5 pt-1 border-t border-border-subtle space-y-4">
            <div className="p-4 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.08)', borderLeft: '3px solid #F59E0B' }}>
              <p className="text-xs uppercase tracking-wider text-brand-amber-primary font-semibold mb-2">Règle centrale</p>
              <p className="text-sm text-text italic">« {niveau?.regleAutorisation} »</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={15} className="text-semantic-success" />
                  <p className="text-xs uppercase tracking-wider font-semibold text-semantic-success">Autorisé</p>
                </div>
                <ul className="space-y-1 text-sm text-text">
                  {niveau?.autorises.map((a, i) => <li key={i}>▸ {a}</li>)}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <XCircle size={15} className="text-semantic-error" />
                  <p className="text-xs uppercase tracking-wider font-semibold text-semantic-error">Non autorisé</p>
                </div>
                <ul className="space-y-1 text-sm text-text">
                  {niveau?.nonAutorises.map((a, i) => <li key={i}>▸ {a}</li>)}
                </ul>
              </div>
            </div>
            <p className="text-xs text-text-muted pt-2 border-t border-border-subtle">
              Source : Cadre d'usage de l'IA en éducation, Ministère de l'Éducation nationale, juin 2025.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}

function Section({ color, title, children }) {
  return (
    <div className="p-4 rounded-lg mb-3" style={{ background: `${color}1A`, borderLeft: `3px solid ${color}` }}>
      <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color }}>{title}</h4>
      {children}
    </div>
  );
}

function P2IASection({ niveauId }) {
  const isPrimaire = niveauId === 'primaire';
  const services = isPrimaire ? P2IA_CYCLE_2 : P2IA_CYCLE_3;
  const url = isPrimaire ? P2IA_URL_EDUSCOL_CYCLE_2 : P2IA_URL_EDUSCOL_CYCLE_3;
  const titre = isPrimaire
    ? "L'exception institutionnelle — les P2IA cycle 2"
    : "Les P2IA cycle 3 — en expérimentation";
  const intro = isPrimaire
    ? (
      <>
        Les P2IA (Partenariat d'innovation en intelligence artificielle) sont des <strong>services numériques d'assistance et de recommandation</strong> développés par le Ministère de l'Éducation nationale. À la différence des IA génératives ouvertes, ils peuvent être utilisés par les élèves dans un cadre pédagogique strict, sous supervision enseignante. <strong>Cinq services sont déployés depuis 2020</strong> pour le cycle 2 (CP, CE1, CE2).
      </>
    )
    : (
      <>
        <strong>Six nouveaux services P2IA sont en phase de recherche et développement depuis janvier 2026</strong> pour les classes de CM1, CM2 et 6ᵉ. Lauréats du marché public P2IA Cycle 3, ils sont expérimentés par des enseignants volontaires de plusieurs académies avant un éventuel déploiement plus large.
      </>
    );
  const lienLibelle = isPrimaire
    ? "Consulter la fiche Eduscol sur les P2IA cycle 2"
    : "Consulter la fiche Eduscol sur les P2IA cycle 3";

  return (
    <section className="card mt-6 p-6" aria-labelledby="p2ia-title">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-brand-violet-light flex items-center justify-center flex-shrink-0">
          <Sparkles size={16} className="text-brand-violet-primary" strokeWidth={1.75} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 id="p2ia-title" className="text-base font-semibold text-text mb-1">{titre}</h3>
          <p className="text-[13px] text-text-secondary leading-relaxed">{intro}</p>
        </div>
      </div>
      <ul className="grid md:grid-cols-2 gap-2 mb-4">
        {services.map((svc) => (
          <li
            key={svc.nom}
            className="flex items-start gap-2 p-3 rounded-lg bg-brand-violet-light/40 border border-border-subtle"
          >
            <span className="text-brand-violet-primary font-semibold text-sm flex-shrink-0 mt-0.5" aria-hidden="true">▸</span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text">
                {svc.nom} <span className="text-[11px] font-normal text-text-muted">· {svc.discipline}</span>
              </p>
              <p className="text-[12px] text-text-secondary leading-snug mt-0.5">{svc.description}</p>
              {svc.precision && (
                <p className="text-[11px] text-text-muted italic mt-1 leading-snug">{svc.precision}</p>
              )}
              {svc.realisePar && (
                <p className="text-[11px] text-text-muted mt-1">Réalisé par : {svc.realisePar}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <p className="text-[12px] text-text-muted italic mb-3 leading-relaxed">
        Ces services ne sont pas mesurés par l'axe « Manipulation d'IA générative » du triangle — ils relèvent d'une catégorie distincte : l'IA institutionnelle cadrée.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-[12px] text-brand-violet-primary hover:underline underline-offset-2"
      >
        {lienLibelle}
        <ExternalLink size={11} strokeWidth={1.75} />
      </a>
    </section>
  );
}
