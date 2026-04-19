import { useState } from 'react';
import { ArrowRight, School, BookOpen, BookMarked, GraduationCap, Info } from 'lucide-react';
import { NIVEAUX, CONTENU_ACCUEIL } from '../data/niveaux.js';
import { useApp } from '../contexts/AppContext.jsx';
import { TriangleHoussayeBase, TriangleAugmenteIA } from './accueil/SVG_Triangles_Accueil.jsx';
import AboutModale from './accueil/AboutModale.jsx';

const NIVEAU_ICONS = {
  primaire: School,
  college_6_5: BookOpen,
  college_4_3: BookMarked,
  lycee_sup: GraduationCap,
};

const NIVEAU_DESCRIPTIONS = {
  primaire: "IA réservée à l'enseignant, pas de manipulation élève.",
  college_6_5: "IA professionnelle, élèves non utilisateurs.",
  college_4_3: "Usage encadré autorisé à partir de la 4e.",
  lycee_sup: "Usage autonome dans un cadre défini.",
};

export default function Accueil() {
  const { chooseNiveau } = useApp();
  const [modaleOpen, setModaleOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen px-4 md:px-6 py-8 md:py-12 animate-fade">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8" style={{ animation: 'fadeIn 0.4s ease-out both' }}>
            <div className="flex flex-col items-center gap-3 mb-4">
              <img
                src="/avatar-mpb.png"
                alt="Avatar MaProfBranchee"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-brand-teal-light/40 shadow-lg"
              />
              <p className="text-xs uppercase tracking-[0.2em] text-brand-teal-light">MaProfBranchee</p>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 text-text">
              Triangle Pédagogique <span className="text-brand-teal">Augmenté</span>
            </h1>
            <p className="text-base md:text-lg text-text-secondary italic">
              {CONTENU_ACCUEIL.baseline}
            </p>
          </header>

          <section aria-labelledby="comprendre-title" className="mb-10" style={{ animation: 'fadeIn 0.4s 200ms ease-out both' }}>
            <h2 id="comprendre-title" className="text-xs uppercase tracking-[0.2em] text-slate-200 opacity-90 text-center mb-5">
              Comprendre en 30 secondes
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              <article className="card p-5 md:p-6 grid md:grid-cols-[1fr_200px] gap-5" style={{ borderLeft: '3px solid #14B8A6' }}>
                <div>
                  <h3 className="text-lg font-semibold text-brand-teal-light mb-3">{CONTENU_ACCUEIL.blocHoussaye.titre}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{CONTENU_ACCUEIL.blocHoussaye.texte}</p>
                </div>
                <div className="flex items-center justify-center"><TriangleHoussayeBase /></div>
              </article>

              <article className="card p-5 md:p-6 grid md:grid-cols-[1fr_200px] gap-5" style={{ borderLeft: '3px solid #8B5CF6' }}>
                <div>
                  <h3 className="text-lg font-semibold text-brand-violet-light mb-3">{CONTENU_ACCUEIL.blocAugmentation.titre}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{CONTENU_ACCUEIL.blocAugmentation.texte}</p>
                </div>
                <div className="flex items-center justify-center"><TriangleAugmenteIA /></div>
              </article>
            </div>

            <div className="text-center mt-4">
              <button
                onClick={() => setModaleOpen(true)}
                className="inline-flex items-center gap-2 text-sm text-brand-teal-light hover:text-brand-teal transition underline-offset-4 hover:underline"
                aria-label="Ouvrir les détails du cadre théorique"
              >
                <Info size={14} strokeWidth={1.75} />
                En savoir plus sur Houssaye et le cadre théorique
              </button>
            </div>
          </section>

          <section style={{ animation: 'fadeIn 0.4s 400ms ease-out both' }}>
            <div className="text-center mb-5">
              <h2 className="text-lg md:text-xl font-semibold text-text mb-1">Choisir mon niveau scolaire pour commencer l'exploration</h2>
              <p className="text-sm text-text-muted">Primaire, Collège, Lycée — l'outil s'adapte à votre contexte</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {NIVEAUX.map((n) => {
                const Icon = NIVEAU_ICONS[n.id];
                return (
                  <button
                    key={n.id}
                    onClick={() => chooseNiveau(n.id)}
                    className="card p-5 text-left transition hover:border-brand-teal hover:bg-background-elevated hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(20,184,166,0.15)] group"
                    aria-label={`Explorer le niveau ${n.label}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-11 h-11 rounded-lg bg-brand-teal/10 flex items-center justify-center text-brand-teal-light">
                        <Icon size={22} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-text">{n.label}</h3>
                        <p className="text-xs text-text-emphasized mt-0.5">{NIVEAU_DESCRIPTIONS[n.id]}</p>
                      </div>
                      <ArrowRight size={18} className="shrink-0 text-text-muted group-hover:text-brand-teal-light transition" />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {modaleOpen && <AboutModale onClose={() => setModaleOpen(false)} />}
    </>
  );
}
