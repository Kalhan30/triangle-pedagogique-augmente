import { ChevronDown, ArrowLeft, Download, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { NIVEAUX, getNiveau } from '../data/niveaux.js';
import { useApp } from '../contexts/AppContext.jsx';

export default function Header({ onExport }) {
  const { niveauId, setNiveauId, resetToAccueil, setAppScreen, theme, toggleTheme } = useApp();
  const [open, setOpen] = useState(false);
  const niveau = getNiveau(niveauId);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-3">
        <button
          onClick={resetToAccueil}
          className="flex items-center gap-2 text-text-secondary hover:text-text transition"
          aria-label="Retour à l'accueil"
        >
          <ArrowLeft size={18} />
          <img src="/avatar-mpb.png" alt="MaProfBranchee" className="w-7 h-7 rounded-full object-cover ring-1 ring-brand-teal-primary/30" />
          <span className="hidden sm:inline text-sm font-semibold text-text">MaProfBranchee</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background hover:border-brand-teal-primary transition text-sm text-text"
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <span className="font-semibold">{niveau?.label || 'Choisir un niveau'}</span>
            <ChevronDown size={16} className={`transition ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <ul
              className="absolute right-0 mt-2 w-72 rounded-lg border border-border-subtle bg-white shadow-lg z-50 py-1 max-h-80 overflow-auto"
              role="listbox"
            >
              {NIVEAUX.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => { setNiveauId(n.id); setOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-background-elevated ${niveauId === n.id ? 'text-brand-teal-primary font-semibold' : 'text-text'}`}
                    role="option"
                    aria-selected={niveauId === n.id}
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-background text-text-secondary hover:text-text hover:border-brand-teal-primary transition"
            aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
          >
            {theme === 'dark' ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
          </button>
          <button
            onClick={() => setAppScreen('apropos')}
            className="hidden md:inline-flex items-center gap-1 px-2 py-2 rounded-lg text-text-secondary hover:text-text transition text-sm"
            aria-label="À propos de la démarche"
          >
            À propos
          </button>
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-teal-primary text-white font-semibold hover:bg-brand-teal-text transition text-sm"
            aria-label="Exporter ma fiche PDF"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Exporter</span>
          </button>
        </div>
      </div>
    </header>
  );
}
