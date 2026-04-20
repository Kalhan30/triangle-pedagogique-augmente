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
      <main className="min-h-screen px-4 md:px-6 py-10 md:py-14 animate-fade">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-10" style={{ animation: 'fadeIn 0.4s ease-out both' }}>
            <div className="flex flex-col items-center gap-3 mb-5">
              <img
                src="/avatar-mpb.png"
                alt="Avatar MaProfBranchee"
                className="w-20 h-20 rounded-full object-cover ring-2 ring-brand-teal-primary/20 shadow-md"
              />
              <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-muted">MaProfBranchee</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-text tracking-tight">
              Triangle Pédagogique <span className="text-brand-teal-primary">Augmenté</span>
            </h1>
            <p className="text-base md:text-lg text-text-secondary italic font-serif-editorial">
              {CONTENU_ACCUEIL.baseline}
            </p>
          </header>

          <section aria-labelledby="comprendre-title" className="mb-12" style={{ animation: 'fadeIn 0.4s 200ms ease-out both' }}>
            <h2 id="comprendre-title" className="text-xs uppercase tracking-[0.2em] text-text-muted text-center mb-6 font-medium">
              Comprendre en 30 secondes
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              <article className="card p-5 md:p-6 grid md:grid-cols-[1fr_200px] gap-5" style={{ borderLeft: '3px solid #0F766E' }}>
                <div>
                  <h3 className="text-lg font-semibold text-brand-teal-primary mb-3">{CONTENU_ACCUEIL.blocHoussaye.titre}</h3>
                  <p className="text-sm text-text leading-relaxed">{CONTENU_ACCUEIL.blocHoussaye.texte}</p>
                </div>
                <div className="flex items-center justify-center"><TriangleHoussayeBase /></div>
              </article>

              <article className="card p-5 md:p-6 grid md:grid-cols-[1fr_200px] gap-5" style={{ borderLeft: '3px solid #7C3AED' }}>
                <div>
                  <h3 className="text-lg font-semibold text-brand-violet-primary mb-3">{CONTENU_ACCUEIL.blocAugmentation.titre}</h3>
                  <p className="text-sm text-text leading-relaxed">{CONTENU_ACCUEIL.blocAugmentation.texte}</p>
                </div>
                <div className="flex items-center justify-center"><TriangleAugmenteIA /></div>
              </article>
            </div>

            <div className="text-center mt-5">
              <button
                onClick={() => setModaleOpen(true)}
                className="inline-flex items-center gap-2 text-sm text-brand-teal-primary hover:text-brand-teal-text transition underline-offset-4 hover:underline"
                aria-label="Ouvrir les détails du cadre théorique"
              >
                <Info size={14} strokeWidth={1.75} />
                En savoir plus sur Houssaye et le cadre théorique
              </button>
            </div>
          </section>

          <section style={{ animation: 'fadeIn 0.4s 400ms ease-out both' }}>
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-text mb-1 tracking-tight">Choisir mon niveau scolaire pour commencer l'exploration</h2>
              <p className="text-sm text-text-muted">Primaire, Collège, Lycée — l'outil s'adapte à votre contexte</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {NIVEAUX.map((n) => {
                const Icon = NIVEAU_ICONS[n.id];
                return (
                  <button
                    key={n.id}
                    onClick={() => chooseNiveau(n.id)}
                    className="card p-5 text-left transition-all hover:shadow-lg hover:-translate-y-0.5 group"
                    aria-label={`Explorer le niveau ${n.label}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-11 h-11 rounded-lg bg-brand-teal-light flex items-center justify-center text-brand-teal-primary">
                        <Icon size={22} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-text">{n.label}</h3>
                        <p className="text-[13px] text-text-secondary mt-0.5">{NIVEAU_DESCRIPTIONS[n.id]}</p>
                      </div>
                      <ArrowRight size={18} className="shrink-0 text-text-muted group-hover:text-brand-teal-primary transition" />
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
