import { useState } from 'react';
import { X } from 'lucide-react';
import Triangle from '../Triangle.jsx';
import { AXES_META, VERTICES_META, getNiveau } from '../../data/niveaux.js';
import { AXES_DETAILS } from '../../data/axesDetails.js';
import { useApp } from '../../contexts/AppContext.jsx';

export default function Explorer() {
  const { niveauId, ethicsValue } = useApp();
  const niveau = getNiveau(niveauId);
  const [selectedVertex, setSelectedVertex] = useState(null);
  const [selectedAxis, setSelectedAxis] = useState(null);

  const detail = niveauId && selectedAxis ? AXES_DETAILS[niveauId]?.[selectedAxis] : null;
  const vertexInfo = selectedVertex ? VERTICES_META[selectedVertex] : null;

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-6 grid md:grid-cols-[1fr_380px] gap-6 animate-fade">
      <div className="card p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-1">{niveau?.label}</h2>
          <p className="text-sm text-text-secondary italic">« {niveau?.citation} »</p>
        </div>
        <Triangle
          axes={{ enseignantSavoir: 60, enseignantEleve: 60, eleveSavoir: 60 }}
          selectedVertex={selectedVertex}
          selectedAxis={selectedAxis}
          onSelectVertex={(v) => { setSelectedVertex(v); setSelectedAxis(null); }}
          onSelectAxis={(a) => { setSelectedAxis(a); setSelectedVertex(null); }}
          ethicsValue={ethicsValue}
        />
        <p className="text-xs text-text-muted mt-4 text-center">
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
            <Section color={AXES_META[selectedAxis].color} title="IA peut">
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
