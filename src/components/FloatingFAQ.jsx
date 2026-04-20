import { useState } from 'react';
import { HelpCircle, X, ChevronDown } from 'lucide-react';
import { FAQ_ENTRIES } from '../data/faq.js';

export default function FloatingFAQ() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-brand-teal-primary text-white shadow-lg hover:bg-brand-teal-text transition flex items-center justify-center"
        aria-label="Ouvrir la FAQ"
      >
        <HelpCircle size={24} strokeWidth={1.75} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(15,23,42,0.5)] backdrop-blur-sm animate-fade"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-label="Foire aux questions"
        >
          <div
            className="card-elevated max-w-xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-border-subtle">
              <h2 className="text-lg font-semibold text-text flex items-center gap-2"><HelpCircle size={20} className="text-brand-teal-primary" /> Foire aux questions</h2>
              <button onClick={() => setOpen(false)} aria-label="Fermer" className="text-text-muted hover:text-text"><X size={20} /></button>
            </div>
            <ul className="overflow-y-auto divide-y divide-border-subtle">
              {[...FAQ_ENTRIES].sort((a, b) => a.ordre - b.ordre).map((f) => {
                const isOpen = expanded === f.id;
                return (
                  <li key={f.id}>
                    <button
                      onClick={() => setExpanded(isOpen ? null : f.id)}
                      className="w-full p-4 text-left flex items-start gap-3 hover:bg-background-elevated transition"
                      aria-expanded={isOpen}
                    >
                      <ChevronDown size={16} className={`shrink-0 mt-1 text-text-muted transition ${isOpen ? 'rotate-180 text-brand-teal-primary' : ''}`} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-text mb-1">{f.question}</p>
                        {isOpen && <p className="text-sm text-text-secondary leading-relaxed">{f.reponse}</p>}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
