import { useState } from 'react';
import { X, ChevronDown, Scale, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import Triangle from '../Triangle.jsx';
import { AXES_META, VERTICES_META, getNiveau } from '../../data/niveaux.js';
import { AXES_DETAILS } from '../../data/axesDetails.js';
import { getContrainte } from '../../data/contraintes.js';
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
          Cliquez sur un <span className="text-brand-teal-light">sommet</span> ou un <span className="text-brand-violet-light">axe</span> pour en explorer le contenu.
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
            <p className="text-sm text-text-secondary">{vertexInfo.description}</p>
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
                <AlertTriangle size={14} className="shrink-0 mt-0.5 text-brand-amber-light" />
                <span className="text-text-emphasized leading-relaxed">{contrainte.bandeauExplorer}</span>
              </div>
            )}
            <Section color={AXES_META[selectedAxis].color} title={selectedAxis === 'eleveSavoir' && (niveauId === 'primaire' || niveauId === 'college_6_5') ? "Ce que l'IA peut (via l'enseignant)" : "IA peut"}>
              <ul className="space-y-1 text-sm text-text-secondary">
                {detail.iaPeut.map((it, i) => <li key={i}>▸ {it}</li>)}
              </ul>
            </Section>
            <Section color="#22C55E" title="Humain irremplaçable">
              <ul className="space-y-1 text-sm text-text-secondary">
                {detail.humainIrremplaçable.map((it, i) => <li key={i}>▸ {it}</li>)}
              </ul>
            </Section>
            <Section color="#64748B" title="Exemple terrain">
              <p className="text-sm italic text-text-secondary">« {detail.exempleTerrain} »</p>
            </Section>
          </div>
        )}
      </aside>
      </div>

      <section className="card mt-6 overflow-hidden" aria-labelledby="cadre-title">
        <button
          onClick={() => setCadreOpen((v) => !v)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-background-elevated transition"
          aria-expanded={cadreOpen}
          aria-controls="cadre-panel"
        >
          <div className="flex items-center gap-3">
            <Scale size={18} className="text-brand-amber-light" strokeWidth={1.75} />
            <h3 id="cadre-title" className="text-base font-semibold">Cadre réglementaire — {niveau?.label}</h3>
          </div>
          <ChevronDown size={18} className={`text-text-muted transition ${cadreOpen ? 'rotate-180' : ''}`} />
        </button>
        {cadreOpen && (
          <div id="cadre-panel" className="px-5 pb-5 pt-1 border-t border-background-elevated space-y-4">
            <div className="p-4 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.08)', borderLeft: '3px solid #F59E0B' }}>
              <p className="text-xs uppercase tracking-wider text-brand-amber-light font-semibold mb-2">Règle centrale</p>
              <p className="text-sm text-text-secondary italic">« {niveau?.regleAutorisation} »</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={15} className="text-semantic-success" />
                  <p className="text-xs uppercase tracking-wider font-semibold text-semantic-success">Autorisé</p>
                </div>
                <ul className="space-y-1 text-sm text-text-secondary">
                  {niveau?.autorises.map((a, i) => <li key={i}>▸ {a}</li>)}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <XCircle size={15} className="text-semantic-error" />
                  <p className="text-xs uppercase tracking-wider font-semibold text-semantic-error">Non autorisé</p>
                </div>
                <ul className="space-y-1 text-sm text-text-secondary">
                  {niveau?.nonAutorises.map((a, i) => <li key={i}>▸ {a}</li>)}
                </ul>
              </div>
            </div>
            <p className="text-xs text-text-muted pt-2 border-t border-background-elevated">
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
