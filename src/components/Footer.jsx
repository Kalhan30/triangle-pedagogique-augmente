import { ExternalLink } from 'lucide-react';
import mentionCfg from '../config/mention-recherche-action.json';
import { useApp } from '../contexts/AppContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const ARTICLE_URL = 'https://maprofbranchee.fr/le-triangle-pedagogique-augmente-par-lia-une-nouvelle-grammaire-de-lapprentissage/';

export default function Footer() {
  const { appScreen, setAppScreen } = useApp();
  const onAbout = appScreen === 'apropos';

  const goAbout = (e) => {
    e.preventDefault();
    setAppScreen('apropos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      role="contentinfo"
      aria-label="Informations sur la démarche"
      className="mt-12 border-t"
      style={{ borderColor: 'var(--border-subtle)', background: 'rgb(var(--bg-card))' }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div className="space-y-2 min-w-0">
          <p className="text-sm text-text-secondary flex items-center gap-2 flex-wrap">
            <span
              className="inline-block rounded-full border text-[11px] font-medium tracking-[0.025em]"
              style={{
                padding: '2px 10px',
                background: 'rgb(var(--violet-light))',
                color: 'rgb(var(--violet-text))',
                borderColor: 'rgba(124, 58, 237, 0.3)',
              }}
            >
              Artefact de recherche-action
            </span>
            <span>{mentionCfg.marque} — {mentionCfg.auteure}</span>
          </p>
          <p className="text-sm text-text-secondary">
            Application alignée sur le{' '}
            <a href={mentionCfg.cadreUrl} target="_blank" rel="noopener noreferrer" className="text-brand-teal-primary hover:underline underline-offset-4">
              Cadre d'usage de l'IA en éducation
            </a>
            {' '}— Ministère de l'Éducation nationale, juin 2025
          </p>
          <p className="text-sm text-text-secondary flex flex-wrap gap-x-2 gap-y-1 items-center">
            {!onAbout && (
              <>
                <a href="#a-propos" onClick={goAbout} className="text-brand-teal-primary hover:underline underline-offset-4">
                  En savoir plus sur la démarche
                </a>
                <span aria-hidden="true" className="text-text-muted">·</span>
              </>
            )}
            <a href={mentionCfg.blogUrl} target="_blank" rel="noopener noreferrer" className="text-brand-teal-primary hover:underline underline-offset-4 inline-flex items-center gap-1">
              Blog {mentionCfg.marque}
              <ExternalLink size={10} />
            </a>
            <span aria-hidden="true" className="text-text-muted">·</span>
            <a href={ARTICLE_URL} target="_blank" rel="noopener noreferrer" className="text-brand-teal-primary hover:underline underline-offset-4 inline-flex items-center gap-1">
              Article de référence sur le modèle
              <ExternalLink size={10} />
            </a>
          </p>
        </div>

        <div className="shrink-0">
          <ThemeToggle variant="labeled" />
        </div>
      </div>
    </footer>
  );
}
