import { ArrowLeft, ExternalLink, Mail, BookOpen } from 'lucide-react';
import mentionCfg from '../../config/mention-recherche-action.json';
import { useApp } from '../../contexts/AppContext.jsx';
import ThemeToggle from '../ThemeToggle.jsx';

export default function APropos() {
  const { setAppScreen, niveauId } = useApp();

  const goBack = () => {
    setAppScreen(niveauId ? 'tabs' : 'accueil');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onRetour = () => {
    if (mentionCfg.formulaireRetourUrl) {
      window.open(mentionCfg.formulaireRetourUrl, '_blank', 'noopener');
    } else {
      window.location.href = 'mailto:vanessa.le-scolan@ac-montpellier.fr?subject=Retour%20d%27usage%20—%20Triangle%20P%C3%A9dagogique%20Augment%C3%A9%20V2';
    }
  };

  return (
    <main className="min-h-screen bg-background animate-fade">
      <div className="max-w-[720px] mx-auto px-6 md:px-12 py-10">
        <div className="mb-6 flex items-center justify-between">
          <button onClick={goBack} className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text transition" aria-label="Retour">
            <ArrowLeft size={16} /> Retour
          </button>
          <ThemeToggle />
        </div>

        <h1 className="text-[32px] font-bold leading-tight mb-6 text-text">Une démarche de recherche-action</h1>

        <p className="text-base text-text leading-[1.7] mb-8">
          Le Triangle Pédagogique Augmenté est un artefact de recherche-action conçu et maintenu par Vanessa Le Scolan Nguyen, enseignante et référente numérique dans l'Académie de Montpellier ({mentionCfg.marque}).
        </p>

        <section>
          <h2 className="text-[22px] font-semibold text-brand-teal-primary mt-10 mb-4">À quoi sert cet outil</h2>
          <p className="text-base text-text leading-[1.7] mb-4">
            Il met à disposition un cadre d'analyse réflexive pour les enseignants face à l'intelligence artificielle, en cohérence avec le Cadre d'usage de l'IA en éducation publié par le Ministère de l'Éducation nationale en juin 2025.
          </p>
          <p className="text-base text-text leading-[1.7]">
            L'outil propose une grille d'analyse — le Triangle Pédagogique Augmenté — qui reprend le cadre théorique de Jean Houssaye (1988) en y intégrant la question de la place de l'IA dans la relation pédagogique.
          </p>
        </section>

        <section>
          <h2 className="text-[22px] font-semibold text-brand-teal-primary mt-10 mb-4">Le statut de cet outil</h2>
          <div
            className="rounded-lg p-5 md:p-6"
            style={{ background: 'rgba(139, 92, 246, 0.05)', borderLeft: '3px solid #8B5CF6' }}
          >
            <p className="text-base text-text leading-[1.7]">
              Cette application est un prototype. Elle n'est ni un produit certifié, ni un outil validé scientifiquement. Les analyses qu'elle produit sont des propositions à confronter à votre expertise professionnelle. Elles ne constituent ni une prescription, ni une évaluation certifiée.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[22px] font-semibold text-brand-teal-primary mt-10 mb-4">Ce que vous pouvez en attendre</h2>
          <ul className="space-y-3 text-base text-text leading-[1.7] pl-2">
            <li>— une grille de questionnement structurée pour analyser vos pratiques IA</li>
            <li>— un cadre visuel qui rend visible la tension entre pôles pédagogiques</li>
            <li>— des scénarios documentés par niveau scolaire</li>
            <li>— des recommandations générées par intelligence artificielle (à valider par votre jugement professionnel)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[22px] font-semibold text-brand-teal-primary mt-10 mb-4">Ce que cet outil ne remplace pas</h2>
          <ul className="space-y-3 text-base text-text leading-[1.7] pl-2">
            <li>— votre expertise disciplinaire et didactique</li>
            <li>— l'analyse collective en équipe pédagogique</li>
            <li>— les textes réglementaires officiels, dont le Cadre juin 2025 auquel cet outil s'adosse</li>
            <li>— une évaluation scientifique rigoureuse des usages IA en éducation, qui reste à produire</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[22px] font-semibold text-brand-teal-primary mt-10 mb-4">Contribuer</h2>
          <p className="text-base text-text leading-[1.7] mb-5">
            Cet outil vit grâce aux retours des enseignants qui l'utilisent. Vos observations, critiques et suggestions nourrissent les itérations suivantes.
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={onRetour}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-teal-primary text-white font-semibold hover:bg-brand-teal-text transition"
            >
              <Mail size={16} /> Envoyer un retour d'usage
            </button>
            <a
              href={mentionCfg.blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-brand-teal-primary hover:text-brand-teal transition hover:underline underline-offset-4"
            >
              <BookOpen size={14} /> Consulter le blog {mentionCfg.marque}
              <ExternalLink size={12} />
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-[22px] font-semibold text-brand-teal-primary mt-10 mb-4">Sources et références</h2>
          <ul className="space-y-4 text-sm text-text leading-[1.7]">
            <li>Houssaye, J. (1988). <em>Le triangle pédagogique. Théorie et pratiques de l'éducation scolaire</em>.</li>
            <li>
              Ministère de l'Éducation nationale (juin 2025). <em>L'IA en éducation : Cadre d'usage</em>.{' '}
              <a href={mentionCfg.cadreUrl} target="_blank" rel="noopener noreferrer" className="text-brand-teal-primary hover:underline inline-flex items-center gap-1">
                Lien <ExternalLink size={11} />
              </a>
            </li>
            <li>Dehaene, S. (2018). <em>Apprendre ! Les talents du cerveau, le défi des machines</em>.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[22px] font-semibold text-brand-teal-primary mt-10 mb-4">Version et crédits</h2>
          <div className="text-sm text-text leading-[1.8] space-y-1">
            <p>Version actuelle : {mentionCfg.version}</p>
            <p>Conception, développement et maintenance : {mentionCfg.auteure}</p>
            <p>Contact : via le blog <a href={mentionCfg.blogUrl} target="_blank" rel="noopener noreferrer" className="text-brand-teal-primary hover:underline">{mentionCfg.marque}</a></p>
          </div>
        </section>
      </div>
    </main>
  );
}
