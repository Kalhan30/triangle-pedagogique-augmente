import { ArrowRight, School, BookOpen, BookMarked, GraduationCap } from 'lucide-react';
import { NIVEAUX } from '../data/niveaux.js';
import { useApp } from '../contexts/AppContext.jsx';

const NIVEAU_ICONS = {
  primaire: School,
  college_6_5: BookOpen,
  college_4_3: BookMarked,
  lycee_sup: GraduationCap,
};

export default function Accueil() {
  const { setNiveauId, setActiveTab } = useApp();

  const chooseNiveau = (id) => {
    setNiveauId(id);
    setActiveTab('explorer');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 animate-fade">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <div className="flex flex-col items-center gap-3 mb-4">
            <img
              src="/avatar-mpb.png"
              alt="Avatar MaProfBranchee"
              className="w-20 h-20 rounded-full object-cover ring-2 ring-brand-teal-light/40 shadow-lg"
            />
            <p className="text-sm uppercase tracking-[0.2em] text-brand-teal-light">MaProfBranchee</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text">
            Triangle Pédagogique <span className="text-brand-teal">Augmenté</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            L'IA en périphérie, l'humain au cœur. Un outil de réflexivité pour positionner l'IA dans votre pratique pédagogique.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {NIVEAUX.map((n) => {
            const Icon = NIVEAU_ICONS[n.id];
            return (
              <button
                key={n.id}
                onClick={() => chooseNiveau(n.id)}
                className="card p-6 text-left transition hover:border-brand-teal hover:bg-background-elevated focus-visible:border-brand-teal-light group"
                aria-label={`Explorer le niveau ${n.label}`}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-brand-teal/10 flex items-center justify-center text-brand-teal-light">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-text mb-1">{n.label}</h2>
                    <p className="text-sm text-text-secondary leading-snug">{n.citation}</p>
                  </div>
                  <ArrowRight size={18} className="shrink-0 text-text-muted group-hover:text-brand-teal-light transition" />
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-center text-sm text-text-muted">
          Choisissez un niveau pour commencer l'exploration.
        </p>
      </div>
    </main>
  );
}
