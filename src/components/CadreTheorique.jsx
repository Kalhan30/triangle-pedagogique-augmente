import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { P2IA_CYCLE_2, P2IA_CYCLE_3, P2IA_URL_EDUSCOL_CYCLE_2, P2IA_URL_EDUSCOL_CYCLE_3 } from '../data/contraintes.js';
import { TriangleHoussayeBase, TriangleAugmenteIA } from './accueil/SVG_Triangles_Accueil.jsx';

// Libellés courts pour la présentation compacte dans le Cadre théorique
// (textes exacts du patch correctif). Les descriptions Eduscol complètes
// restent dans contraintes.js pour l'onglet Explorer.
const P2IA_SHORT = {
  Lalilo: 'Parcours personnalisés en lecture.',
  Navi: 'Remédiation et mémorisation en lecture-écriture.',
  "Adaptiv'Math": 'Personnalisation des parcours.',
  Mathia: 'Dialogue naturel avec un robot-compagnon.',
  'Smart Enseigno': 'Assistance à la personnalisation.',
  Expliq: "apprentissage par l'explicitation (l'élève tutore des avatars pour renforcer sa propre maîtrise)",
  Edumalin: "stratégies d'apprentissage avec pas-à-pas méthodologique",
  'Mathia-C3': 'exploration par manipulation et visualisation 3D',
  Origamia: 'hybride papier/numérique, résolution de problèmes',
  Cards: 'jeu de cartes de compétences à collectionner',
  yLANG: "reconnaissance vocale pour l'expression orale",
};
function shortDescription(svc) {
  return P2IA_SHORT[svc.nom] || svc.description;
}

const SECTIONS_META = [
  { id: 'section-1', numero: '01', titre: 'Le socle fondamental', sousTitre: 'Le cadre éthique et réglementaire qui précède toute réflexion pédagogique', accent: 'teal' },
  { id: 'section-2', numero: '02', titre: 'Le modèle central', sousTitre: 'Le triangle de Houssaye à l\'ère de l\'intelligence artificielle', accent: 'violet' },
  { id: 'section-3', numero: '03', titre: 'L\'évolution', sousTitre: 'Du triangle au tétraèdre — intégrer la dimension collaborative', accent: 'amber' },
  { id: 'section-4', numero: '04', titre: 'Perspectives', sousTitre: 'Articulation avec les grilles de lecture institutionnelles', accent: 'gris' },
];

const ACCENT_CLASSES = {
  teal: {
    text: 'text-brand-teal-primary',
    bg: 'bg-brand-teal-light',
    border: 'border-brand-teal-primary',
    encadre: 'bg-brand-teal-light border-l-[3px] border-brand-teal-primary',
    encadreText: 'text-brand-teal-text',
  },
  violet: {
    text: 'text-brand-violet-primary',
    bg: 'bg-brand-violet-light',
    border: 'border-brand-violet-primary',
    encadre: 'bg-brand-violet-light border-l-[3px] border-brand-violet-primary',
    encadreText: 'text-brand-violet-text',
  },
  amber: {
    text: 'text-brand-amber-primary',
    bg: 'bg-brand-amber-light',
    border: 'border-brand-amber-primary',
    encadre: 'bg-brand-amber-light border-l-[3px] border-brand-amber-primary',
    encadreText: 'text-brand-amber-text',
  },
  gris: {
    text: 'text-text-secondary',
    bg: 'bg-background-elevated',
    border: 'border-border',
    encadre: 'bg-background-elevated border-l-[3px] border-border',
    encadreText: 'text-text-secondary',
  },
};

function LienExterne({ libelle, url, accent = 'teal' }) {
  const cls = ACCENT_CLASSES[accent];
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block mb-3 no-underline`}
    >
      <div className="flex items-start gap-2">
        <span className={`${cls.text} text-sm flex-shrink-0 mt-0.5`} aria-hidden="true">→</span>
        <div className="flex-1 min-w-0">
          <span className={`${cls.text} text-sm font-medium underline-offset-2 group-hover:underline inline-flex items-center gap-1`}>
            {libelle}
            <ExternalLink size={12} strokeWidth={1.75} />
          </span>
          <div className="text-[11px] text-text-muted mt-0.5 break-all">{url}</div>
        </div>
      </div>
    </a>
  );
}

function Encadre({ accent = 'teal', children, titre }) {
  const cls = ACCENT_CLASSES[accent];
  return (
    <div className={`${cls.encadre} p-[14px_18px] rounded-lg my-3`}>
      {titre && <p className={`${cls.encadreText} text-[13px] font-semibold mb-2 uppercase tracking-wide`}>{titre}</p>}
      <div className="text-sm leading-relaxed text-text space-y-3">{children}</div>
    </div>
  );
}

function Section1Contenu() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-[1.6] text-text">
        Avant toute réflexion sur les modèles pédagogiques, l'intégration de l'intelligence artificielle en éducation exige un socle éthique et réglementaire clair. Ce socle ne se surajoute pas aux pratiques — il les conditionne.
      </p>

      <h3 className="text-base font-semibold text-text mt-6 mb-2">1.1 Le curseur éthique</h3>
      <Encadre accent="teal">
        <p>
          L'IA est strictement positionnée comme une aide à la décision et un médiateur. L'enseignant demeure le concepteur, le maître d'œuvre et le validateur final de l'acte pédagogique. L'IA n'a vocation ni à remplacer la relation humaine, ni à générer une pédagogie automatique, ni à se substituer au jugement éthique et didactique du praticien.
        </p>
        <p>
          Cette position s'appuie sur le cadre d'usage officiel publié par le Ministère de l'Éducation nationale en juin 2025, qui pose des règles distinctes selon le degré de scolarité — notamment l'interdiction de manipulation directe d'IA générative par les élèves avant la 4e — tout en rappelant que la responsabilité pédagogique demeure en toutes circonstances celle de l'enseignant.
        </p>
      </Encadre>

      <h3 className="text-base font-semibold text-text mt-6 mb-2">1.2 Sécurité et confidentialité</h3>
      <Encadre accent="teal">
        <p>
          La protection des données personnelles des élèves est non négociable. Les outils IA grand public ne doivent jamais traiter de données nominatives, comportementales ou sensibles concernant les élèves. Les choix techniques doivent privilégier les solutions institutionnelles, les outils libres, et les fournisseurs respectant le RGPD et la réglementation française.
        </p>
        <p>
          Cette exigence n'est pas un obstacle à l'usage pédagogique de l'IA : elle est la condition de sa légitimité en classe. La FAQ publiée par la CNIL en juin 2025 précise les conditions d'usage conforme pour les enseignants.
        </p>
      </Encadre>

      <div className="mt-6 pt-4 border-t border-border-subtle">
        <LienExterne
          libelle="Consulter la FAQ CNIL pour les enseignants"
          url="https://www.cnil.fr/fr/enseignant-usage-systeme-ia"
          accent="teal"
        />
        <LienExterne
          libelle="Consulter le Cadre d'usage de l'IA en éducation (juin 2025)"
          url="https://www.education.gouv.fr/cadre-d-usage-de-l-ia-en-education-450647"
          accent="teal"
        />
      </div>
    </div>
  );
}

function Section2Contenu() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-[1.6] text-text">
        Le triangle pédagogique de Jean Houssaye (1988) structure la réflexion didactique francophone depuis plus de trente ans. Il identifie trois pôles — Enseignant, Élève, Savoir — et trois relations fondamentales : enseigner, apprendre, former. L'arrivée de l'IA dans les classes ne remplace aucun de ces pôles ; elle réorganise les relations qui les relient.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8 items-center bg-background-elevated p-6 rounded-xl border border-border-subtle">
        <div className="flex flex-col items-center">
          <p className="text-xs uppercase tracking-widest font-semibold text-text-muted mb-4 text-center">Le cadre de base (1988)</p>
          <div className="w-full max-w-[280px]">
            <TriangleHoussayeBase />
          </div>
        </div>
        <div className="flex flex-col items-center relative">
          <div className="hidden md:block absolute left-[-1.5rem] top-1/2 -translate-y-1/2 text-text-muted opacity-50">
            →
          </div>
          <p className="text-xs uppercase tracking-widest font-semibold text-brand-violet-primary mb-4 text-center">Le modèle augmenté</p>
          <div className="w-full max-w-[280px]">
            <TriangleAugmenteIA />
          </div>
        </div>
      </div>

      <p className="text-sm leading-[1.6] text-text">
        Dans le modèle augmenté proposé ici, l'IA n'est pas un quatrième sommet. Elle agit comme un catalyseur au centre du triangle, qui influence chacune des trois relations sans les constituer. Les trois axes ci-dessous détaillent ce que l'IA transforme dans chaque relation.
      </p>

      <h3 className="text-base font-semibold text-text mt-6 mb-1">2.A L'axe <em>Enseigner</em> (Enseignant ↔ Savoir)</h3>
      <p className="text-sm italic text-text-secondary mb-2 font-serif-editorial">L'IA comme assistant didactique et scientifique</p>
      <p className="text-sm leading-[1.6] text-text">
        L'axe Enseigner concerne la relation de l'enseignant au savoir qu'il doit transposer. C'est l'axe de la préparation, de la veille, de la scénarisation, de la conception des supports. C'est historiquement le plus coûteux en temps. C'est aussi celui où l'IA générative déploie le plus visiblement sa valeur ajoutée.
      </p>
      <div>
        <p className="text-sm font-semibold text-text mt-3 mb-1">Allègement de la charge cognitive</p>
        <p className="text-sm leading-[1.6] text-text">
          L'IA peut prendre en charge une partie du travail répétitif de préparation : génération de quiz, production de fiches différenciées en plusieurs niveaux, rédaction de consignes adaptées, création de supports illustrés. L'enseignant reste le validateur qualité — rien n'est utilisé sans relecture didactique — mais le temps d'esquisse initial peut être divisé par deux ou trois.
        </p>
      </div>
      <div>
        <p className="text-sm font-semibold text-text mt-3 mb-1">Renouvellement didactique</p>
        <p className="text-sm leading-[1.6] text-text">
          L'accès rapide à des bases de connaissances actualisées et à des scénarisations alternatives permet à l'enseignant d'explorer des approches qu'il n'aurait pas eu le temps de chercher seul. L'IA ne remplace pas la veille professionnelle, mais elle peut la densifier en rendant accessible des modèles et des exemples que le manuel seul ne fournit pas.
        </p>
      </div>

      <h3 className="text-base font-semibold text-text mt-8 mb-1">2.B L'axe <em>Former</em> (Enseignant ↔ Élève)</h3>
      <p className="text-sm italic text-text-secondary mb-2 font-serif-editorial">L'IA comme levier de réinvestissement humain</p>
      <p className="text-sm leading-[1.6] text-text">
        L'axe Former concerne la relation directe entre l'enseignant et l'élève — la dimension incarnée, affective, relationnelle de l'acte pédagogique. C'est l'axe sur lequel l'IA ne peut ni doit intervenir directement. Sa valeur sur cet axe est paradoxale : elle le renforce par retrait.
      </p>
      <div>
        <p className="text-sm font-semibold text-text mt-3 mb-1">La libération du temps</p>
        <p className="text-sm leading-[1.6] text-text">
          Le gain de productivité réalisé sur l'axe Enseigner libère du temps qui peut être réinvesti sur l'axe Former. Moins de corrections mécaniques, plus de temps pour l'accompagnement. Moins de fiches à produire à la chaîne, plus d'attention aux signaux faibles d'un élève en difficulté. Ce déplacement de temps est la plus-value pédagogique profonde de l'IA bien intégrée.
        </p>
      </div>
      <div>
        <p className="text-sm font-semibold text-text mt-3 mb-1">Accompagnement renforcé</p>
        <p className="text-sm leading-[1.6] text-text">
          L'enseignant devient plus disponible pour la gestion du climat de classe, le soutien émotionnel, la motivation, l'analyse fine des retours formatifs. Ce n'est pas l'IA qui crée ce renforcement — c'est le temps qu'elle rend. La distinction est essentielle : l'IA n'améliore pas la relation pédagogique, elle dégage l'espace pour que l'enseignant l'améliore.
        </p>
      </div>

      <h3 className="text-base font-semibold text-text mt-8 mb-1">2.C L'axe <em>Apprendre</em> (Élève ↔ Savoir)</h3>
      <p className="text-sm italic text-text-secondary mb-2 font-serif-editorial">L'IA comme partenaire d'apprentissage — avec une distinction selon l'âge</p>
      <p className="text-sm leading-[1.6] text-text">
        L'axe Apprendre concerne la relation directe entre l'élève et le savoir, c'est-à-dire la construction cognitive du sens. C'est l'axe le plus sensible, celui où les risques de mauvaise intégration de l'IA sont les plus élevés. Le Cadre juin 2025 distingue explicitement deux régimes selon le niveau scolaire.
      </p>

      <p className="text-sm font-semibold text-text mt-4 mb-1">Avant la 4ème — L'IA générative invisible</p>
      <Encadre accent="violet">
        <p>
          À l'école primaire et dans les classes de 6e-5e, l'élève n'interagit pas directement avec des IA génératives ouvertes (ChatGPT, Gemini, Claude…). L'IA générative travaille pour l'enseignant, invisible aux yeux des élèves : elle sert à produire des supports différenciés, générer des exercices, préparer des évaluations. Cette invisibilité n'est pas une privation, c'est une protection — elle préserve l'effort cognitif nécessaire à l'acquisition des savoirs fondamentaux.
        </p>
      </Encadre>

      <p className="text-sm font-semibold text-text mt-4 mb-1">L'exception institutionnelle — les P2IA</p>
      <Encadre accent="violet">
        <p>
          Le Cadre juin 2025 distingue clairement deux natures d'IA, pas deux intensités sur une même échelle. Les <strong>P2IA</strong> (Partenariat d'innovation en intelligence artificielle) sont des services numériques d'assistance issus d'un <strong>marché public innovant</strong> porté par le Ministère de l'Éducation nationale, le Secrétariat général pour l'investissement (France 2030) et la Banque des Territoires, développés par des entreprises EdTech en collaboration avec des laboratoires de recherche. À la différence des IA génératives ouvertes, ils <strong>peuvent être utilisés par les élèves</strong> dans un cadre pédagogique strict, sous supervision enseignante.
        </p>
        <p>
          Ce sont des assistants cadrés : pas de génération libre, pas de dérive conversationnelle, pas de données personnelles traitées hors RGPD. Leur interface est prédictible, leur périmètre disciplinaire précis, leur cadre juridique et éthique garanti par le ministère.
        </p>
        <p className="mt-3"><strong>Deux vagues de P2IA coexistent aujourd'hui :</strong></p>

        <p className="mt-3 text-[13px] font-semibold">P2IA Cycle 2 — Première vague (CP-CE1-CE2)</p>
        <p className="mt-1 text-[12px] italic leading-snug">
          Le P2IA Cycle 2, lancé en 2019-2020 et déployé nationalement à partir de septembre 2021, s'est officiellement terminé le 31 août 2025. Les cinq services continuent d'exister mais selon des modèles économiques différents :
        </p>

        <p className="mt-2 text-[12px] font-semibold">Français :</p>
        <ul className="list-none space-y-1.5 mt-1 pl-0">
          {P2IA_CYCLE_2.filter((s) => s.discipline === 'Français').map((svc) => (
            <li key={svc.nom} className="flex gap-2 text-sm">
              <span
                aria-label={svc.statut === 'payant' ? 'Service payant' : 'Service gratuit'}
                className="flex-shrink-0 mt-0.5 leading-none"
              >
                {svc.statut === 'payant' ? '🔴' : '🟢'}
              </span>
              <span>
                <strong>{svc.nom}</strong> — {shortDescription(svc)}
                {svc.precision && (
                  <span className="block text-[11px] italic mt-0.5 text-text-secondary leading-snug">
                    {svc.statut === 'payant' ? '⚠ ' : ''}{svc.precision}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-2 text-[12px] font-semibold">Mathématiques :</p>
        <ul className="list-none space-y-1.5 mt-1 pl-0">
          {P2IA_CYCLE_2.filter((s) => s.discipline === 'Mathématiques').map((svc) => (
            <li key={svc.nom} className="flex gap-2 text-sm">
              <span
                aria-label={svc.statut === 'payant' ? 'Service payant' : 'Service gratuit'}
                className="flex-shrink-0 mt-0.5 leading-none"
              >
                {svc.statut === 'payant' ? '🔴' : '🟢'}
              </span>
              <span>
                <strong>{svc.nom}</strong> — {shortDescription(svc)}
                {svc.precision && (
                  <span className="block text-[11px] italic mt-0.5 text-text-secondary leading-snug">
                    {svc.statut === 'payant' ? '⚠ ' : ''}{svc.precision}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-[13px] font-semibold">P2IA Cycle 3 (en expérimentation depuis janvier 2026, pour CM1-CM2-6ᵉ, dans des classes volontaires sélectionnées) :</p>
        <ul className="list-none space-y-1 mt-1 pl-0">
          {P2IA_CYCLE_3.map((svc) => (
            <li key={svc.nom} className="flex gap-2 text-sm">
              <span className="text-brand-violet-primary flex-shrink-0 mt-0.5 font-semibold" aria-hidden="true">▸</span>
              <span><strong>{svc.nom}</strong> — {svc.discipline} : {shortDescription(svc)}</span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-[13px] italic">
          Les P2IA ne sont donc pas mesurés par l'axe « Manipulation d'IA générative » du triangle augmenté. Ils relèvent d'une catégorie distincte qui coexiste avec l'IA invisible : l'IA institutionnelle cadrée.
        </p>
        <p className="mt-2 text-[12px] flex flex-col gap-1">
          <a href={P2IA_URL_EDUSCOL_CYCLE_2} target="_blank" rel="noopener noreferrer" className="text-brand-violet-primary hover:underline underline-offset-2 inline-flex items-center gap-1">
            Consulter la fiche Eduscol sur les P2IA Cycle 2
            <ExternalLink size={11} strokeWidth={1.75} />
          </a>
          <a href={P2IA_URL_EDUSCOL_CYCLE_3} target="_blank" rel="noopener noreferrer" className="text-brand-violet-primary hover:underline underline-offset-2 inline-flex items-center gap-1">
            Consulter la fiche Eduscol sur les P2IA Cycle 3
            <ExternalLink size={11} strokeWidth={1.75} />
          </a>
        </p>
      </Encadre>

      <p className="text-sm font-semibold text-text mt-4 mb-1">À partir de la 4ème — L'IA partenaire</p>
      <Encadre accent="violet">
        <p>
          À partir de la classe de 4e, l'élève peut interagir avec l'IA générative dans un cadre encadré par l'enseignant. Cette interaction s'inscrit dans une éducation à l'esprit critique : l'IA n'est pas un oracle, c'est un interlocuteur faillible avec lequel on apprend à dialoguer, à vérifier, à douter.
        </p>
        <p>
          <em>Disponibilité</em> : l'élève peut solliciter une explication, une reformulation, un exemple, en dehors du temps de classe. L'IA devient un tuteur virtuel disponible, sans remplacer la relation maître-élève.
        </p>
        <p>
          <em>Sécurité psychologique</em> : l'élève peut formuler ses incompréhensions sans craindre le jugement de l'enseignant ou de ses pairs. Cette dimension psycho-affective est insuffisamment valorisée dans le discours institutionnel : elle lève un frein majeur à l'apprentissage pour les élèves timides, perfectionnistes, ou en difficulté sociale.
        </p>
      </Encadre>

      <p className="text-sm font-semibold text-text mt-6 mb-1">Points de vigilance sur l'axe Apprendre</p>
      <Encadre accent="amber">
        <p>La recherche internationale documente trois risques majeurs qu'il faut tenir en tension avec les bénéfices ci-dessus.</p>
        <p>
          <strong>Paresse métacognitive</strong> : l'usage fréquent de l'IA peut réduire l'engagement des apprenants dans leurs propres processus métacognitifs. Le confort cognitif offert par l'IA n'est pas gratuit — il peut se payer en autonomie intellectuelle (Stadler, Bannert & Sailer, 2024).
        </p>
        <p>
          <strong>Performance immédiate ≠ apprentissage durable</strong> : Robert Bjork a montré dès les années 1990 que certaines difficultés d'apprentissage (<em>desirable difficulties</em>) sont nécessaires à la consolidation mnésique. Un outil qui réduit l'effort peut améliorer la performance visible tout en détériorant la rétention à long terme.
        </p>
        <p>
          <strong>Déchargement cognitif</strong> : des études récentes établissent une corrélation négative entre l'usage fréquent de l'IA générative et les capacités de pensée critique, le déchargement cognitif étant identifié comme variable médiatrice (Gerlich, 2025).
        </p>
      </Encadre>
    </div>
  );
}

function Section3Contenu() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-[1.6] text-text">
        Le triangle de Houssaye a été enrichi par plusieurs didacticiens. L'une des propositions les plus fécondes est celle de Richard Faerber (2002, 2004), qui ajoute un quatrième pôle au modèle : le Groupe. Développé initialement dans le cadre de la plateforme d'apprentissage collaboratif à distance ACOLAD, ce tétraèdre étend le triangle pédagogique en prenant en compte la dimension collective de la classe.
      </p>

      <h3 className="text-base font-semibold text-text mt-6 mb-2">L'ajout du pôle Groupe</h3>
      <Encadre accent="amber">
        <p>
          Le groupe n'est pas simplement la somme des élèves individuels. C'est une entité propre, avec ses dynamiques, ses effets de pair à pair, ses régulations sociales implicites. Négliger le groupe revient à penser l'enseignement comme une série de relations duelles alors qu'il est aussi un fait collectif.
        </p>
        <p>
          En intégrant le pôle Groupe, le tétraèdre de Faerber fait apparaître six relations au lieu de trois : Enseignant-Savoir, Enseignant-Élève, Élève-Savoir, Enseignant-Groupe, Élève-Groupe, Groupe-Savoir. Il identifie également trois nouveaux processus spécifiques à la dimension collective — faciliter, partager, participer — qui s'ajoutent aux processus houssaysiens d'enseigner, d'apprendre et de former. Chacune de ces relations peut être éclairée par la question de l'intégration de l'IA.
        </p>
      </Encadre>

      <h3 className="text-base font-semibold text-text mt-6 mb-2">Où se trouve l'IA dans le tétraèdre ?</h3>
      <Encadre accent="amber">
        <p>
          Dans le modèle augmenté, l'IA conserve sa position de catalyseur central. Elle ne devient pas un cinquième sommet du tétraèdre. Elle agit désormais sur six relations au lieu de trois, mais son statut conceptuel reste inchangé : elle influence les échanges, elle ne les constitue pas. Cette cohérence est essentielle pour ne pas verser dans un déterminisme technologique qui ferait de l'IA un acteur pédagogique à part entière.
        </p>
      </Encadre>

      <h3 className="text-base font-semibold text-text mt-6 mb-2">L'IA et la collaboration</h3>
      <p className="text-sm leading-[1.6] text-text">
        L'intégration de l'IA dans les relations impliquant le Groupe ouvre des pistes spécifiques.
      </p>
      <ul className="list-none space-y-3 mt-2 pl-0">
        <li className="text-sm leading-[1.6] text-text flex gap-2">
          <span className="text-brand-amber-primary flex-shrink-0 mt-0.5" aria-hidden="true">•</span>
          <span><strong>Outils de remue-méninges assistés</strong> : l'IA peut enrichir une phase de divergence créative en groupe, en proposant des pistes qui n'auraient pas émergé spontanément. L'enseignant pilote la phase de convergence et d'arbitrage.</span>
        </li>
        <li className="text-sm leading-[1.6] text-text flex gap-2">
          <span className="text-brand-amber-primary flex-shrink-0 mt-0.5" aria-hidden="true">•</span>
          <span><strong>Organisation du travail de groupe</strong> : l'IA peut aider à constituer des groupes équilibrés (en termes de profils cognitifs, d'affinités déclarées, d'objectifs pédagogiques), toujours sous le contrôle de l'enseignant.</span>
        </li>
        <li className="text-sm leading-[1.6] text-text flex gap-2">
          <span className="text-brand-amber-primary flex-shrink-0 mt-0.5" aria-hidden="true">•</span>
          <span><strong>Soutien à l'intelligence collective</strong> : des tuteurs virtuels de groupe peuvent relancer une discussion qui s'enlise, reformuler une synthèse intermédiaire, pointer un angle mort dans le raisonnement collectif. Ils ne remplacent pas l'animateur humain mais peuvent augmenter la qualité des interactions.</span>
        </li>
      </ul>

      <h3 className="text-base font-semibold text-text mt-6 mb-2">Avertissement</h3>
      <Encadre accent="amber">
        <p>
          L'intégration de l'IA dans les dynamiques de groupe reste un champ de recherche récent et peu documenté empiriquement. Les usages décrits ci-dessus relèvent davantage du prospectif que de l'établi. Ils doivent être explorés avec prudence, en documentant les effets réels, et en maintenant les alertes de l'axe Apprendre (paresse métacognitive, déchargement cognitif, performance sans apprentissage).
        </p>
      </Encadre>
    </div>
  );
}

function Section4Contenu() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-[1.6] text-text">
        Le modèle augmenté présenté dans les sections précédentes s'inscrit dans un paysage plus large de cadres d'analyse de l'intégration du numérique en éducation. Deux cadres en particulier, reconnus internationalement et largement diffusés en France, peuvent être mobilisés comme grilles de lecture transversales du triangle augmenté. Ils ne remplacent pas notre modèle — ils permettent de le lire autrement.
      </p>

      <h3 className="text-base font-semibold text-text mt-6 mb-2">4.1 Le modèle TPACK</h3>
      <Encadre accent="gris" titre="TPACK — Technological Pedagogical Content Knowledge">
        <p>
          Développé par Mishra et Koehler en 2006, TPACK analyse l'intégration du numérique à l'intersection de trois types de connaissances que tout enseignant mobilise : les savoirs disciplinaires (ce qui est enseigné), les savoirs pédagogiques (comment enseigner), et les savoirs technologiques (quels outils utiliser). La compétence professionnelle émerge à l'intersection de ces trois cercles.
        </p>
        <p>
          Une extension du modèle, <strong>I-TPACK</strong> (<em>Intelligent-TPACK</em>, Celik 2023), y intègre explicitement la dimension éthique de l'IA (fondée sur quatre critères : responsabilité, transparence, équité, inclusivité) et les compétences de validation des décisions automatisées.
        </p>
        <p>
          Lu au prisme du triangle augmenté : l'axe Enseigner mobilise principalement la TPK (Technological Pedagogical Knowledge) et la TCK (Technological Content Knowledge). L'axe Apprendre, quand l'IA devient partenaire, mobilise aussi une forme de TPACK chez l'élève lui-même, qui doit apprendre à situer l'outil dans sa discipline et dans sa stratégie d'apprentissage.
        </p>
      </Encadre>

      <h3 className="text-base font-semibold text-text mt-6 mb-2">4.2 Le modèle SAMR</h3>
      <Encadre accent="gris" titre="SAMR — Substitution, Augmentation, Modification, Redéfinition">
        <p>
          Proposé par Ruben Puentedura, SAMR évalue la profondeur de l'intégration du numérique dans une tâche d'apprentissage, selon quatre niveaux progressifs.
        </p>
        <ul className="list-none space-y-2 pl-0">
          <li className="flex gap-2"><span className="text-text-secondary flex-shrink-0 mt-0.5" aria-hidden="true">•</span><span><strong>Substitution</strong> : l'outil numérique remplace un outil traditionnel sans changement fonctionnel (écrire au traitement de texte plutôt qu'au stylo).</span></li>
          <li className="flex gap-2"><span className="text-text-secondary flex-shrink-0 mt-0.5" aria-hidden="true">•</span><span><strong>Augmentation</strong> : l'outil ajoute une fonctionnalité qui améliore la tâche existante (correcteur orthographique, dictaphone).</span></li>
          <li className="flex gap-2"><span className="text-text-secondary flex-shrink-0 mt-0.5" aria-hidden="true">•</span><span><strong>Modification</strong> : l'outil permet une reconfiguration significative de la tâche (écriture collaborative simultanée).</span></li>
          <li className="flex gap-2"><span className="text-text-secondary flex-shrink-0 mt-0.5" aria-hidden="true">•</span><span><strong>Redéfinition</strong> : l'outil rend possible une tâche qui n'existait pas auparavant (co-création avec une IA générative, simulations complexes).</span></li>
        </ul>
        <p>
          Lu au prisme du triangle augmenté : dans l'axe Enseigner, l'IA se situe souvent en Augmentation (elle améliore la préparation sans la redéfinir). Dans l'axe Apprendre, elle peut viser la Modification (reformulation adaptée au profil de l'élève) voire la Redéfinition (tutorat dialogique, exploration ouverte). La visée pédagogique la plus ambitieuse se situe dans les niveaux supérieurs, mais elle exige un encadrement plus fin.
        </p>
      </Encadre>

      <h3 className="text-base font-semibold text-text mt-6 mb-2">Pour aller plus loin</h3>
      <div className="mt-4">
        <LienExterne
          libelle="L'article fondateur du modèle augmenté : Le triangle pédagogique augmenté par l'IA"
          url="https://maprofbranchee.fr/le-triangle-pedagogique-augmente-par-lia-une-nouvelle-grammaire-de-lapprentissage/"
          accent="gris"
        />
        <LienExterne
          libelle="Les intelligences artificielles et leurs usages en éducation (Eduscol)"
          url="https://eduscol.education.fr/4188/les-intelligences-artificielles-et-leurs-usages-en-education"
          accent="gris"
        />
        <LienExterne
          libelle="Le MOOC AI4T (Intelligence Artificielle pour et par les Enseignants)"
          url="https://www.fun-mooc.fr/fr/cours/intelligence-artificielle-pour-et-par-les-enseignants-ai4t/"
          accent="gris"
        />
      </div>
    </div>
  );
}

const SECTION_CONTENUS = {
  'section-1': <Section1Contenu />,
  'section-2': <Section2Contenu />,
  'section-3': <Section3Contenu />,
  'section-4': <Section4Contenu />,
};

function SectionDepliable({ section, estOuverte, onToggle, innerRef }) {
  const cls = ACCENT_CLASSES[section.accent];
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(estOuverte ? 'none' : '0px');
  const headerId = `${section.id}-header`;
  const panelId = `${section.id}-panel`;

  useEffect(() => {
    if (!contentRef.current) return;
    if (estOuverte) {
      const h = contentRef.current.scrollHeight;
      setMaxHeight(`${h}px`);
      const t = setTimeout(() => setMaxHeight('none'), 320);
      return () => clearTimeout(t);
    }
    if (contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
      requestAnimationFrame(() => setMaxHeight('0px'));
    }
  }, [estOuverte]);

  return (
    <article ref={innerRef} id={section.id} className="scroll-mt-20">
      <button
        id={headerId}
        type="button"
        onClick={onToggle}
        aria-expanded={estOuverte}
        aria-controls={panelId}
        className={`w-full flex items-center gap-4 py-4 text-left transition hover:bg-background-elevated rounded-md ${estOuverte ? '' : 'border-b border-border-subtle'}`}
      >
        <span className={`${cls.text} text-[28px] font-medium w-12 flex-shrink-0 tabular-nums`}>{section.numero}</span>
        <span className="flex-1 min-w-0">
          <span className="block text-xl font-medium text-text">{section.titre}</span>
          <span className="block text-[13px] text-text-secondary italic font-serif-editorial mt-0.5">{section.sousTitre}</span>
        </span>
        <ChevronDown
          size={18}
          strokeWidth={1.75}
          className={`text-text-muted flex-shrink-0 transition-transform duration-300 ${estOuverte ? 'rotate-180' : 'rotate-0'}`}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        aria-hidden={!estOuverte}
        style={{
          maxHeight: maxHeight,
          overflow: maxHeight === 'none' ? 'visible' : 'hidden',
          transition: 'max-height 0.3s ease-out',
        }}
      >
        <div ref={contentRef} className="pt-2 pb-6 pl-[60px] pr-2">
          {SECTION_CONTENUS[section.id]}
        </div>
      </div>
    </article>
  );
}

function EnTete() {
  return (
    <header className="mb-6 pt-6 max-w-3xl">
      <h1 className="text-[28px] font-semibold text-text leading-tight mb-2">
        Le cadre théorique du triangle pédagogique augmenté
      </h1>
      <h2 className="text-base italic text-text-secondary font-serif-editorial mb-6">
        Les fondements scientifiques et didactiques qui structurent cet outil.
      </h2>
      <p className="text-sm leading-[1.6] text-text max-w-[720px]">
        Cette section présente l'architecture conceptuelle qui fonde les recommandations de l'outil. Elle s'adresse aux utilisateurs qui souhaitent comprendre comment chaque suggestion s'articule avec les cadres didactiques, les apports des sciences cognitives, et les textes institutionnels en vigueur. La lecture est organisée en 4 sections successives, du socle éthique aux perspectives d'approfondissement.
      </p>
    </header>
  );
}

function Sommaire({ onNaviguer }) {
  return (
    <nav aria-label="Sommaire du cadre théorique" className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {SECTIONS_META.map((s) => {
          const cls = ACCENT_CLASSES[s.accent];
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onNaviguer(s.id)}
              className={`${cls.bg} border-[0.5px] border-border-subtle rounded-lg p-3 text-left transition hover:shadow-md`}
              aria-label={`Naviguer vers la section ${s.titre}`}
            >
              <div className="flex items-center gap-2">
                <span className={`${cls.text} text-[11px] font-semibold tabular-nums`}>{s.numero}</span>
                <span className="text-[13px] font-medium text-text flex-1 min-w-0">{s.titre.replace(/^\d+\.\s*/, '')}</span>
                <ChevronRight size={14} strokeWidth={1.75} className="text-text-muted flex-shrink-0" aria-hidden="true" />
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function PiedDePage() {
  return (
    <footer className="mt-12 pt-6 border-t border-border-subtle text-center">
      <p className="text-[11px] text-text-muted leading-relaxed max-w-2xl mx-auto">
        Ce cadre théorique est le fondement intellectuel de l'outil Triangle Pédagogique Augmenté. Il est régulièrement enrichi au fil des retours de terrain et de la recherche.
      </p>
      <p className="text-[11px] text-text-muted mt-2">Dernière révision : avril 2026</p>
    </footer>
  );
}

export default function CadreTheorique() {
  const [sectionsOuvertes, setSectionsOuvertes] = useState(new Set(['section-1']));
  const sectionRefs = useRef({});

  const toggleSection = (id) => {
    setSectionsOuvertes((prev) => {
      const nouveau = new Set(prev);
      if (nouveau.has(id)) nouveau.delete(id);
      else nouveau.add(id);
      return nouveau;
    });
  };

  const naviguer = (id) => {
    setSectionsOuvertes((prev) => {
      const nouveau = new Set(prev);
      nouveau.add(id);
      return nouveau;
    });
    requestAnimationFrame(() => {
      const el = sectionRefs.current[id];
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-6 animate-fade">
      <div className="max-w-4xl mx-auto">
        <EnTete />
        <Sommaire onNaviguer={naviguer} />
        <div>
          {SECTIONS_META.map((s) => (
            <SectionDepliable
              key={s.id}
              section={s}
              estOuverte={sectionsOuvertes.has(s.id)}
              onToggle={() => toggleSection(s.id)}
              innerRef={(el) => { sectionRefs.current[s.id] = el; }}
            />
          ))}
        </div>
        <PiedDePage />
      </div>
    </section>
  );
}
