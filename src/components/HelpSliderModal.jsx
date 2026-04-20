import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function HelpSliderModal({ aide, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!aide) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[rgba(15,23,42,0.5)] backdrop-blur-sm animate-fade"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-title"
    >
      <div
        className="max-w-lg w-full rounded-xl p-6 bg-white"
        style={{ border: '1px solid rgba(15, 23, 42, 0.12)', boxShadow: '0 4px 6px rgba(15,23,42,0.07), 0 2px 4px rgba(15,23,42,0.05)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 id="help-title" className="text-base font-semibold text-brand-teal-primary">{aide.titre}</h2>
          <button onClick={onClose} aria-label="Fermer" className="text-text-muted hover:text-text transition"><X size={20} /></button>
        </div>
        <p className="text-sm text-text leading-relaxed mb-4">{aide.description}</p>
        <p className="text-[11px] uppercase tracking-wider font-semibold text-text-muted mb-2">Repères</p>
        <ul className="space-y-2 mb-3">
          {aide.reperes.map((r, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="font-mono text-brand-teal-primary min-w-[54px]">— {r.plage}</span>
              <span className="text-text leading-snug">{r.texte}</span>
            </li>
          ))}
        </ul>
        {aide.rappel && (
          <p className="text-xs italic p-3 rounded-lg" style={{ background: '#FEF3E6', color: '#854F0B', borderLeft: '3px solid #D97706' }}>
            {aide.rappel}
          </p>
        )}
      </div>
    </div>
  );
}
