import { useCallback } from 'react';
import { useApp } from './contexts/AppContext.jsx';
import Accueil from './components/Accueil.jsx';
import Header from './components/Header.jsx';
import Tabs from './components/Tabs.jsx';
import Explorer from './components/tabs/Explorer.jsx';
import Situations from './components/tabs/Situations.jsx';
import Ethique from './components/tabs/Ethique.jsx';
import MonDiagnostic from './components/tabs/MonDiagnostic.jsx';
import FloatingFAQ from './components/FloatingFAQ.jsx';
import { exporterFichePdf } from './utils/exportPdf.js';

export default function App() {
  const { niveauId, activeTab, diagnostic } = useApp();

  const onExport = useCallback(async () => {
    if (!diagnostic) {
      alert('Complétez votre diagnostic personnel avant l\'export.');
      return;
    }
    try {
      await exporterFichePdf(diagnostic);
    } catch (e) {
      console.error('Export failed:', e);
      alert('L\'export a échoué. Vérifiez vos données et réessayez.');
    }
  }, [diagnostic]);

  if (!niveauId) return <><Accueil /><FloatingFAQ /></>;

  return (
    <>
      <Header onExport={onExport} />
      <Tabs />
      {activeTab === 'explorer' && <Explorer />}
      {activeTab === 'situations' && <Situations />}
      {activeTab === 'ethique' && <Ethique />}
      {activeTab === 'diagnostic' && <MonDiagnostic />}
      <FloatingFAQ />
    </>
  );
}
