import { Sun, Moon } from 'lucide-react';
import { useApp } from '../contexts/AppContext.jsx';

export default function ThemeToggle({ variant = 'icon', className = '' }) {
  const { theme, setTheme, toggleTheme } = useApp();

  if (variant === 'labeled') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-[11px] uppercase tracking-[0.05em] font-medium text-text-secondary">Thème</span>
        <div
          role="group"
          aria-label="Choisir le thème"
          className="inline-flex items-stretch rounded-lg overflow-hidden"
          style={{ border: '0.5px solid var(--border-normal)' }}
        >
          <button
            type="button"
            onClick={() => setTheme('light')}
            aria-pressed={theme === 'light'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition ${
              theme === 'light'
                ? 'bg-brand-teal-primary text-white'
                : 'bg-transparent text-text-secondary hover:bg-background-elevated hover:text-text'
            }`}
          >
            <Sun size={14} strokeWidth={1.8} /> Clair
          </button>
          <button
            type="button"
            onClick={() => setTheme('dark')}
            aria-pressed={theme === 'dark'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition ${
              theme === 'dark'
                ? 'bg-brand-teal-primary text-white'
                : 'bg-transparent text-text-secondary hover:bg-background-elevated hover:text-text'
            }`}
          >
            <Moon size={14} strokeWidth={1.8} /> Sombre
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Basculer en mode clair' : 'Basculer en mode sombre'}
      aria-pressed={theme === 'dark'}
      title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-background text-text-secondary hover:text-text hover:bg-background-elevated hover:border-brand-teal-primary transition ${className}`}
    >
      <span className="inline-block transition-transform duration-300" style={{ transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(0deg)' }}>
        {theme === 'dark' ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
      </span>
    </button>
  );
}
