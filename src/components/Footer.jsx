import mentionCfg from '../config/mention-recherche-action.json';
import { useApp } from '../contexts/AppContext.jsx';

export default function Footer() {
  const { appScreen, setAppScreen } = useApp();
  const onAbout = appScreen === 'apropos';

  const goAbout = (e) => {
    e.preventDefault();
    setAppScreen('apropos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer role="contentinfo" aria-label="Informations sur la démarche" className="mt-12 border-t" style={{ borderColor: '#475569', background: '#1E293B' }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-5 space-y-2">
        <p className="text-sm text-text-secondary flex items-center gap-2 flex-wrap">
          <span
            className="inline-block rounded-full border text-[11px] font-medium tracking-[0.025em]"
            style={{
              padding: '2px 10px',
              background: 'rgba(139, 92, 246, 0.15)',
              color: '#C4B5FD',
              borderColor: 'rgba(139, 92, 246, 0.3)',
            }}
          >
            Artefact de recherche-action
          </span>
          <span>{mentionCfg.marque} — {mentionCfg.auteure}</span>
        </p>
        <p className="text-sm text-text-secondary">
          Application alignée sur le{' '}
          <a href={mentionCfg.cadreUrl} target="_blank" rel="noopener noreferrer" className="text-brand-teal-light hover:text-brand-teal transition hover:underline underline-offset-4">
            Cadre d'usage de l'IA en éducation
          </a>
          {' '}— Ministère de l'Éducation nationale, juin 2025
        </p>
        <p className="text-sm text-text-secondary flex flex-wrap gap-x-2 gap-y-1">
          {!onAbout && (
            <>
              <a href="#a-propos" onClick={goAbout} className="text-brand-teal-light hover:text-brand-teal transition hover:underline underline-offset-4">
                En savoir plus sur la démarche
              </a>
              <span aria-hidden="true" className="text-text-muted">·</span>
            </>
          )}
          <a href={mentionCfg.blogUrl} target="_blank" rel="noopener noreferrer" className="text-brand-teal-light hover:text-brand-teal transition hover:underline underline-offset-4">
            Blog {mentionCfg.marque}
          </a>
        </p>
      </div>
    </footer>
  );
}
