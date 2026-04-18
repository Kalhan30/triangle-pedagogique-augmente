import { ChevronDown, ArrowLeft, Download } from 'lucide-react';
import { useState } from 'react';
import { NIVEAUX, getNiveau } from '../data/niveaux.js';
import { useApp } from '../contexts/AppContext.jsx';

export default function Header({ onExport }) {
  const { niveauId, setNiveauId, setActiveTab } = useApp();
  const [open, setOpen] = useState(false);
  const niveau = getNiveau(niveauId);

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-background-elevated">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-3">
        <button
          onClick={() => { setNiveauId(null); setActiveTab('explorer'); }}
          className="flex items-center gap-2 text-text-secondary hover:text-text transition"
          aria-label="Retour à l'accueil"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline text-sm">Accueil</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-background-elevated hover:border-brand-teal transition text-sm"
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <span className="font-semibold">{niveau?.label || 'Choisir un niveau'}</span>
            <ChevronDown size={16} className={`transition ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <ul
              className="absolute right-0 mt-2 w-72 rounded-lg border border-background-elevated bg-background-secondary shadow-lg z-50 py-1 max-h-80 overflow-auto"
              role="listbox"
            >
              {NIVEAUX.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => { setNiveauId(n.id); setOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-background-elevated ${niveauId === n.id ? 'text-brand-teal-light' : 'text-text'}`}
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

        <button
          onClick={onExport}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-teal text-background font-semibold hover:bg-brand-teal-light transition text-sm"
          aria-label="Exporter ma fiche PDF"
        >
          <Download size={16} />
          <span className="hidden sm:inline">Exporter</span>
        </button>
      </div>
    </header>
  );
}
