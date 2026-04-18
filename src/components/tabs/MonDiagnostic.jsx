import { useState } from 'react';
import { Loader2, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import Triangle from '../Triangle.jsx';
import { getNiveau, getZoneEthique } from '../../data/niveaux.js';
import { genererRecommandations } from '../../services/claudeService.js';
import { detectPrenoms } from '../../utils/detectPrenoms.js';
import { useApp } from '../../contexts/AppContext.jsx';

const INITIAL_FORM = {
  discipline: '',
  typeActivite: '',
  profilEleve: '',
  objectif: '',
  axeEnseignantSavoir: 50,
  axeEnseignantEleve: 50,
  axeEleveSavoir: 50,
};

export default function MonDiagnostic() {
  const { niveauId, diagnostic, setDiagnostic } = useApp();
  const niveau = getNiveau(niveauId);
  const [form, setForm] = useState(() => (diagnostic ? { ...INITIAL_FORM, ...diagnostic } : INITIAL_FORM));
  const [recommendations, setRecommendations] = useState(diagnostic?.recommandationsFull || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const meanAxes = Math.round((form.axeEnseignantSavoir + form.axeEnseignantEleve + form.axeEleveSavoir) / 3);
  const zone = getZoneEthique(meanAxes);

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const onAnalyse = async () => {
    const errors = [];
    if (!form.discipline.trim()) errors.push('discipline');
    if (!form.typeActivite.trim()) errors.push('typeActivite');
    if (!form.profilEleve.trim()) errors.push('profilEleve');
    if (!form.objectif.trim()) errors.push('objectif');
    if (errors.length) {
      setError('Merci de compléter tous les champs obligatoires.');
      return;
    }
    const allText = [form.discipline, form.typeActivite, form.profilEleve, form.objectif].join(' ');
    const prenoms = detectPrenoms(allText);
    if (prenoms.length > 0 && !warning) {
      setWarning(`Saisie contient ${prenoms.length > 1 ? 'des prénoms' : 'un prénom'} (${prenoms.slice(0, 3).join(', ')}). Privilégiez "un élève" ou "l'élève". Cliquez à nouveau pour envoyer tel quel.`);
      return;
    }
    setError('');
    setWarning('');
    setLoading(true);

    try {
      const result = await genererRecommandations(form, niveau.label, zone.label);
      const enriched = {
        ...form,
        id: `diag-${Date.now()}`,
        createdAt: new Date().toISOString(),
        niveau: niveauId,
        zoneEthique: zone.id,
        recommandations: (result.recommandations || []).map((r) => r.titre),
        recommandationsFull: result,
      };
      setDiagnostic(enriched);
      setRecommendations(result);
    } catch (e) {
      console.error(e);
      setError('Le générateur se repose. Réessayez dans un instant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-6 grid lg:grid-cols-[1fr_1fr] gap-6 animate-fade">
      <div className="card p-6 space-y-4">
        <h2 className="text-xl font-semibold">Mon Diagnostic Personnel</h2>
        <p className="text-sm text-text-secondary">Décrivez votre séance et positionnez les trois axes. Claude vous proposera trois recommandations.</p>

        <Field label="Niveau">
          <div className="px-3 py-2 rounded-lg bg-background-secondary border border-background-elevated text-sm text-text-secondary">
            {niveau?.label}
          </div>
        </Field>
        <Field label="Discipline *">
          <input
            value={form.discipline}
            onChange={(e) => setField('discipline', e.target.value)}
            placeholder="Ex : Français, Mathématiques…"
            className="w-full bg-background-secondary text-text border border-background-elevated rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-teal"
          />
        </Field>
        <Field label="Type d'activité *">
          <input
            value={form.typeActivite}
            onChange={(e) => setField('typeActivite', e.target.value)}
            placeholder="Ex : Évaluation différenciée, atelier lecture…"
            className="w-full bg-background-secondary text-text border border-background-elevated rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-teal"
          />
        </Field>
        <Field label="Profil d'élève ciblé *">
          <input
            value={form.profilEleve}
            onChange={(e) => setField('profilEleve', e.target.value)}
            placeholder='Ex : groupe hétérogène, un élève en difficulté…'
            className="w-full bg-background-secondary text-text border border-background-elevated rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-teal"
          />
        </Field>
        <Field label="Objectif pédagogique *">
          <textarea
            value={form.objectif}
            onChange={(e) => setField('objectif', e.target.value)}
            rows={2}
            placeholder="Ex : Consolider la division euclidienne"
            className="w-full bg-background-secondary text-text border border-background-elevated rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-teal"
          />
        </Field>

        <div className="pt-3 border-t border-background-elevated">
          <p className="text-xs uppercase tracking-wide text-text-muted mb-3">Activation IA par axe</p>
          <AxisSlider label="Enseignant–Savoir (préparation)" color="#14B8A6" value={form.axeEnseignantSavoir} onChange={(v) => setField('axeEnseignantSavoir', v)} />
          <AxisSlider label="Enseignant–Élève (relation)" color="#F59E0B" value={form.axeEnseignantEleve} onChange={(v) => setField('axeEnseignantEleve', v)} />
          <AxisSlider label="Élève–Savoir (apprentissage)" color="#8B5CF6" value={form.axeEleveSavoir} onChange={(v) => setField('axeEleveSavoir', v)} />
        </div>

        {warning && (
          <p className="text-xs p-2 rounded bg-semantic-warning/10 text-brand-amber-light flex items-start gap-2">
            <AlertTriangle size={14} className="shrink-0 mt-0.5" /> {warning}
          </p>
        )}
        {error && <p className="text-xs text-semantic-error">{error}</p>}

        <button
          onClick={onAnalyse}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-brand-teal text-background font-semibold hover:bg-brand-teal-light disabled:opacity-40 transition flex items-center justify-center gap-2"
        >
          {loading ? <><Loader2 size={16} className="animate-spin" /> Analyse…</> : <><Sparkles size={16} /> Analyser mon diagnostic</>}
        </button>
      </div>

      <div className="space-y-4">
        <div className="card p-6" id="diagnostic-triangle">
          <Triangle
            axes={{
              enseignantSavoir: form.axeEnseignantSavoir,
              enseignantEleve: form.axeEnseignantEleve,
              eleveSavoir: form.axeEleveSavoir,
            }}
            ethicsValue={meanAxes}
          />
          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: zone.color }}></span>
            <span className="text-text-secondary">Zone éthique estimée :</span>
            <span className="font-semibold" style={{ color: zone.color }}>{zone.label}</span>
          </div>
        </div>

        {recommendations && (
          <div className="card p-6 space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2"><CheckCircle2 size={18} className="text-semantic-success" /> Recommandations</h3>
            {recommendations.recommandations?.map((r, i) => (
              <div key={i} className="p-3 rounded-lg bg-background-secondary border border-background-elevated">
                <p className="font-semibold text-brand-teal-light text-sm mb-1">{i + 1}. {r.titre}</p>
                <p className="text-sm text-text-secondary">{r.description}</p>
              </div>
            ))}
            {recommendations.pointFort && (
              <p className="text-sm p-3 rounded-lg" style={{ background: 'rgba(16, 185, 129, 0.1)', borderLeft: '3px solid #10B981' }}>
                <strong className="text-semantic-success">Point fort : </strong>{recommendations.pointFort}
              </p>
            )}
            {recommendations.pointVigilance && (
              <p className="text-sm p-3 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.1)', borderLeft: '3px solid #F59E0B' }}>
                <strong className="text-brand-amber-light">Vigilance : </strong>{recommendations.pointVigilance}
              </p>
            )}
            {recommendations.referenceCadre && (
              <div className="p-3 rounded-lg bg-background-secondary border border-background-elevated">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-text-muted mb-1">Référence cadre</p>
                <p className="text-sm font-semibold text-brand-amber-light mb-1">{recommendations.referenceCadre.principe}</p>
                <p className="text-xs italic text-text-secondary">« {recommendations.referenceCadre.citation} »</p>
                <p className="text-[10px] text-text-muted mt-2">Cadre d'usage de l'IA en éducation — MEN, juin 2025</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">{label}</label>
      {children}
    </div>
  );
}

function AxisSlider({ label, color, value, onChange }) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium" style={{ color }}>{label}</span>
        <span className="text-xs text-text-secondary">{value}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: color }}
      />
    </div>
  );
}
