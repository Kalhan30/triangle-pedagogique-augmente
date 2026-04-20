import { useCallback, useState } from 'react';
import { useApp } from './contexts/AppContext.jsx';
import Accueil from './components/Accueil.jsx';
import Header from './components/Header.jsx';
import Tabs from './components/Tabs.jsx';
import Footer from './components/Footer.jsx';
import Explorer from './components/tabs/Explorer.jsx';
import Situations from './components/tabs/Situations.jsx';
import Ethique from './components/tabs/Ethique.jsx';
import MonDiagnostic from './components/tabs/MonDiagnostic.jsx';
import CadreTheorique from './components/CadreTheorique.jsx';
import FloatingFAQ from './components/FloatingFAQ.jsx';
import APropos from './components/pages/APropos.jsx';
import ModaleChoixThemePDF from './components/ModaleChoixThemePDF.jsx';
import { exporterFichePdf } from './utils/exportPdf.js';

export default function App() {
  const { appScreen, niveauId, activeTab, diagnostic } = useApp();
  const [pdfModalOpen, setPdfModalOpen] = useState(false);

  const onExport = useCallback(() => {
    if (!diagnostic) { alert('Complétez votre diagnostic personnel avant l\'export.'); return; }
    setPdfModalOpen(true);
  }, [diagnostic]);

  const onPdfChoice = async (theme) => {
    setPdfModalOpen(false);
    try { await exporterFichePdf(diagnostic, theme); } catch (e) { console.error('Export failed:', e); alert('L\'export a échoué.'); }
  };

  if (appScreen === 'apropos') {
    return (
      <>
        <APropos />
        <Footer />
        <FloatingFAQ />
        {pdfModalOpen && <ModaleChoixThemePDF onChoice={onPdfChoice} onClose={() => setPdfModalOpen(false)} />}
      </>
    );
  }

  if (!niveauId || appScreen === 'accueil') {
    return (
      <>
        <Accueil />
        <Footer />
        <FloatingFAQ />
        {pdfModalOpen && <ModaleChoixThemePDF onChoice={onPdfChoice} onClose={() => setPdfModalOpen(false)} />}
      </>
    );
  }

  return (
    <>
      <Header onExport={onExport} />
      <Tabs />
      {activeTab === 'explorer' && <Explorer />}
      {activeTab === 'situations' && <Situations />}
      {activeTab === 'ethique' && <Ethique />}
      {activeTab === 'diagnostic' && <MonDiagnostic />}
      {activeTab === 'cadre-theorique' && <CadreTheorique />}
      <Footer />
      <FloatingFAQ />
      {pdfModalOpen && <ModaleChoixThemePDF onChoice={onPdfChoice} onClose={() => setPdfModalOpen(false)} />}
    </>
  );
}
