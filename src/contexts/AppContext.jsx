import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

const STORAGE_KEY = 'triangle-v2:diagnostic';

export function AppProvider({ children }) {
  const [niveauId, setNiveauId] = useState(null);
  const [activeTab, setActiveTab] = useState('explorer');
  const [diagnostic, setDiagnostic] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [ethicsValue, setEthicsValue] = useState(40);

  useEffect(() => {
    try {
      if (diagnostic) localStorage.setItem(STORAGE_KEY, JSON.stringify(diagnostic));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  }, [diagnostic]);

  const value = useMemo(
    () => ({
      niveauId,
      setNiveauId,
      activeTab,
      setActiveTab,
      diagnostic,
      setDiagnostic,
      ethicsValue,
      setEthicsValue,
    }),
    [niveauId, activeTab, diagnostic, ethicsValue]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
