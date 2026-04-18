import { useEffect } from 'react';
import { X } from 'lucide-react';
import { CONTENU_ACCUEIL } from '../../data/niveaux.js';

export default function AboutModale({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-title"
    >
      <div
        className="card-elevated max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-background-elevated">
          <h2 id="about-title" className="text-lg font-semibold text-brand-teal-light">{CONTENU_ACCUEIL.modaleDetail.titre}</h2>
          <button onClick={onClose} aria-label="Fermer la modale" className="text-text-muted hover:text-text transition"><X size={20} /></button>
        </div>
        <div className="overflow-y-auto p-6">
          <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
            {CONTENU_ACCUEIL.modaleDetail.texte}
          </p>
          <p className="text-xs text-text-muted mt-5 pt-4 border-t border-background-elevated">
            Référence : Houssaye, J. (1988). <em>Le triangle pédagogique</em>. Peter Lang.
          </p>
        </div>
      </div>
    </div>
  );
}
