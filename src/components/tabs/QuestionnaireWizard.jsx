import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Lock, AlertTriangle, Sparkles, Pencil } from 'lucide-react';
import { QUESTIONS, choixEtat, computeAxesFromResponses } from '../../data/questionnaire.js';

export default function QuestionnaireWizard({ niveauId, initialResponses = {}, onValidate, onSwitchAdvanced, contextComplete = true, missingContextFields = [], loading = false }) {
  const [responses, setResponses] = useState(initialResponses);
  const [index, setIndex] = useState(0);
  const [showRecap, setShowRecap] = useState(false);

  const q = QUESTIONS[index];
  const total = QUESTIONS.length;
  const progress = Math.round(((index + 1) / total) * 100);
  const selected = responses[q.id];

  const configInhabituelle = responses[3] === 1 && responses[4] === 5;

  const next = () => {
    if (index < total - 1) setIndex(index + 1);
    else setShowRecap(true);
  };
  const prev = () => {
    if (showRecap) setShowRecap(false);
    else if (index > 0) setIndex(index - 1);
  };

  const pickChoice = (choix) => {
    const etat = choixEtat(q, choix, niveauId);
    if (etat.state === 'locked') return;
    setResponses((r) => ({ ...r, [q.id]: choix.index }));
  };

  const allAnswered = QUESTIONS.every((qq) => responses[qq.id]);
  const axes = useMemo(() => allAnswered ? computeAxesFromResponses(responses, niveauId) : null, [responses, niveauId, allAnswered]);

  if (showRecap) {
    return (
      <Recap
        responses={responses}
        axes={axes}
        onModify={() => setShowRecap(false)}
        onValidate={() => onValidate({ ...axes, responses, mode: 'questionnaire' })}
        onSwitchAdvanced={onSwitchAdvanced}
        contextComplete={contextComplete}
        missingContextFields={missingContextFields}
        loading={loading}
      />
    );
  }

  return (
    <div>
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs uppercase tracking-wider text-text-muted font-semibold">Question {index + 1} sur {total}</p>
          <div className="flex items-center gap-2">
            {onSwitchAdvanced && (
              <button onClick={onSwitchAdvanced} className="text-[11px] text-text-muted hover:text-brand-teal-primary transition underline-offset-4 hover:underline" aria-label="Basculer en mode avancé (sliders)">
                Mode avancé →
              </button>
            )}
          </div>
        </div>
        <div className="h-1.5 rounded-full bg-background-elevated overflow-hidden">
          <div className="h-full bg-brand-teal transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-text mb-4">{q.enonce}</h3>

      <ul className="space-y-2 mb-4">
        {q.choix.map((c) => {
          const etat = choixEtat(q, c, niveauId);
          const isSelected = selected === c.index;
          const isLocked = etat.state === 'locked';
          const isWarning = etat.state === 'warning';
          return (
            <li key={c.index}>
              <button
                onClick={() => pickChoice(c)}
                disabled={isLocked}
                aria-disabled={isLocked}
                aria-pressed={isSelected}
                className={`w-full text-left p-4 rounded-lg border-2 transition flex items-start gap-3 ${
                  isLocked
                    ? 'opacity-50 cursor-not-allowed border-border-subtle'
                    : isSelected
                    ? 'border-brand-teal bg-background-elevated'
                    : isWarning
                    ? 'border-brand-amber/60 hover:border-brand-amber'
                    : 'border-border-subtle hover:border-brand-teal/60 hover:bg-background-elevated/50'
                }`}
              >
                <span className={`shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-brand-teal bg-brand-teal' : 'border-border-subtle'}`}>
                  {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                </span>
                <span className="flex-1 text-sm text-text-emphasized leading-relaxed">{c.libelle}</span>
                {isLocked && <Lock size={14} className="shrink-0 text-text-muted" />}
                {isWarning && !isLocked && <AlertTriangle size={14} className="shrink-0 text-brand-amber-primary" />}
              </button>
              {etat.alerte && (isSelected || isLocked) && (
                <div className={`mt-2 p-3 rounded text-[12px] leading-relaxed ${isLocked ? 'text-text-emphasized' : isWarning ? 'text-brand-amber-primary' : 'text-text-emphasized'}`} style={{ background: isWarning ? 'rgba(245, 158, 11, 0.08)' : 'rgba(139, 92, 246, 0.08)', borderLeft: `3px solid ${isWarning ? '#F59E0B' : '#8B5CF6'}` }}>
                  {etat.alerte}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {index === 3 && configInhabituelle && (
        <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.1)', borderLeft: '3px solid #F59E0B' }}>
          <p className="text-[13px] text-brand-amber-primary leading-relaxed">
            <strong>Configuration inhabituelle :</strong> l'élève ne manipule pas l'IA mais reçoit du contenu quasi entièrement généré par elle. Est-ce bien votre intention ? Si oui, continuez. Sinon, vous pouvez revenir en arrière.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <button
          onClick={prev}
          disabled={index === 0}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ArrowLeft size={14} /> Précédente
        </button>
        <button
          onClick={next}
          disabled={!selected}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-teal-primary text-white font-semibold text-sm hover:bg-brand-teal-text disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {index === total - 1 ? 'Voir la synthèse' : 'Suivante'} <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

function Recap({ responses, axes, onModify, onValidate, onSwitchAdvanced, contextComplete, missingContextFields, loading }) {
  const lines = [
    { label: 'Enseignant–Savoir (préparation)', value: axes.libelleQ1 },
    { label: 'Enseignant–Élève (relation)', value: axes.libelleQ2 },
    { label: 'Élève–Savoir — Manipulation directe', value: axes.libelleQ3 },
    { label: 'Élève–Savoir — Impact médiatisé', value: axes.libelleQ4 },
    { label: 'Validation éthique globale', value: axes.libelleQ5 },
  ];
  return (
    <div>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-wider text-text-muted font-semibold mb-2">Synthèse</p>
        <h3 className="text-lg font-semibold text-text">Résumé de vos réponses</h3>
        <p className="text-sm text-text-emphasized mt-1">Vérifiez votre positionnement avant l'analyse.</p>
      </div>

      <ul className="space-y-3 mb-6">
        {lines.map((l, i) => (
          <li key={i} className="p-3 rounded-lg bg-background-elevated border border-border-subtle">
            <p className="text-[11px] uppercase tracking-wider text-text-muted font-semibold mb-1">{l.label}</p>
            <p className="text-sm text-text-emphasized leading-relaxed">« {l.value} »</p>
          </li>
        ))}
      </ul>

      {!contextComplete && (
        <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.12)', borderLeft: '3px solid #F59E0B' }}>
          <p className="text-[13px] text-brand-amber-primary leading-relaxed font-semibold mb-1">Contexte incomplet</p>
          <p className="text-[13px] text-text-emphasized leading-relaxed">
            Remplissez les champs ci-dessus avant de lancer l'analyse :{' '}
            <span className="font-semibold">{missingContextFields.join(', ')}</span>.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 pt-4 border-t border-border-subtle flex-wrap">
        <button onClick={onModify} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text transition">
          <Pencil size={14} /> Modifier mes réponses
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onValidate}
            disabled={!contextComplete || loading}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-teal-primary text-white font-semibold text-sm hover:bg-brand-teal-text disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {loading ? <>Analyse…</> : <><Sparkles size={14} /> Analyser mon diagnostic</>}
          </button>
        </div>
      </div>
    </div>
  );
}
