import { useEffect, useMemo, useState } from 'react';
import { Loader2, Sparkles, CheckCircle2, AlertTriangle, Lock, Info, ShieldAlert } from 'lucide-react';
import Triangle from '../Triangle.jsx';
import HelpSliderModal from '../HelpSliderModal.jsx';
import { getNiveau, getZoneEthique } from '../../data/niveaux.js';
import { AIDE_SLIDERS, getContrainte } from '../../data/contraintes.js';
import { genererRecommandations } from '../../services/claudeService.js';
import { detectPrenoms } from '../../utils/detectPrenoms.js';
import { useApp, computeAxeEleveSavoir } from '../../contexts/AppContext.jsx';

const INITIAL_FORM = {
  discipline: '',
  typeActivite: '',
  profilEleve: '',
  objectif: '',
  axeEnseignantSavoir: 50,
  axeEnseignantEleve: 50,
  axeEleveSavoirManipulation: 0,
  axeEleveSavoirImpactMediatise: 30,
};

function applyContrainteToForm(form, contrainte) {
  if (!contrainte) return form;
  const next = { ...form };
  if (contrainte.manipulationDirecteVerrou !== null) {
    next.axeEleveSavoirManipulation = contrainte.manipulationDirecteVerrou;
  } else if (contrainte.manipulationDirectePlafond !== null && next.axeEleveSavoirManipulation > contrainte.manipulationDirectePlafond) {
    next.axeEleveSavoirManipulation = contrainte.manipulationDirectePlafond;
  }
  return next;
}

export default function MonDiagnostic() {
  const { niveauId, diagnostic, setDiagnostic } = useApp();
  const niveau = getNiveau(niveauId);
  const contrainte = getContrainte(niveauId);

  const [form, setForm] = useState(() => {
    const base = diagnostic ? { ...INITIAL_FORM, ...diagnostic } : INITIAL_FORM;
    return applyContrainteToForm(base, contrainte);
  });
  const [recommendations, setRecommendations] = useState(diagnostic?.recommandationsFull || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [helpSlider, setHelpSlider] = useState(null);
  const [lastNiveauId, setLastNiveauId] = useState(niveauId);

  useEffect(() => {
    if (niveauId !== lastNiveauId) {
      setForm((f) => applyContrainteToForm(f, contrainte));
      setLastNiveauId(niveauId);
    }
  }, [niveauId, lastNiveauId, contrainte]);

  const axeEleveVisualise = useMemo(
    () => computeAxeEleveSavoir(form.axeEleveSavoirManipulation, form.axeEleveSavoirImpactMediatise),
    [form.axeEleveSavoirManipulation, form.axeEleveSavoirImpactMediatise]
  );

  const meanAxes = Math.round((form.axeEnseignantSavoir + form.axeEnseignantEleve + axeEleveVisualise) / 3);
  const zone = getZoneEthique(meanAxes);

  const manipulationLocked = contrainte?.manipulationDirecteVerrou !== null && contrainte?.manipulationDirecteVerrou !== undefined;
  const manipulationPlafond = contrainte?.manipulationDirectePlafond;
  const manipulationOverThreshold = manipulationPlafond !== null && manipulationPlafond !== undefined && form.axeEleveSavoirManipulation > manipulationPlafond;

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const onAnalyse = async () => {
    const errors = [];
    if (!form.discipline.trim()) errors.push('discipline');
    if (!form.typeActivite.trim()) errors.push('typeActivite');
    if (!form.profilEleve.trim()) errors.push('profilEleve');
    if (!form.objectif.trim()) errors.push('objectif');
    if (errors.length) { setError('Merci de compléter tous les champs obligatoires.'); return; }

    const allText = [form.discipline, form.typeActivite, form.profilEleve, form.objectif].join(' ');
    const prenoms = detectPrenoms(allText);
    if (prenoms.length > 0 && !warning) {
      setWarning(`Saisie contient ${prenoms.length > 1 ? 'des prénoms' : 'un prénom'} (${prenoms.slice(0, 3).join(', ')}). Privilégiez "un élève" ou "l'élève". Cliquez à nouveau pour envoyer tel quel.`);
      return;
    }
    setError(''); setWarning(''); setLoading(true);

    try {
      const result = await genererRecommandations(form, niveau.label, zone.label);
      const enriched = {
        ...form,
        id: `diag-${Date.now()}`,
        createdAt: new Date().toISOString(),
        niveau: niveauId,
        axeEleveSavoirVisualise: axeEleveVisualise,
        zoneEthique: zone.id,
        recommandations: (result.recommandations || []).map((r) => r.titre),
        recommandationsFull: result,
        conformiteCadre: result.conformiteCadre?.estConforme !== false,
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
        <p className="text-sm text-text-emphasized">Décrivez votre séance et positionnez les axes. Claude vous proposera trois recommandations contextualisées par le Cadre juin 2025.</p>

        <Field label="Niveau">
          <div className="px-3 py-2 rounded-lg bg-background-secondary border border-[#475569] text-sm text-text-emphasized">{niveau?.label}</div>
        </Field>
        <Field label="Discipline *">
          <input value={form.discipline} onChange={(e) => setField('discipline', e.target.value)} placeholder="Ex : Français, Mathématiques…" className="w-full bg-background-secondary text-text border border-[#475569] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-teal" />
        </Field>
        <Field label="Type d'activité *">
          <input value={form.typeActivite} onChange={(e) => setField('typeActivite', e.target.value)} placeholder="Ex : Évaluation différenciée, atelier lecture…" className="w-full bg-background-secondary text-text border border-[#475569] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-teal" />
        </Field>
        <Field label="Profil d'élève ciblé *">
          <input value={form.profilEleve} onChange={(e) => setField('profilEleve', e.target.value)} placeholder="Ex : groupe hétérogène, un élève en difficulté…" className="w-full bg-background-secondary text-text border border-[#475569] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-teal" />
        </Field>
        <Field label="Objectif pédagogique *">
          <textarea value={form.objectif} onChange={(e) => setField('objectif', e.target.value)} rows={2} placeholder="Ex : Consolider la division euclidienne" className="w-full bg-background-secondary text-text border border-[#475569] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-teal" />
        </Field>

        <div className="pt-4 border-t border-background-elevated">
          <p className="text-xs uppercase tracking-wide text-text-emphasized font-semibold mb-3">Activation IA côté enseignant</p>
          <AxisSlider label="Enseignant–Savoir (préparation)" color="#14B8A6" value={form.axeEnseignantSavoir} onChange={(v) => setField('axeEnseignantSavoir', v)} onHelp={() => setHelpSlider(AIDE_SLIDERS.enseignantSavoir)} />
          <AxisSlider label="Enseignant–Élève (relation)" color="#F59E0B" value={form.axeEnseignantEleve} onChange={(v) => setField('axeEnseignantEleve', v)} onHelp={() => setHelpSlider(AIDE_SLIDERS.enseignantEleve)} />
        </div>

        <div className="pt-4 border-t border-background-elevated">
          <div className="flex items-start gap-3 mb-3">
            <p className="text-xs uppercase tracking-wide text-text-emphasized font-semibold flex-1">Activation IA côté élève</p>
          </div>
          <p className="text-xs text-text-emphasized mb-4 leading-relaxed">
            L'axe Élève–Savoir est décomposé en deux sous-dimensions : la <strong>manipulation directe</strong> (l'élève utilise l'IA) est contrainte par le Cadre juin 2025 ; l'<strong>impact médiatisé</strong> (votre usage professionnel de l'IA atteint l'élève via vous) est libre à tous les niveaux.
          </p>

          <LockedOrPlafondSlider
            label="Élève–Savoir : manipulation directe"
            color="#8B5CF6"
            value={form.axeEleveSavoirManipulation}
            onChange={(v) => setField('axeEleveSavoirManipulation', v)}
            locked={manipulationLocked}
            plafond={manipulationPlafond}
            onHelp={() => setHelpSlider(AIDE_SLIDERS.eleveSavoirManipulation)}
          />
          {manipulationLocked && (
            <div className="mb-4 p-3 rounded" style={{ background: 'rgba(245, 158, 11, 0.08)', borderLeft: '3px solid #F59E0B' }}>
              <div className="flex gap-2 text-[13px] text-text-emphasized leading-relaxed">
                <Lock size={14} className="shrink-0 mt-0.5 text-brand-amber-light" />
                <span>{contrainte.messageExplicatif}</span>
              </div>
            </div>
          )}
          {!manipulationLocked && manipulationPlafond !== null && manipulationPlafond !== undefined && manipulationOverThreshold && (
            <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid #EF4444' }}>
              <div className="flex gap-2 text-[13px] leading-relaxed">
                <ShieldAlert size={16} className="shrink-0 mt-0.5 text-semantic-error" />
                <div>
                  <p className="font-semibold text-semantic-error mb-1">Attention — hors cadre</p>
                  <p className="text-text-emphasized">Au-delà de {manipulationPlafond}, vous décrivez un usage autonome par l'élève, non autorisé en 4e-3e selon le Cadre juin 2025. L'usage doit rester encadré et accompagné par l'enseignant.</p>
                </div>
              </div>
            </div>
          )}

          <AxisSlider
            label="Élève–Savoir : impact médiatisé"
            color="#C4B5FD"
            value={form.axeEleveSavoirImpactMediatise}
            onChange={(v) => setField('axeEleveSavoirImpactMediatise', v)}
            onHelp={() => setHelpSlider(AIDE_SLIDERS.eleveSavoirImpactMediatise)}
          />
          <p className="text-[11px] text-text-muted leading-snug mb-2">
            Même si l'élève ne manipule pas l'IA, votre usage professionnel de l'IA peut impacter son apprentissage (ex : support différencié généré par IA que vous lui donnez).
          </p>

          <div className="mt-3 p-3 rounded-lg bg-background-secondary border border-background-elevated flex items-center justify-between">
            <span className="text-xs text-text-emphasized">Axe Élève–Savoir visualisé (moyenne pondérée 0.7 / 0.3)</span>
            <span className="font-mono font-bold text-brand-violet-light">{axeEleveVisualise}/100</span>
          </div>
        </div>

        {warning && (
          <p className="text-xs p-2 rounded bg-semantic-warning/10 text-brand-amber-light flex items-start gap-2">
            <AlertTriangle size={14} className="shrink-0 mt-0.5" /> {warning}
          </p>
        )}
        {error && <p className="text-xs text-semantic-error">{error}</p>}

        <button onClick={onAnalyse} disabled={loading} className="w-full py-3 rounded-lg bg-brand-teal text-background font-semibold hover:bg-brand-teal-light disabled:opacity-40 transition flex items-center justify-center gap-2">
          {loading ? <><Loader2 size={16} className="animate-spin" /> Analyse…</> : <><Sparkles size={16} /> Analyser mon diagnostic</>}
        </button>
      </div>

      <div className="space-y-4">
        <div className="card p-6" id="diagnostic-triangle">
          <Triangle
            axes={{ enseignantSavoir: form.axeEnseignantSavoir, enseignantEleve: form.axeEnseignantEleve, eleveSavoir: axeEleveVisualise }}
            ethicsValue={meanAxes}
          />
          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: zone.color }}></span>
            <span className="text-text-emphasized">Zone éthique estimée :</span>
            <span className="font-semibold" style={{ color: zone.color }}>{zone.label}</span>
          </div>
        </div>

        {recommendations && (
          <div className="card p-6 space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2"><CheckCircle2 size={18} className="text-semantic-success" /> Recommandations</h3>
            {recommendations.recommandations?.map((r, i) => (
              <div key={i} className="p-3 rounded-lg bg-background-secondary border border-background-elevated">
                <p className="font-semibold text-brand-teal-light text-sm mb-1">{i + 1}. {r.titre}</p>
                <p className="text-sm text-text-emphasized">{r.description}</p>
                {r.referenceCadre && (
                  <p className="text-[11px] italic text-brand-amber-light mt-2">
                    → « {r.referenceCadre} »
                  </p>
                )}
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
            {recommendations.conformiteCadre?.estConforme === false && (
              <p className="text-sm p-3 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '3px solid #EF4444' }}>
                <strong className="text-semantic-error">Conformité Cadre : </strong>{recommendations.conformiteCadre.observation}
              </p>
            )}
          </div>
        )}
      </div>

      {helpSlider && <HelpSliderModal aide={helpSlider} onClose={() => setHelpSlider(null)} />}
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

function AxisSlider({ label, color, value, onChange, onHelp }) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium" style={{ color }}>{label}</span>
          {onHelp && (
            <button onClick={onHelp} aria-label={`Aide sur ${label}`} className="text-text-muted hover:text-brand-teal-light transition">
              <Info size={13} />
            </button>
          )}
        </div>
        <span className="text-xs font-mono text-text-emphasized">{value}</span>
      </div>
      <input type="range" min="0" max="100" value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" style={{ accentColor: color }} />
    </div>
  );
}

function LockedOrPlafondSlider({ label, color, value, onChange, locked, plafond, onHelp }) {
  const hasPlafond = !locked && plafond !== null && plafond !== undefined;
  const overThreshold = hasPlafond && value > plafond;

  const trackStyle = hasPlafond
    ? {
        background: `linear-gradient(to right, ${color} 0%, ${color} ${plafond - 2}%, #F59E0B ${plafond}%, #EF4444 ${Math.min(plafond + 20, 100)}%, #EF4444 100%)`,
      }
    : undefined;

  return (
    <div className={`mb-3 ${locked ? 'opacity-60' : ''}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium" style={{ color: locked ? '#94A3B8' : color }}>{label}</span>
          {onHelp && (
            <button onClick={onHelp} aria-label={`Aide sur ${label}`} className="text-text-muted hover:text-brand-teal-light transition">
              <Info size={13} />
            </button>
          )}
        </div>
        {locked ? (
          <span className="text-xs font-mono text-text-muted flex items-center gap-1">
            <Lock size={12} /> 0 — Verrouillé
          </span>
        ) : (
          <span className={`text-xs font-mono ${overThreshold ? 'text-semantic-error font-semibold' : 'text-text-emphasized'}`}>
            {value}
            {hasPlafond && (
              <span className="ml-1 text-[10px] uppercase">
                {value < 65 ? 'Encadré' : value < 85 ? 'Limite' : 'Hors cadre'}
              </span>
            )}
          </span>
        )}
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={locked ? 0 : value}
        onChange={(e) => !locked && onChange(Number(e.target.value))}
        disabled={locked}
        aria-disabled={locked}
        className="w-full"
        style={{
          accentColor: locked ? '#64748B' : overThreshold ? '#EF4444' : color,
          cursor: locked ? 'not-allowed' : 'pointer',
          ...(trackStyle ? {} : {}),
        }}
      />
      {hasPlafond && (
        <div className="relative w-full h-0">
          <span className="absolute top-[-10px]" style={{ left: `${plafond}%`, transform: 'translateX(-50%)', fontSize: 10, color: '#F59E0B' }}>│</span>
        </div>
      )}
    </div>
  );
}
