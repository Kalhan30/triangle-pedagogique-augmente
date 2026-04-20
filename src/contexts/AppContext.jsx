import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

const STORAGE_KEY = 'triangle-v2:diagnostic';
const THEME_KEY = 'triangle-v2:theme';

function readInitialTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  } catch {
    /* noop */
  }
  return 'light';
}

function migrateDiagnostic(raw) {
  if (!raw) return null;
  if ('axeEleveSavoirManipulation' in raw) return raw;
  const eleveLegacy = typeof raw.axeEleveSavoir === 'number' ? raw.axeEleveSavoir : 50;
  return {
    ...raw,
    axeEleveSavoirManipulation: 0,
    axeEleveSavoirImpactMediatise: eleveLegacy,
  };
}

export function AppProvider({ children }) {
  const [appScreen, setAppScreen] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#a-propos') return 'apropos';
    return 'accueil';
  });
  const [niveauId, setNiveauId] = useState(null);
  const [activeTab, setActiveTab] = useState('explorer');
  const [diagnostic, setDiagnostic] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? migrateDiagnostic(JSON.parse(raw)) : null;
    } catch {
      return null;
    }
  });
  const [ethicsValue, setEthicsValue] = useState(40);
  const [theme, setThemeState] = useState(() => (typeof window !== 'undefined' ? readInitialTheme() : 'light'));

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* noop */ }
  }, [theme]);

  const setTheme = (t) => setThemeState(t === 'dark' ? 'dark' : 'light');
  const toggleTheme = () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    try {
      if (diagnostic) localStorage.setItem(STORAGE_KEY, JSON.stringify(diagnostic));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  }, [diagnostic]);

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === '#a-propos') setAppScreen('apropos');
      else if (appScreen === 'apropos') setAppScreen(niveauId ? 'tabs' : 'accueil');
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [appScreen, niveauId]);

  const navigate = (screen) => {
    if (screen === 'apropos') {
      window.history.pushState(null, '', '#a-propos');
    } else if (window.location.hash === '#a-propos') {
      window.history.pushState(null, '', window.location.pathname);
    }
    setAppScreen(screen);
  };

  const chooseNiveau = (id) => {
    setNiveauId(id);
    setActiveTab('explorer');
    navigate('tabs');
  };

  const resetToAccueil = () => {
    setNiveauId(null);
    setActiveTab('explorer');
    navigate('accueil');
  };

  const value = useMemo(
    () => ({
      appScreen,
      setAppScreen: navigate,
      niveauId,
      setNiveauId,
      chooseNiveau,
      resetToAccueil,
      activeTab,
      setActiveTab,
      diagnostic,
      setDiagnostic,
      ethicsValue,
      setEthicsValue,
      theme,
      setTheme,
      toggleTheme,
    }),
    [appScreen, niveauId, activeTab, diagnostic, ethicsValue, theme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

export function computeAxeEleveSavoir(manipulation, impactMediatise) {
  return Math.round(0.7 * (manipulation || 0) + 0.3 * (impactMediatise || 0));
}
