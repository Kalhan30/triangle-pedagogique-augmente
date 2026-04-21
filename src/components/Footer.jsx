import { Mail, ArrowRight } from 'lucide-react';
import mentionCfg from '../config/mention-recherche-action.json';
import { useApp } from '../contexts/AppContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const ARTICLE_URL = 'https://maprofbranchee.fr/le-triangle-pedagogique-augmente-par-lia-une-nouvelle-grammaire-de-lapprentissage/';
const AIA_URL = 'https://maprofbranchee.fr/ia-en-education/';
const CC_URL = 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr';

export default function Footer() {
  const { appScreen, setAppScreen } = useApp();
  const onAbout = appScreen === 'apropos';

  const goAbout = (e) => {
    e.preventDefault();
    setAppScreen('apropos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="app-footer" role="contentinfo" aria-label="Informations sur la démarche">
      {/* Bloc 1 : Identité + Badge AIA */}
      <div className="footer-identity">
        <div className="footer-profile">
          <div className="footer-avatar">
            <img src="/avatar-mpb.png" alt={`Portrait de ${mentionCfg.auteure}`} />
          </div>
          <div className="footer-profile-text">
            <div className="footer-name">{mentionCfg.marque}</div>
            <div className="footer-subtitle">{mentionCfg.auteure} · Enseignante CE2 &amp; ERUN</div>
          </div>
        </div>
        <a
          href={AIA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-aia-badge"
          title="Contenu assisté par IA — Vérifié et validé par l'auteure"
        >
          <span className="footer-aia-dot" aria-hidden="true"></span>
          <span>AIA — Transparence IA</span>
        </a>
      </div>

      {/* Bloc 2 : Tagline */}
      <div className="footer-tagline">« Un numérique au service de l'humain. »</div>

      {/* Bloc 3 : Pastilles de garantie */}
      <div className="footer-guarantees">
        <div className="footer-guarantee">
          <span className="footer-pill footer-pill-green" aria-hidden="true"></span>
          <span>Testé en classe</span>
        </div>
        <div className="footer-guarantee">
          <span className="footer-pill footer-pill-teal" aria-hidden="true"></span>
          <span>Sélection vérifiée</span>
        </div>
        <div className="footer-guarantee">
          <span className="footer-pill footer-pill-violet" aria-hidden="true"></span>
          <span>Conforme RGPD</span>
        </div>
      </div>

      {/* Bloc CTA : Participer à la recherche-action */}
      {mentionCfg.formulaireRetourUrl && (
        <a
          href={mentionCfg.formulaireRetourUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-feedback-cta"
        >
          <span className="footer-feedback-icon" aria-hidden="true">
            <Mail size={18} strokeWidth={1.75} />
          </span>
          <span className="footer-feedback-text">
            <strong>Votre regard fait avancer la recherche</strong>
            <span>Enseignant·e, formateur·trice, cadre pédagogique ? Partagez votre retour d'usage — 2 minutes, en toute confiance.</span>
          </span>
          <ArrowRight size={16} strokeWidth={1.75} className="footer-feedback-arrow" aria-hidden="true" />
        </a>
      )}

      {/* Bloc 4 : Badge Artefact de recherche-action */}
      <div className="footer-research-badge">
        <span className="footer-research-pill">Artefact de recherche-action</span>
        <span className="footer-research-author">{mentionCfg.marque} — {mentionCfg.auteure}</span>
      </div>

      {/* Bloc 5 : Mention Cadre juin 2025 */}
      <div className="footer-cadre-mention">
        Application alignée sur le{' '}
        <a href={mentionCfg.cadreUrl} target="_blank" rel="noopener noreferrer">
          Cadre d'usage de l'IA en éducation
        </a>
        {' '}— Ministère de l'Éducation nationale, juin 2025
      </div>

      {/* Bloc 6 : Liens secondaires */}
      <div className="footer-links">
        {!onAbout && (
          <>
            <a href="#a-propos" onClick={goAbout}>En savoir plus sur la démarche</a>
            <span className="footer-separator" aria-hidden="true">·</span>
          </>
        )}
        <a href={mentionCfg.blogUrl} target="_blank" rel="noopener noreferrer">
          Blog {mentionCfg.marque} <span className="footer-external" aria-hidden="true">↗</span>
        </a>
        <span className="footer-separator" aria-hidden="true">·</span>
        <a href={ARTICLE_URL} target="_blank" rel="noopener noreferrer">
          Article de référence sur le modèle <span className="footer-external" aria-hidden="true">↗</span>
        </a>
      </div>

      {/* Bloc 7 : Licence + Toggle de thème */}
      <div className="footer-bottom">
        <div className="footer-license">
          Contenu sous licence{' '}
          <a href={CC_URL} target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>
          {' '}· © 2026 {mentionCfg.marque}
        </div>
        <ThemeToggle variant="labeled" />
      </div>
    </footer>
  );
}
