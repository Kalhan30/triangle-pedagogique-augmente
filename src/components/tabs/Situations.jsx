import { useState } from 'react';
import { Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import Triangle from '../Triangle.jsx';
import { getNiveau } from '../../data/niveaux.js';
import { getScenariosByNiveau, getRandomScenario } from '../../data/scenarios.js';
import { analyserSituation } from '../../services/claudeService.js';
import { detectPrenoms } from '../../utils/detectPrenoms.js';
import { useApp } from '../../contexts/AppContext.jsx';

export default function Situations() {
  const { niveauId, ethicsValue } = useApp();
  const niveau = getNiveau(niveauId);
  const scenarios = getScenariosByNiveau(niveauId);

  const [selected, setSelected] = useState(scenarios[0] || null);
  const [situationText, setSituationText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const handleAnalyse = async () => {
    if (!situationText.trim()) return;
    const prenoms = detectPrenoms(situationText);
    if (prenoms.length > 0 && !warning) {
      setWarning(`Votre saisie semble contenir ${prenoms.length > 1 ? 'des prénoms' : 'un prénom'} (${prenoms.slice(0, 3).join(', ')}). Pour protéger les données de vos élèves, remplacez par "un élève" ou cliquez à nouveau pour envoyer tel quel.`);
      return;
    }
    setWarning('');
    setLoading(true);
    setError('');
    try {
      const result = await analyserSituation(situationText, niveau.label);
      const axes = {
        enseignantSavoir: clamp(result.axes?.enseignantSavoir),
        enseignantEleve: clamp(result.axes?.enseignantEleve),
        eleveSavoir: clamp(result.axes?.eleveSavoir),
      };
      setSelected({
        id: `custom-${Date.now()}`,
        niveau: niveauId,
        titre: result.titreSyntheque || 'Situation analysée',
        description: situationText,
        axeEnseignantSavoir: axes.enseignantSavoir,
        axeEnseignantEleve: axes.enseignantEleve,
        axeEleveSavoir: axes.eleveSavoir,
        roleIA: result.roleIA,
        roleHumain: result.roleHumain,
        pointsAttention: result.pointsAttention || [],
        referenceCadre: result.referenceCadre || null,
        custom: true,
      });
    } catch (e) {
      console.error(e);
      setError('Le générateur se repose.');
      const fallback = getRandomScenario(niveauId);
      if (fallback) setSelected(fallback);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-6 grid md:grid-cols-[360px_1fr] gap-6 animate-fade">
      <div className="space-y-3">
        <div className="card p-4">
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2"><Sparkles size={16} className="text-brand-teal-light" /> Proposez votre séance</h3>
          <p className="text-xs text-text-muted mb-3">Décrivez une situation pédagogique et l'IA Claude analysera la place de l'humain et de l'IA dans le triangle.</p>
          <textarea
            value={situationText}
            onChange={(e) => { setSituationText(e.target.value); setWarning(''); }}
            rows={3}
            placeholder="Ex : Évaluation différenciée en CE2 avec trois niveaux"
            className="w-full bg-background text-text border border-background-elevated rounded-lg p-2 text-sm focus:outline-none focus:border-brand-teal"
            aria-label="Décrivez votre situation pédagogique"
          />
          {warning && (
            <p className="text-xs mt-2 p-2 rounded bg-semantic-warning/10 text-brand-amber-light flex items-start gap-2">
              <AlertTriangle size={14} className="shrink-0 mt-0.5" /> {warning}
            </p>
          )}
          {error && <p className="text-xs mt-2 text-semantic-error">{error}</p>}
          <button
            onClick={handleAnalyse}
            disabled={loading || !situationText.trim()}
            className="mt-3 w-full py-2 rounded-lg bg-brand-teal text-background font-semibold text-sm hover:bg-brand-teal-light disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 size={14} className="animate-spin" /> Analyse…</> : 'Générer avec Claude'}
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-text-muted">Scénarios prédéfinis</p>
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              className={`card p-3 w-full text-left transition hover:border-brand-teal ${
                selected?.id === s.id ? 'border-brand-teal-light bg-background-elevated' : ''
              }`}
            >
              <h4 className="text-sm font-semibold mb-1">{s.titre}</h4>
              <p className="text-xs text-text-muted leading-snug">{s.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="card p-6">
        {selected ? <ScenarioDetail scenario={selected} ethicsValue={ethicsValue} /> : <p className="text-sm text-text-muted">Sélectionnez un scénario ou générez-en un nouveau.</p>}
      </div>
    </section>
  );
}

function ScenarioDetail({ scenario, ethicsValue }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-1">{scenario.titre}</h2>
      <p className="text-sm text-text-secondary mb-5">{scenario.description}</p>
      <Triangle
        axes={{
          enseignantSavoir: scenario.axeEnseignantSavoir,
          enseignantEleve: scenario.axeEnseignantEleve,
          eleveSavoir: scenario.axeEleveSavoir,
        }}
        ethicsValue={ethicsValue}
      />
      <div className="grid md:grid-cols-2 gap-3 mt-5">
        <div className="p-3 rounded-lg" style={{ background: 'rgba(20, 184, 166, 0.1)', borderLeft: '3px solid #14B8A6' }}>
          <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-brand-teal-light">Rôle de l'IA</h4>
          <p className="text-sm text-text-secondary">{scenario.roleIA}</p>
        </div>
        <div className="p-3 rounded-lg" style={{ background: 'rgba(139, 92, 246, 0.1)', borderLeft: '3px solid #8B5CF6' }}>
          <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-brand-violet-light">Rôle humain</h4>
          <p className="text-sm text-text-secondary">{scenario.roleHumain}</p>
        </div>
      </div>
      {scenario.pointsAttention && scenario.pointsAttention.length > 0 && (
        <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.1)', borderLeft: '3px solid #F59E0B' }}>
          <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-brand-amber-light">Points d'attention</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            {scenario.pointsAttention.map((p, i) => <li key={i}>▸ {p}</li>)}
          </ul>
        </div>
      )}
      {scenario.citation && (
        <blockquote className="mt-4 italic text-sm text-text-muted border-l-2 border-background-elevated pl-3">« {scenario.citation} »</blockquote>
      )}
      {scenario.referenceCadre && (
        <div className="mt-4 p-3 rounded-lg bg-background-secondary border border-background-elevated">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-text-muted mb-1">Référence cadre</p>
          <p className="text-sm font-semibold text-brand-amber-light mb-1">{scenario.referenceCadre.principe}</p>
          <p className="text-xs italic text-text-secondary">« {scenario.referenceCadre.citation} »</p>
          <p className="text-[10px] text-text-muted mt-2">Cadre d'usage de l'IA en éducation — MEN, juin 2025</p>
        </div>
      )}
    </div>
  );
}

function clamp(v) {
  const n = Number(v);
  if (Number.isNaN(n)) return 50;
  return Math.max(0, Math.min(100, Math.round(n)));
}
