import { Sun, Moon } from 'lucide-react';
import { useApp } from '../contexts/AppContext.jsx';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useApp();
  return (
    <button
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-background text-text-secondary hover:text-text hover:border-brand-teal-primary transition ${className}`}
      aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
      title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
    >
      {theme === 'dark' ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
    </button>
  );
}
