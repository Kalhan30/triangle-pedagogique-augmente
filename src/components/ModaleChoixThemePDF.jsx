import { useEffect, useState } from 'react';
import { X, Sun, Moon } from 'lucide-react';

const STORAGE_KEY = 'pdfTheme';

export default function ModaleChoixThemePDF({ onChoice, onClose }) {
  const [preferred, setPreferred] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || 'light'; } catch { return 'light'; }
  });

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const handlePick = (theme) => {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* noop */ }
    onChoice(theme);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[rgba(15,23,42,0.5)] backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-theme-title"
    >
      <div
        className="max-w-sm w-full rounded-xl p-5 bg-white card-elevated"
        style={{ background: 'rgb(var(--bg-card))' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 id="pdf-theme-title" className="text-base font-semibold text-text">Choisir le thème du PDF</h2>
          <button onClick={onClose} aria-label="Fermer" className="text-text-muted hover:text-text transition"><X size={18} /></button>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed mb-4">
          Le mode clair est recommandé pour l'impression et le partage institutionnel. Le mode sombre reproduit l'esthétique de l'application.
        </p>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            onClick={() => handlePick('light')}
            className={`p-3 rounded-lg border-2 text-left transition ${preferred === 'light' ? 'border-brand-teal-primary bg-brand-teal-light' : 'border-border hover:border-brand-teal-primary'}`}
            aria-pressed={preferred === 'light'}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Sun size={16} strokeWidth={1.8} className="text-brand-amber-primary" />
              <span className="text-sm font-semibold text-text">Mode clair</span>
            </div>
            <span className="text-[11px] font-semibold text-brand-amber-primary uppercase tracking-wide">Recommandé</span>
          </button>
          <button
            onClick={() => handlePick('dark')}
            className={`p-3 rounded-lg border-2 text-left transition ${preferred === 'dark' ? 'border-brand-teal-primary bg-brand-teal-light' : 'border-border hover:border-brand-teal-primary'}`}
            aria-pressed={preferred === 'dark'}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Moon size={16} strokeWidth={1.8} className="text-brand-violet-primary" />
              <span className="text-sm font-semibold text-text">Mode sombre</span>
            </div>
            <span className="text-[11px] text-text-muted uppercase tracking-wide">Esthétique app</span>
          </button>
        </div>

        <button onClick={onClose} className="w-full py-2 text-xs text-text-muted hover:text-text transition underline-offset-4 hover:underline">
          Annuler
        </button>
      </div>
    </div>
  );
}
