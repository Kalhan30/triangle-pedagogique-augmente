import { useEffect, useMemo, useState } from 'react';
import { Loader2, Sparkles, CheckCircle2, AlertTriangle, Lock, Info, ShieldAlert, ListChecks, Sliders } from 'lucide-react';
import Triangle from '../Triangle.jsx';
import HelpSliderModal from '../HelpSliderModal.jsx';
import QuestionnaireWizard from './QuestionnaireWizard.jsx';
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
  const { niveauId, diagnostic, setDiagnostic, setEthicsValue } = useApp();
  const niveau = getNiveau(niveauId);
  const contrainte = getContrainte(niveauId);

  const [mode, setMode] = useState(diagnostic?.modeUtilise === 'avance' ? 'avance' : 'questionnaire');
  const [form, setForm] = useState(() => {
    const base = diagnostic ? { ...INITIAL_FORM, ...diagnostic } : INITIAL_FORM;
    return applyContrainteToForm(base, contrainte);
  });
  const [wizardResponses, setWizardResponses] = useState(diagnostic?.responses || {});
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

  const contextMissing = [
    !form.discipline.trim() && 'Discipline',
    !form.typeActivite.trim() && "Type d'activité",
    !form.profilEleve.trim() && "Profil d'élève",
    !form.objectif.trim() && 'Objectif',
  ].filter(Boolean);
  const contextComplete = contextMissing.length === 0;

  const validateContext = () => (contextComplete ? null : 'missing');

  const runAnalysis = async (enrichedForm, diagPayload) => {
    const allText = [enrichedForm.discipline, enrichedForm.typeActivite, enrichedForm.profilEleve, enrichedForm.objectif].join(' ');
    const prenoms = detectPrenoms(allText);
    if (prenoms.length > 0 && !warning) {
      const mots = prenoms.slice(0, 3).map((p) => `« ${p} »`).join(', ');
      const pluriel = prenoms.length > 1;
      setWarning(
        `${mots} ${pluriel ? 'peuvent ressembler à des prénoms' : 'peut ressembler à un prénom'}. Si c'est le cas, préférez « un élève » ou « l'élève ». Sinon, cliquez à nouveau pour envoyer tel quel.`
      );
      return;
    }
    setError(''); setWarning(''); setLoading(true);

    try {
      const result = await genererRecommandations(enrichedForm, niveau.label, zone.label);
      const enriched = {
        ...enrichedForm,
        ...diagPayload,
        id: `diag-${Date.now()}`,
        createdAt: new Date().toISOString(),
        niveau: niveauId,
        zoneEthique: zone.id,
        recommandations: (result.recommandations || []).map((r) => r.titre),
        recommandationsFull: result,
        conformiteCadre: result.conformiteCadre?.estConforme !== false,
      };
      setDiagnostic(enriched);
      setRecommendations(result);
      if (typeof enriched.valeurEthiqueGlobale === 'number') {
        setEthicsValue(enriched.valeurEthiqueGlobale);
      } else {
        setEthicsValue(meanAxes);
      }
    } catch (e) {
      console.error(e);
      setError('Le générateur se repose. Réessayez dans un instant.');
    } finally {
      setLoading(false);
    }
  };

  const onValidateQuestionnaire = async (payload) => {
    const missing = validateContext();
    if (missing) { setError('Merci de compléter tous les champs de contexte avant de lancer l\'analyse.'); return; }
    const enrichedForm = {
      ...form,
      axeEnseignantSavoir: payload.axeEnseignantSavoir,
      axeEnseignantEleve: payload.axeEnseignantEleve,
      axeEleveSavoirManipulation: payload.axeEleveSavoirManipulation,
      axeEleveSavoirImpactMediatise: payload.axeEleveSavoirImpactMediatise,
      p2iaIntegration: payload.p2iaIntegration || null,
    };
    setForm(enrichedForm);
    setWizardResponses(payload.responses);
    await runAnalysis(enrichedForm, {
      modeUtilise: payload.mode,
      responses: payload.responses,
      axeEleveSavoirVisualise: payload.axeEleveSavoirVisualise,
      valeurEthiqueGlobale: payload.valeurEthiqueGlobale,
      libelleQ1: payload.libelleQ1,
      libelleQ2: payload.libelleQ2,
      libelleQ3: payload.libelleQ3,
      libelleQ4: payload.libelleQ4,
      libelleQ5: payload.libelleQ5,
    });
  };

  const onAnalyseAdvanced = async () => {
    const missing = validateContext();
    if (missing) { setError('Merci de compléter tous les champs obligatoires.'); return; }
    await runAnalysis({ ...form, axeEleveSavoirVisualise: axeEleveVisualise }, { modeUtilise: 'avance' });
  };

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-6 grid lg:grid-cols-[1fr_1fr] gap-6 animate-fade">
      <div className="space-y-4">
        <div className="card p-6 space-y-4">
          <h2 className="text-xl font-semibold">Mon Diagnostic Personnel</h2>
          <p className="text-sm text-text-emphasized">Décrivez votre séance, puis positionnez votre pratique. Claude vous proposera trois recommandations contextualisées par le Cadre juin 2025.</p>

          <Field label="Niveau">
            <div className="px-3 py-2 rounded-lg bg-background-elevated border border-border text-sm text-text-emphasized">{niveau?.label}</div>
          </Field>
          <Field label="Discipline *">
            <input value={form.discipline} onChange={(e) => setField('discipline', e.target.value)} placeholder="Ex : Français, Mathématiques…" className="w-full bg-background-elevated text-text border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-teal" />
          </Field>
          <Field label="Type d'activité *">
            <input value={form.typeActivite} onChange={(e) => setField('typeActivite', e.target.value)} placeholder="Ex : Évaluation différenciée, atelier lecture…" className="w-full bg-background-elevated text-text border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-teal" />
          </Field>
          <Field label="Profil d'élève ciblé *">
            <input value={form.profilEleve} onChange={(e) => setField('profilEleve', e.target.value)} placeholder="Ex : groupe hétérogène, un élève en difficulté…" className="w-full bg-background-elevated text-text border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-teal" />
          </Field>
          <Field label="Objectif pédagogique *">
            <textarea value={form.objectif} onChange={(e) => setField('objectif', e.target.value)} rows={2} placeholder="Ex : Consolider la division euclidienne" className="w-full bg-background-elevated text-text border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-teal" />
          </Field>
        </div>

        <div className="card p-6">
          {!contextComplete && (
            <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.1)', borderLeft: '3px solid #F59E0B' }}>
              <p className="text-[13px] text-brand-amber-primary font-semibold mb-1">Avant de commencer</p>
              <p className="text-[13px] text-text-emphasized leading-relaxed">
                Complétez d'abord : <span className="font-semibold">{contextMissing.join(', ')}</span> (champs ci-dessus).
              </p>
            </div>
          )}
          <div className="mb-4 flex items-center gap-1 p-1 rounded-lg bg-background-elevated border border-border-subtle w-fit" role="tablist" aria-label="Mode de saisie">
            <button
              onClick={() => setMode('questionnaire')}
              role="tab"
              aria-selected={mode === 'questionnaire'}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition ${mode === 'questionnaire' ? 'bg-brand-teal-primary text-white' : 'text-text-secondary hover:text-text'}`}
            >
              <ListChecks size={13} /> Questionnaire
            </button>
            <button
              onClick={() => setMode('avance')}
              role="tab"
              aria-selected={mode === 'avance'}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition ${mode === 'avance' ? 'bg-brand-violet-primary text-white' : 'text-text-secondary hover:text-text'}`}
            >
              <Sliders size={13} /> Mode avancé
            </button>
          </div>

          {mode === 'questionnaire' ? (
            <>
              <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(20, 184, 166, 0.08)', borderLeft: '3px solid #14B8A6' }}>
                <p className="text-[13px] text-text-emphasized leading-relaxed">
                  Vous allez répondre à 5 questions courtes pour positionner l'IA dans cette séance. Chaque question propose 5 options qui décrivent des pratiques concrètes. Choisissez celle qui correspond le mieux à votre réalité — il n'y a pas de bonne ou de mauvaise réponse.
                </p>
              </div>
              <QuestionnaireWizard
                niveauId={niveauId}
                initialResponses={wizardResponses}
                onValidate={onValidateQuestionnaire}
                contextComplete={contextComplete}
                missingContextFields={contextMissing}
                loading={loading}
              />
            </>
          ) : (
            <>
              <div className="pt-2">
                <p className="text-xs uppercase tracking-wide text-text-emphasized font-semibold mb-3">Activation IA côté enseignant</p>
                <AxisSlider label="Enseignant–Savoir (préparation)" color="#14B8A6" value={form.axeEnseignantSavoir} onChange={(v) => setField('axeEnseignantSavoir', v)} onHelp={() => setHelpSlider(AIDE_SLIDERS.enseignantSavoir)} />
                <AxisSlider label="Enseignant–Élève (relation)" color="#F59E0B" value={form.axeEnseignantEleve} onChange={(v) => setField('axeEnseignantEleve', v)} onHelp={() => setHelpSlider(AIDE_SLIDERS.enseignantEleve)} />
              </div>

              <div className="pt-4 border-t border-border-subtle">
                <p className="text-xs uppercase tracking-wide text-text-emphasized font-semibold mb-3">Activation IA côté élève</p>
                <LockedOrPlafondSlider label="Élève–Savoir : manipulation d'IA générative" color="#8B5CF6" value={form.axeEleveSavoirManipulation} onChange={(v) => setField('axeEleveSavoirManipulation', v)} locked={manipulationLocked} plafond={manipulationPlafond} onHelp={() => setHelpSlider(AIDE_SLIDERS.eleveSavoirManipulation)} />
                {manipulationLocked && (
                  <div className="mb-4 p-3 rounded" style={{ background: 'rgba(245, 158, 11, 0.08)', borderLeft: '3px solid #F59E0B' }}>
                    <div className="flex gap-2 text-[13px] text-text-emphasized leading-relaxed">
                      <Lock size={14} className="shrink-0 mt-0.5 text-brand-amber-primary" />
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
                        <p className="text-text-emphasized">Au-delà de {manipulationPlafond}, vous décrivez un usage autonome par l'élève, non autorisé en 4e-3e selon le Cadre juin 2025.</p>
                      </div>
                    </div>
                  </div>
                )}
                <AxisSlider label="Élève–Savoir : impact médiatisé" color="#C4B5FD" value={form.axeEleveSavoirImpactMediatise} onChange={(v) => setField('axeEleveSavoirImpactMediatise', v)} onHelp={() => setHelpSlider(AIDE_SLIDERS.eleveSavoirImpactMediatise)} />
                <div className="mt-3 p-3 rounded-lg bg-background-elevated border border-border-subtle flex items-center justify-between">
                  <span className="text-xs text-text-emphasized">Axe Élève–Savoir visualisé (0.7 × manip + 0.3 × impact)</span>
                  <span className="font-mono font-bold text-brand-violet-primary">{axeEleveVisualise}/100</span>
                </div>
              </div>

              {warning && (
                <p className="mt-3 text-xs p-2 rounded bg-semantic-warning/10 text-brand-amber-primary flex items-start gap-2">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5" /> {warning}
                </p>
              )}

              <button onClick={onAnalyseAdvanced} disabled={loading} className="mt-4 w-full py-3 rounded-lg bg-brand-teal-primary text-white font-semibold hover:bg-brand-teal-text disabled:opacity-40 transition flex items-center justify-center gap-2">
                {loading ? <><Loader2 size={16} className="animate-spin" /> Analyse…</> : <><Sparkles size={16} /> Analyser mon diagnostic</>}
              </button>
            </>
          )}

          {loading && mode === 'questionnaire' && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-text-muted">
              <Loader2 size={14} className="animate-spin" /> Analyse en cours…
            </div>
          )}

          {error && <p className="mt-3 text-xs text-semantic-error">{error}</p>}
          {warning && mode === 'questionnaire' && (
            <p className="mt-3 text-xs p-2 rounded bg-semantic-warning/10 text-brand-amber-primary flex items-start gap-2">
              <AlertTriangle size={14} className="shrink-0 mt-0.5" /> {warning}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="card p-6" id="diagnostic-triangle">
          <Triangle
            axes={{ enseignantSavoir: form.axeEnseignantSavoir, enseignantEleve: form.axeEnseignantEleve, eleveSavoir: axeEleveVisualise }}
            ethicsValue={meanAxes}
            showPositioning={true}
          />
          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: zone.color }}></span>
            <span className="text-text-emphasized">Zone éthique estimée :</span>
            <span className="font-semibold" style={{ color: zone.color }}>{zone.label}</span>
          </div>
          <p className="mt-2 text-xs text-text-muted text-center max-w-md mx-auto leading-relaxed">
            Le <strong>point coloré</strong> indique le positionnement de votre pratique
            selon la pondération des trois axes. Sa <strong>couleur</strong> reprend
            celle de la zone éthique.
          </p>
        </div>

        {recommendations && (
          <div className="card p-6 space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2"><CheckCircle2 size={18} className="text-semantic-success" /> Recommandations</h3>
            {recommendations.recommandations?.map((r, i) => (
              <div key={i} className="p-3 rounded-lg bg-background-elevated border border-border-subtle">
                <p className="font-semibold text-brand-teal-primary text-sm mb-1">{i + 1}. {r.titre}</p>
                <p className="text-sm text-text-emphasized">{r.description}</p>
                {r.referenceCadre && <p className="text-[11px] italic text-brand-amber-primary mt-2">→ « {r.referenceCadre} »</p>}
              </div>
            ))}
            {recommendations.pointFort && (
              <p className="text-sm p-3 rounded-lg" style={{ background: 'rgba(16, 185, 129, 0.1)', borderLeft: '3px solid #10B981' }}>
                <strong className="text-semantic-success">Point fort : </strong>{recommendations.pointFort}
              </p>
            )}
            {recommendations.pointVigilance && (
              <p className="text-sm p-3 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.1)', borderLeft: '3px solid #F59E0B' }}>
                <strong className="text-brand-amber-primary">Vigilance : </strong>{recommendations.pointVigilance}
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
            <button onClick={onHelp} aria-label={`Aide sur ${label}`} className="text-text-muted hover:text-brand-teal-primary transition">
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
  return (
    <div className={`mb-3 ${locked ? 'opacity-60' : ''}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium" style={{ color: locked ? '#94A3B8' : color }}>{label}</span>
          {onHelp && (
            <button onClick={onHelp} aria-label={`Aide sur ${label}`} className="text-text-muted hover:text-brand-teal-primary transition">
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
            {hasPlafond && <span className="ml-1 text-[10px] uppercase">{value < 65 ? 'Encadré' : value < 85 ? 'Limite' : 'Hors cadre'}</span>}
          </span>
        )}
      </div>
      <input type="range" min="0" max="100" value={locked ? 0 : value} onChange={(e) => !locked && onChange(Number(e.target.value))} disabled={locked} aria-disabled={locked} className="w-full" style={{ accentColor: locked ? '#64748B' : overThreshold ? '#EF4444' : color, cursor: locked ? 'not-allowed' : 'pointer' }} />
    </div>
  );
}
