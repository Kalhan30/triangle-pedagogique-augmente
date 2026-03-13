import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// DATA — Triangle Pédagogique Augmenté
// Autrice du cadre théorique : Vanessa Le Scolan — MaProfBranchée
// ═══════════════════════════════════════════════════════════════

const VERTICES = [
  {
    id: "enseignant",
    label: "Enseignant",
    emoji: "👩‍🏫",
    color: "#0D9488",
    position: { x: 350, y: 45 },
    description:
      "Le décideur pédagogique. Il conçoit, transmet, accompagne et évalue. L'IA est son assistant invisible, pas son remplaçant. Chaque choix pédagogique lui appartient.",
    citation: "L'IA propose, l'enseignant valide.",
  },
  {
    id: "eleve",
    label: "Élève",
    emoji: "👧",
    color: "#2563EB",
    position: { x: 120, y: 440 },
    description:
      "L'apprenant actif. Il construit ses savoirs par l'erreur, l'engagement et la répétition espacée. L'IA peut l'accompagner, mais l'effort cognitif lui appartient.",
    citation:
      "Supprimez l'erreur accompagnée, vous supprimez l'apprentissage.",
  },
  {
    id: "savoir",
    label: "Savoir",
    emoji: "📚",
    color: "#EA580C",
    position: { x: 580, y: 440 },
    description:
      "Les programmes, les compétences, les connaissances. L'IA peut les reformuler, les structurer, les adapter — mais ne les légitime pas. Seuls les cadres institutionnels et l'expertise enseignante le font.",
    citation:
      "L'IA accélère, reformule, structure. L'humain contextualise, juge, invente.",
  },
];

const AXES = [
  {
    id: "ens-sav",
    from: "enseignant",
    to: "savoir",
    label: "La préparation",
    color: "#7C3AED",
    ia_can_do: [
      "Générer des séquences pédagogiques complètes",
      "Différencier les exercices en 3 niveaux",
      "Structurer des programmations annuelles",
      "Créer des évaluations avec grille de compétences",
      "Proposer des ressources alignées sur les programmes",
    ],
    human_only: [
      "Juger la pertinence didactique pour SA classe",
      "Adapter au contexte local et au vécu des élèves",
      "Choisir la progression en fonction du groupe",
      "Prioriser selon les besoins observés au quotidien",
      "Valider la conformité aux programmes officiels",
    ],
    terrain_example:
      "En CE2, j'utilise Claude pour générer 3 niveaux de différenciation sur une leçon de grammaire. L'IA me propose les variantes en 2 minutes. Mais c'est moi qui décide laquelle colle à ma classe, à mes élèves, à ce qu'on a fait la semaine dernière.",
    human_role:
      "L'enseignant est le seul à connaître le contexte réel de sa classe. Il valide, adapte et contextualise chaque production de l'IA.",
  },
  {
    id: "ens-elev",
    from: "enseignant",
    to: "eleve",
    label: "L'accompagnement",
    color: "#7C3AED",
    ia_can_do: [
      "Identifier des profils d'apprentissage par analyse de résultats",
      "Générer des feedbacks personnalisés par compétence",
      "Proposer des parcours de remédiation ciblés",
      "Créer des supports adaptés (DYS, allophones, HP)",
      "Automatiser le suivi de progression individuelle",
    ],
    human_only: [
      "Percevoir l'état émotionnel d'un élève en difficulté",
      "Créer le lien de confiance nécessaire à l'apprentissage",
      "Décider d'une intervention éducative en situation",
      "Motiver par la relation humaine (regard, voix, présence)",
      "Gérer les dynamiques de groupe et les conflits",
    ],
    terrain_example:
      "Quand un élève de CE2 bloque sur une consigne, l'IA peut lui reformuler la question. Mais c'est mon regard qui capte qu'il n'a pas compris parce qu'il s'est disputé à la récréation. Aucune IA ne lit ça.",
    human_role:
      "L'enseignant est irremplaçable dans la relation affective et l'observation fine. Le lien humain est le premier levier de l'apprentissage.",
  },
  {
    id: "elev-sav",
    from: "eleve",
    to: "savoir",
    label: "L'apprentissage",
    color: "#7C3AED",
    ia_can_do: [
      "Adapter le niveau de difficulté en temps réel",
      "Fournir des exercices de répétition espacée",
      "Proposer des explications alternatives quand l'élève bloque",
      "Générer des quiz d'auto-évaluation personnalisés",
      "Offrir un tutorat disponible hors temps scolaire",
    ],
    human_only: [
      "Faire l'effort cognitif — c'est non négociable",
      "Développer l'esprit critique face aux réponses de l'IA",
      "Construire du sens à partir de l'erreur accompagnée",
      "Transférer un savoir dans un contexte réel et nouveau",
      "Développer la métacognition ('comment j'apprends')",
    ],
    terrain_example:
      "Un élève qui demande à l'IA de résumer un texte au lieu de le lire n'apprend rien. L'IA doit accompagner la lecture, pas la remplacer. Le guidage enseignant garantit que l'effort cognitif reste chez l'élève.",
    human_role:
      "L'enseignant guide la compréhension fine, repère les stratégies de décodage de l'élève et maintient la motivation par la relation de confiance.",
  },
];

const SCENARIOS = [
  {
    id: "preparation",
    label: "Préparer une séquence",
    emoji: "📝",
    level: "Tous niveaux",
    description:
      "L'enseignant utilise l'IA pour générer une séquence de mathématiques différenciée en 3 niveaux. L'IA structure, l'enseignant valide et adapte.",
    weights: { "ens-sav": 0.9, "ens-elev": 0.3, "elev-sav": 0.2 },
    dead_pole: "eleve",
    ia_role:
      "Générateur de contenu structuré : séquences, exercices, grilles d'évaluation.",
    human_role:
      "Validation didactique, adaptation au contexte de classe, choix de progression.",
  },
  {
    id: "differenciation",
    label: "Différencier en temps réel",
    emoji: "🎯",
    level: "Cycle 2-3",
    description:
      "Pendant une séance, l'enseignant utilise l'IA pour générer instantanément des variantes d'exercices adaptées aux besoins repérés.",
    weights: { "ens-sav": 0.7, "ens-elev": 0.8, "elev-sav": 0.5 },
    dead_pole: null,
    ia_role:
      "Assistant de différenciation : variantes d'exercices, supports adaptés DYS/allophones.",
    human_role:
      "Observation fine des besoins, choix du support adapté, accompagnement humain.",
  },
  {
    id: "evaluation",
    label: "Évaluer par compétences",
    emoji: "✅",
    level: "Tous niveaux",
    description:
      "L'IA génère des évaluations alignées sur le socle commun avec grille A/PA/NA. L'enseignant ajuste et interprète les résultats.",
    weights: { "ens-sav": 0.8, "ens-elev": 0.6, "elev-sav": 0.4 },
    dead_pole: null,
    ia_role:
      "Créateur d'évaluations, générateur de grilles, analyse statistique des résultats.",
    human_role:
      "Interprétation pédagogique des résultats, décision de remédiation, communication aux familles.",
  },
  {
    id: "remediation",
    label: "Remédier après évaluation",
    emoji: "🔄",
    level: "Cycle 2-3",
    description:
      "Après une évaluation, l'IA propose des parcours de remédiation personnalisés. L'enseignant accompagne et motive.",
    weights: { "ens-sav": 0.5, "ens-elev": 0.9, "elev-sav": 0.7 },
    dead_pole: null,
    ia_role:
      "Diagnostic des erreurs récurrentes, parcours de remédiation ciblés, exercices adaptatifs.",
    human_role:
      "Motivation, accompagnement émotionnel, ajustement du parcours selon l'état de l'élève.",
  },
  {
    id: "lecture",
    label: "Accompagner la lecture",
    emoji: "📖",
    level: "Cycle 2",
    description:
      "L'IA aide à adapter des textes au niveau de lecture de l'élève, propose des exercices de fluence, génère des questions de compréhension différenciées.",
    weights: { "ens-sav": 0.6, "ens-elev": 0.5, "elev-sav": 0.8 },
    dead_pole: null,
    ia_role:
      "Adaptation de textes, exercices de fluence, questions de compréhension graduées.",
    human_role:
      "L'enseignant guide la compréhension fine, repère les stratégies de décodage de l'élève et maintient la motivation par la relation de confiance.",
  },
  {
    id: "inclusion",
    label: "Adapter pour l'inclusion",
    emoji: "♿",
    level: "Tous niveaux",
    description:
      "L'IA génère des supports adaptés (DYS, TDAH, allophones, HP) à partir d'un même contenu de base. L'enseignant personnalise selon le PPS/PAP.",
    weights: { "ens-sav": 0.7, "ens-elev": 0.7, "elev-sav": 0.6 },
    dead_pole: null,
    ia_role:
      "Reformulation, mise en page adaptée, traduction, simplification du vocabulaire.",
    human_role:
      "Connaissance du profil individuel, lien avec les familles et les professionnels, ajustement en situation.",
  },
];

const ETHICS_ZONES = [
  {
    min: 0,
    max: 25,
    color: "#16a34a",
    bgColor: "#DCFCE7",
    label: "IA minimale",
    message:
      "L'IA comme calculatrice — un outil ponctuel. L'enseignant fait l'essentiel. L'IA intervient sur des tâches isolées (correction orthographique, mise en forme).",
    iaStrokeWidth: 1,
    iaDashArray: "6 4",
  },
  {
    min: 25,
    max: 60,
    color: "#0d9488",
    bgColor: "#CCFBF1",
    label: "IA partenaire",
    badge: "RECOMMANDÉ",
    message:
      "L'assistant invisible — l'IA assiste sur la préparation et la différenciation. L'enseignant reste le pilote. C'est la zone d'équilibre : l'IA amplifie sans remplacer.",
    iaStrokeWidth: 2.5,
    iaDashArray: "none",
  },
  {
    min: 60,
    max: 85,
    color: "#ea580c",
    bgColor: "#FFF7ED",
    label: "IA dominante",
    badge: "ATTENTION",
    message:
      "L'IA génère la majorité des contenus et évaluations. Risque : la boucle de surcompensation s'enclenche. L'enseignant perd progressivement la main sur ses choix pédagogiques.",
    iaStrokeWidth: 4.5,
    iaDashArray: "none",
  },
  {
    min: 85,
    max: 100,
    color: "#dc2626",
    bgColor: "#FEE2E2",
    label: "IA totale",
    badge: "ZONE ROUGE",
    message:
      "Enseigner en se trahissant. L'IA fait tout. L'enseignant n'a plus de rôle pédagogique. Le triangle s'effondre : la relation humaine disparaît, l'apprentissage devient mécanique.",
    iaStrokeWidth: 8,
    iaDashArray: "none",
  },
];

const OVERCOMPENSATION_LOOP = {
  title: "⚠️ La boucle de surcompensation",
  steps: [
    "L'IA fait de plus en plus de tâches à la place de l'enseignant",
    "L'enseignant ressent un sentiment d'illégitimité (« l'IA fait mieux que moi »)",
    "Il surcompense en travaillant plus pour « justifier » sa valeur",
    "Épuisement professionnel et perte de repères pédagogiques",
    "Dépendance accrue à l'IA pour compenser la fatigue",
    "Retour à l'étape 1 — la boucle se referme",
  ],
  conclusion:
    "La solution : rester dans la zone « IA partenaire » (25-60 %). L'IA amplifie, elle ne remplace pas.",
};

const REFERENCES = [
  {
    author: "Houssaye, J.",
    year: 1988,
    title: "Le Triangle pédagogique",
    detail: "Modèle fondateur des relations Enseignant-Élève-Savoir",
  },
  {
    author: "Dehaene, S.",
    year: 2018,
    title: "Apprendre ! Les talents du cerveau, le défi des machines",
    detail:
      "4 piliers de l'apprentissage : attention, engagement actif, retour sur erreur, consolidation",
  },
  {
    author: "MEN",
    year: 2025,
    title: "Cadre d'usage de l'IA en éducation",
    detail:
      "IA générative réservée enseignants, élèves à partir du CM1 uniquement",
  },
  {
    author: "UNESCO",
    year: 2024,
    title: "Compétences IA pour les enseignants",
    detail:
      "15 compétences en 5 dimensions : éthique, pédagogie, données, culture numérique, développement pro",
  },
  {
    author: "Hattie, J.",
    year: 2009,
    title: "Visible Learning",
    detail:
      "Méta-analyse : le feedback a l'une des plus grandes tailles d'effet sur l'apprentissage",
  },
  {
    author: "Anderson, L.W. & Krathwohl, D.R.",
    year: 2001,
    title: "Taxonomie de Bloom révisée",
    detail:
      "6 niveaux cognitifs : mémoriser, comprendre, appliquer, analyser, évaluer, créer",
  },
];

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function getEthicsZone(val) {
  return ETHICS_ZONES.find((z) => val >= z.min && val < z.max) || ETHICS_ZONES[3];
}

function getVertexById(id) {
  return VERTICES.find((v) => v.id === id);
}

// — Onboarding overlay (résout le problème "on ne sait pas où cliquer")
function OnboardingOverlay({ onDismiss }) {
  return (
    <div
      onClick={onDismiss}
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        animation: "fadeIn 0.4s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: "36px 32px",
          maxWidth: 440,
          margin: "0 20px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
          textAlign: "center",
          animation: "slideUp 0.5s ease",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 12 }}>🔺</div>
        <h2
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 26,
            fontWeight: 400,
            color: "#0f172a",
            margin: "0 0 12px",
            fontStyle: "italic",
          }}
        >
          Bienvenue dans le Triangle
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 15,
            color: "#475569",
            lineHeight: 1.6,
            margin: "0 0 8px",
          }}
        >
          Explorez comment l'IA module les 3 relations pédagogiques fondamentales — et où l'humain reste irremplaçable.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            margin: "20px 0",
            textAlign: "left",
          }}
        >
          {[
            { icon: "👆", text: "Cliquez sur un axe ou un sommet du triangle" },
            { icon: "📋", text: "Choisissez un scénario pour voir l'IA en situation" },
            { icon: "⚡", text: "Déplacez le curseur éthique pour tester les limites" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                background: "#f8fafc",
                borderRadius: 10,
                fontSize: 14,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                color: "#334155",
              }}
            >
              <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
        <button
          onClick={onDismiss}
          style={{
            marginTop: 8,
            padding: "12px 32px",
            background: "#0D9488",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 15,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#0f766e")}
          onMouseLeave={(e) => (e.target.style.background = "#0D9488")}
        >
          Explorer le triangle →
        </button>
      </div>
    </div>
  );
}

// — Triangle SVG interactif
function TriangleSVG({
  ethicsValue,
  activeAxis,
  activeVertex,
  scenarioWeights,
  onAxisClick,
  onVertexClick,
}) {
  const zone = getEthicsZone(ethicsValue);
  const iaOpacity = 0.15 + (ethicsValue / 100) * 0.7;
  const vertexScale = ethicsValue > 85 ? 0.7 : 1;
  const vertexOpacity = ethicsValue > 85 ? 0.4 : 1;

  const midpoints = AXES.map((axis) => {
    const from = getVertexById(axis.from);
    const to = getVertexById(axis.to);
    return {
      id: axis.id,
      x: (from.position.x + to.position.x) / 2,
      y: (from.position.y + to.position.y) / 2,
    };
  });

  return (
    <svg
      viewBox="0 0 700 510"
      style={{ width: "100%", maxWidth: 600, display: "block", margin: "0 auto" }}
      role="img"
      aria-label="Triangle Pédagogique Augmenté — cliquez sur les axes ou sommets pour explorer"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="iaGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity={iaOpacity} />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* IA central glow */}
      <circle cx="350" cy="310" r={70 + ethicsValue * 0.8} fill="url(#iaGrad)">
        <animate
          attributeName="r"
          values={`${70 + ethicsValue * 0.8};${76 + ethicsValue * 0.8};${70 + ethicsValue * 0.8}`}
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Axes */}
      {AXES.map((axis) => {
        const from = getVertexById(axis.from);
        const to = getVertexById(axis.to);
        const weight = scenarioWeights ? scenarioWeights[axis.id] || 0.5 : 0.5;
        const isActive = activeAxis === axis.id;
        return (
          <g key={axis.id}>
            {/* Hitbox invisible plus large pour clic facile */}
            <line
              x1={from.position.x}
              y1={from.position.y}
              x2={to.position.x}
              y2={to.position.y}
              stroke="transparent"
              strokeWidth={30}
              style={{ cursor: "pointer" }}
              onClick={() => onAxisClick(axis.id)}
              tabIndex={0}
              role="button"
              aria-label={`Axe ${axis.label} — cliquer pour explorer`}
              onKeyDown={(e) => e.key === "Enter" && onAxisClick(axis.id)}
            />
            {/* Trait visible */}
            <line
              x1={from.position.x}
              y1={from.position.y}
              x2={to.position.x}
              y2={to.position.y}
              stroke={isActive ? "#7C3AED" : "#94a3b8"}
              strokeWidth={isActive ? 3.5 : 1.5 + weight * 3}
              strokeDasharray={
                zone.iaDashArray !== "none" ? zone.iaDashArray : "none"
              }
              opacity={isActive ? 1 : 0.5 + weight * 0.5}
              style={{
                transition: "all 0.3s ease",
                pointerEvents: "none",
                filter: isActive ? "url(#glow)" : "none",
              }}
            />
            {/* IA links from center */}
            <line
              x1="350"
              y1="310"
              x2={midpoints.find((m) => m.id === axis.id).x}
              y2={midpoints.find((m) => m.id === axis.id).y}
              stroke="#7C3AED"
              strokeWidth={zone.iaStrokeWidth}
              strokeDasharray={zone.iaDashArray}
              opacity={0.3 + (ethicsValue / 100) * 0.5}
              style={{ transition: "all 0.3s ease", pointerEvents: "none" }}
            />
          </g>
        );
      })}

      {/* Axis labels at midpoints */}
      {AXES.map((axis, i) => {
        const mp = midpoints[i];
        const offsets = [
          { dx: 0, dy: -20 },
          { dx: -80, dy: 10 },
          { dx: 80, dy: 10 },
        ];
        return (
          <text
            key={axis.id + "-label"}
            x={mp.x + offsets[i].dx}
            y={mp.y + offsets[i].dy}
            textAnchor="middle"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 12,
              fill: activeAxis === axis.id ? "#7C3AED" : "#64748b",
              fontWeight: activeAxis === axis.id ? 600 : 400,
              pointerEvents: "none",
              transition: "all 0.25s ease",
            }}
          >
            {axis.label}
          </text>
        );
      })}

      {/* IA center label */}
      <g style={{ transition: "all 0.3s ease" }}>
        <circle
          cx="350"
          cy="310"
          r={30 + ethicsValue * 0.15}
          fill="#7C3AED"
          opacity={0.12 + (ethicsValue / 100) * 0.2}
          style={{ transition: "all 0.3s ease" }}
        />
        <text
          x="350"
          y="305"
          textAnchor="middle"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 13,
            fontWeight: 700,
            fill: "#7C3AED",
          }}
        >
          IA
        </text>
        <text
          x="350"
          y="322"
          textAnchor="middle"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 10,
            fill: "#7c3aed",
            opacity: 0.7,
          }}
        >
          {ethicsValue}%
        </text>
      </g>

      {/* Vertices */}
      {VERTICES.map((v) => {
        const isActive = activeVertex === v.id;
        return (
          <g
            key={v.id}
            onClick={() => onVertexClick(v.id)}
            style={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              opacity: vertexOpacity,
            }}
            tabIndex={0}
            role="button"
            aria-label={`Sommet ${v.label} — cliquer pour voir le détail`}
            onKeyDown={(e) => e.key === "Enter" && onVertexClick(v.id)}
          >
            <circle
              cx={v.position.x}
              cy={v.position.y}
              r={isActive ? 36 : 32}
              fill="#fff"
              stroke={v.color}
              strokeWidth={isActive ? 3 : 2}
              style={{
                filter: isActive ? "url(#glow)" : "none",
                transition: "all 0.25s ease",
              }}
            />
            <text
              x={v.position.x}
              y={v.position.y - 4}
              textAnchor="middle"
              style={{ fontSize: 22, pointerEvents: "none" }}
            >
              {v.emoji}
            </text>
            <text
              x={v.position.x}
              y={v.position.y + 54}
              textAnchor="middle"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                fill: v.color,
                pointerEvents: "none",
              }}
            >
              {v.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// — Detail panel (panneau latéral amélioré — bouton fermer plus visible)
function DetailPanel({ type, data, onClose }) {
  if (!data) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "min(480px, 92vw)",
        height: "100vh",
        background: "#fff",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
        zIndex: 40,
        overflowY: "auto",
        animation: "slideIn 0.3s ease",
      }}
    >
      {/* Close button — bien visible */}
      <button
        onClick={onClose}
        aria-label="Fermer le panneau"
        style={{
          position: "sticky",
          top: 12,
          float: "right",
          margin: "12px 16px 0 0",
          width: 40,
          height: 40,
          borderRadius: 10,
          border: "1px solid #e2e8f0",
          background: "#fff",
          fontSize: 20,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 41,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "#f1f5f9";
          e.target.style.borderColor = "#cbd5e1";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "#fff";
          e.target.style.borderColor = "#e2e8f0";
        }}
      >
        ✕
      </button>

      <div style={{ padding: "32px 28px 40px" }}>
        {type === "vertex" && (
          <>
            <div style={{ fontSize: 40, marginBottom: 8 }}>{data.emoji}</div>
            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 28,
                fontWeight: 400,
                fontStyle: "italic",
                color: data.color,
                margin: "0 0 16px",
              }}
            >
              {data.label}
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 15,
                lineHeight: 1.7,
                color: "#334155",
                margin: "0 0 20px",
              }}
            >
              {data.description}
            </p>
            <blockquote
              style={{
                borderLeft: `3px solid ${data.color}`,
                paddingLeft: 16,
                margin: "0",
                fontStyle: "italic",
                color: "#64748b",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 14,
              }}
            >
              {data.citation}
            </blockquote>
          </>
        )}

        {type === "axis" && (
          <>
            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 26,
                fontWeight: 400,
                fontStyle: "italic",
                color: "#0f172a",
                margin: "0 0 6px",
              }}
            >
              {data.label}
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 13,
                color: "#64748b",
                margin: "0 0 24px",
              }}
            >
              {getVertexById(data.from).label} ↔ {getVertexById(data.to).label}
            </p>

            {/* Deux colonnes équilibrées visuellement — même poids visuel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Colonne IA */}
              <div
                style={{
                  background: "#f5f3ff",
                  borderRadius: 12,
                  padding: "18px 20px",
                  borderLeft: "3px solid #7C3AED",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#7C3AED",
                    margin: "0 0 12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  🤖 Ce que l'IA peut faire
                </h3>
                {data.ia_can_do.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 8,
                      marginBottom: 8,
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: 13.5,
                      color: "#334155",
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: "#7C3AED", flexShrink: 0 }}>▸</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Colonne Humain — même poids visuel que la colonne IA */}
              <div
                style={{
                  background: "#f0fdf4",
                  borderRadius: 12,
                  padding: "18px 20px",
                  borderLeft: "3px solid #16a34a",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#16a34a",
                    margin: "0 0 12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  💚 Irremplaçable humain
                </h3>
                {data.human_only.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 8,
                      marginBottom: 8,
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: 13.5,
                      color: "#334155",
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: "#16a34a", flexShrink: 0 }}>▸</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exemple terrain */}
            <div
              style={{
                marginTop: 20,
                background: "#fffbeb",
                borderRadius: 12,
                padding: "16px 18px",
                borderLeft: "3px solid #f59e0b",
              }}
            >
              <h4
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#92400e",
                  margin: "0 0 8px",
                }}
              >
                💬 Exemple terrain
              </h4>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 13.5,
                  color: "#78350f",
                  lineHeight: 1.6,
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                {data.terrain_example}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// — Ethics slider (curseur éthique explicite avec label invitant à interagir)
function EthicsSlider({ value, onChange }) {
  const zone = getEthicsZone(value);
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "20px 24px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <h3
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: "#0f172a",
            margin: 0,
          }}
        >
          ⚡ Curseur éthique
        </h3>
        <span
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 12,
            color: "#64748b",
            fontStyle: "italic",
          }}
        >
          ← Déplacez-moi →
        </span>
      </div>

      {/* Slider */}
      <div style={{ position: "relative", margin: "8px 0" }}>
        <input
          type="range"
          min="0"
          max="99"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="Niveau d'intervention de l'IA (0 à 100 %)"
          style={{
            width: "100%",
            height: 8,
            appearance: "none",
            background: `linear-gradient(to right, #16a34a 0%, #0d9488 25%, #ea580c 60%, #dc2626 85%, #dc2626 100%)`,
            borderRadius: 4,
            outline: "none",
            cursor: "pointer",
          }}
        />
      </div>

      {/* Zone label + badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 8,
          marginBottom: 8,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: zone.color,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: zone.color,
          }}
        >
          {zone.label}
        </span>
        {zone.badge && (
          <span
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 10,
              fontWeight: 700,
              color: "#fff",
              background: zone.color,
              padding: "2px 8px",
              borderRadius: 6,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {zone.badge}
          </span>
        )}
        <span
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 13,
            color: "#94a3b8",
            marginLeft: "auto",
          }}
        >
          {value} %
        </span>
      </div>

      {/* Message */}
      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 13,
          lineHeight: 1.6,
          color: "#475569",
          margin: "0",
          padding: "12px 14px",
          background: zone.bgColor,
          borderRadius: 10,
          transition: "background 0.3s ease",
        }}
      >
        {zone.message}
      </p>

      {/* Overcompensation loop alert */}
      {value >= 60 && (
        <div
          style={{
            marginTop: 14,
            padding: "14px 16px",
            background: value >= 85 ? "#fef2f2" : "#fff7ed",
            border: `1px solid ${value >= 85 ? "#fecaca" : "#fed7aa"}`,
            borderRadius: 10,
            animation: "fadeIn 0.3s ease",
          }}
        >
          <h4
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              color: value >= 85 ? "#dc2626" : "#ea580c",
              margin: "0 0 10px",
            }}
          >
            {OVERCOMPENSATION_LOOP.title}
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {OVERCOMPENSATION_LOOP.steps.map((step, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 12,
                  color: "#78350f",
                  display: "flex",
                  gap: 6,
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    color: value >= 85 ? "#dc2626" : "#ea580c",
                    fontWeight: 700,
                    fontSize: 11,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}.
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "#0d9488",
              margin: "10px 0 0",
              fontStyle: "italic",
            }}
          >
            {OVERCOMPENSATION_LOOP.conclusion}
          </p>
        </div>
      )}
    </div>
  );
}

// — Scenario selector
function ScenarioSelector({ activeScenario, onSelect }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "20px 24px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <h3
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 14,
          fontWeight: 700,
          color: "#0f172a",
          margin: "0 0 14px",
        }}
      >
        📋 Scénarios terrain
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {SCENARIOS.map((s) => {
          const isActive = activeScenario?.id === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(isActive ? null : s)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderRadius: 10,
                border: isActive ? "2px solid #7C3AED" : "1px solid #e2e8f0",
                background: isActive ? "#f5f3ff" : "#fafafa",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{s.emoji}</span>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#7C3AED" : "#334155",
                  }}
                >
                  {s.label}
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{s.level}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Scenario detail */}
      {activeScenario && (
        <div
          style={{
            marginTop: 16,
            padding: "16px 18px",
            background: "#f5f3ff",
            borderRadius: 12,
            animation: "fadeIn 0.25s ease",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 13,
              lineHeight: 1.6,
              color: "#334155",
              margin: "0 0 12px",
            }}
          >
            {activeScenario.description}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                padding: "8px 12px",
                background: "#ede9fe",
                borderRadius: 8,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 12,
                color: "#5b21b6",
              }}
            >
              <strong>🤖 Rôle IA :</strong> {activeScenario.ia_role}
            </div>
            <div
              style={{
                padding: "8px 12px",
                background: "#dcfce7",
                borderRadius: 8,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 12,
                color: "#166534",
              }}
            >
              <strong>💚 Rôle humain :</strong> {activeScenario.human_role}
            </div>
          </div>
          {/* Weights visual */}
          <div style={{ marginTop: 12 }}>
            <div
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: "#64748b",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Activation des axes
            </div>
            {AXES.map((axis) => {
              const w = activeScenario.weights[axis.id] || 0;
              return (
                <div
                  key={axis.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: 11,
                      color: "#64748b",
                      width: 110,
                      flexShrink: 0,
                    }}
                  >
                    {axis.label}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 6,
                      background: "#e2e8f0",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${w * 100}%`,
                        height: "100%",
                        background: "#7C3AED",
                        borderRadius: 3,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: 11,
                      color: "#94a3b8",
                      width: 32,
                      textAlign: "right",
                    }}
                  >
                    {Math.round(w * 100)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// — References modal
function ReferencesModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.5)",
        backdropFilter: "blur(4px)",
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "32px 28px",
          maxWidth: 520,
          maxHeight: "80vh",
          overflowY: "auto",
          margin: "0 20px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 22,
              fontWeight: 400,
              fontStyle: "italic",
              color: "#0f172a",
              margin: 0,
            }}
          >
            Sources & Références
          </h2>
          <button
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "1px solid #e2e8f0",
              background: "#fff",
              fontSize: 16,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
        {REFERENCES.map((ref, i) => (
          <div
            key={i}
            style={{
              padding: "12px 0",
              borderBottom:
                i < REFERENCES.length - 1 ? "1px solid #f1f5f9" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              {ref.author} ({ref.year})
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 13,
                fontStyle: "italic",
                color: "#7C3AED",
                margin: "2px 0",
              }}
            >
              {ref.title}
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 12,
                color: "#64748b",
              }}
            >
              {ref.detail}
            </div>
          </div>
        ))}
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 12,
            color: "#94a3b8",
            margin: "16px 0 0",
            fontStyle: "italic",
          }}
        >
          Cadre théorique conçu par Vanessa Le Scolan — MaProfBranchée
          (maprofbranchee.fr)
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// APP PRINCIPALE
// ═══════════════════════════════════════════════════════════════

export default function TrianglePedagogiqueAugmente() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [activeTab, setActiveTab] = useState("explorer"); // explorer | scenarios | ethique
  const [ethicsValue, setEthicsValue] = useState(40);
  const [activeAxis, setActiveAxis] = useState(null);
  const [activeVertex, setActiveVertex] = useState(null);
  const [activeScenario, setActiveScenario] = useState(null);
  const [showRefs, setShowRefs] = useState(false);

  const handleAxisClick = useCallback(
    (id) => {
      setActiveVertex(null);
      setActiveAxis(activeAxis === id ? null : id);
    },
    [activeAxis]
  );

  const handleVertexClick = useCallback(
    (id) => {
      setActiveAxis(null);
      setActiveVertex(activeVertex === id ? null : id);
    },
    [activeVertex]
  );

  const handleScenarioSelect = useCallback((s) => {
    setActiveScenario(s);
    setActiveAxis(null);
    setActiveVertex(null);
  }, []);

  const panelData = activeAxis
    ? AXES.find((a) => a.id === activeAxis)
    : activeVertex
    ? VERTICES.find((v) => v.id === activeVertex)
    : null;

  const panelType = activeAxis ? "axis" : activeVertex ? "vertex" : null;

  const tabs = [
    { id: "explorer", label: "Explorer", emoji: "🔍" },
    { id: "scenarios", label: "Situations", emoji: "📋" },
    { id: "ethique", label: "Éthique", emoji: "⚡" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAFAF9",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        position: "relative",
      }}
    >
      {/* CSS animations + font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&family=Instrument+Serif:ital@0;1&display=swap');
        
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes slideIn { from { transform: translateX(100%) } to { transform: translateX(0) } }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #7C3AED;
          box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3);
          cursor: grab;
        }
        input[type="range"]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #7C3AED;
          box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3);
          cursor: grab;
        }
        
        * { box-sizing: border-box; }
        
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-bottom { display: block !important; }
        }
        @media (min-width: 769px) {
          .desktop-sidebar { display: block !important; }
          .mobile-bottom { display: none !important; }
        }
      `}</style>

      {/* Onboarding */}
      {showOnboarding && (
        <OnboardingOverlay onDismiss={() => setShowOnboarding(false)} />
      )}

      {/* HEADER */}
      <header
        style={{
          padding: "20px 24px 16px",
          borderBottom: "1px solid #e2e8f0",
          background: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 24,
                fontWeight: 400,
                fontStyle: "italic",
                color: "#0f172a",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Triangle pédagogique augmenté
            </h1>
            <p
              style={{
                fontSize: 13,
                color: "#64748b",
                margin: "4px 0 0",
              }}
            >
              Enseigner sans se trahir — où l'IA amplifie, où l'humain est
              irremplaçable
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={() => setShowRefs(true)}
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                background: "#fff",
                fontSize: 12,
                color: "#64748b",
                cursor: "pointer",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 500,
              }}
            >
              📚 Sources
            </button>
            <a
              href="https://maprofbranchee.fr"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                background: "#0D9488",
                color: "#fff",
                fontSize: 12,
                textDecoration: "none",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 600,
              }}
            >
              MaProfBranchée
            </a>
          </div>
        </div>
      </header>

      {/* NAV TABS — simplified (résout le problème "trop de choix simultanés") */}
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "12px 24px 0",
          display: "flex",
          gap: 4,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              if (tab.id !== "scenarios") setActiveScenario(null);
            }}
            style={{
              padding: "10px 18px",
              borderRadius: "10px 10px 0 0",
              border: "none",
              background:
                activeTab === tab.id ? "#fff" : "transparent",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 13,
              fontWeight: activeTab === tab.id ? 600 : 400,
              color:
                activeTab === tab.id ? "#0f172a" : "#64748b",
              cursor: "pointer",
              transition: "all 0.2s",
              borderBottom:
                activeTab === tab.id
                  ? "2px solid #7C3AED"
                  : "2px solid transparent",
            }}
          >
            {tab.emoji} {tab.label}
          </button>
        ))}
      </nav>

      {/* MAIN LAYOUT */}
      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "20px 24px 40px",
          display: "flex",
          gap: 24,
          alignItems: "flex-start",
        }}
      >
        {/* Triangle — zone principale, plus grande */}
        <div style={{ flex: "1 1 auto", minWidth: 0 }}>
          <TriangleSVG
            ethicsValue={ethicsValue}
            activeAxis={activeAxis}
            activeVertex={activeVertex}
            scenarioWeights={activeScenario?.weights}
            onAxisClick={handleAxisClick}
            onVertexClick={handleVertexClick}
          />

          {/* Guide contextuel sous le triangle (visible sans scroll — fix Ludo) */}
          <div
            style={{
              marginTop: 16,
              padding: "14px 18px",
              background: "#f8fafc",
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              textAlign: "center",
            }}
          >
            {!activeAxis && !activeVertex && !activeScenario && (
              <p
                style={{
                  fontSize: 13,
                  color: "#64748b",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                👆 Cliquez sur un{" "}
                <strong style={{ color: "#7C3AED" }}>axe</strong> ou un{" "}
                <strong style={{ color: "#0D9488" }}>sommet</strong> du
                triangle pour commencer l'exploration
              </p>
            )}
            {activeAxis && (
              <p style={{ fontSize: 13, color: "#7C3AED", margin: 0, fontWeight: 500 }}>
                📖 Panneau ouvert : {AXES.find((a) => a.id === activeAxis)?.label} →
              </p>
            )}
            {activeVertex && (
              <p style={{ fontSize: 13, color: "#0D9488", margin: 0, fontWeight: 500 }}>
                📖 Panneau ouvert : {VERTICES.find((v) => v.id === activeVertex)?.label} →
              </p>
            )}
            {activeScenario && !activeAxis && !activeVertex && (
              <p style={{ fontSize: 13, color: "#7C3AED", margin: 0, fontWeight: 500 }}>
                📋 Scénario actif : {activeScenario.emoji} {activeScenario.label}
              </p>
            )}
          </div>

          {/* Ethics slider always visible under triangle (mode "Éthique") */}
          {activeTab === "ethique" && (
            <div style={{ marginTop: 16 }}>
              <EthicsSlider value={ethicsValue} onChange={setEthicsValue} />
            </div>
          )}
        </div>

        {/* Sidebar desktop */}
        <div
          className="desktop-sidebar"
          style={{
            width: 340,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {activeTab === "scenarios" && (
            <ScenarioSelector
              activeScenario={activeScenario}
              onSelect={handleScenarioSelect}
            />
          )}
          {activeTab === "ethique" && (
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "20px 24px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <h3
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: "0 0 12px",
                }}
              >
                Les 4 zones éthiques
              </h3>
              {ETHICS_ZONES.map((z, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 12px",
                    borderRadius: 8,
                    background:
                      getEthicsZone(ethicsValue) === z ? z.bgColor : "transparent",
                    marginBottom: 4,
                    transition: "background 0.2s",
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: z.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: 12,
                      color: "#334155",
                      fontWeight: getEthicsZone(ethicsValue) === z ? 600 : 400,
                    }}
                  >
                    {z.label} ({z.min}–{z.max}%)
                  </span>
                </div>
              ))}
            </div>
          )}
          {activeTab === "explorer" && (
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "20px 24px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <h3
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: "0 0 12px",
                }}
              >
                🔍 Mode Explorer
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 13,
                  color: "#475569",
                  lineHeight: 1.6,
                  margin: "0 0 16px",
                }}
              >
                Cliquez sur chaque <strong>axe</strong> (trait entre deux sommets) ou
                chaque <strong>sommet</strong> (cercle) pour découvrir le rôle de l'IA
                et les limites de l'humain.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {AXES.map((axis) => (
                  <button
                    key={axis.id}
                    onClick={() => handleAxisClick(axis.id)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 10,
                      border:
                        activeAxis === axis.id
                          ? "2px solid #7C3AED"
                          : "1px solid #e2e8f0",
                      background:
                        activeAxis === axis.id ? "#f5f3ff" : "#fafafa",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: 13,
                      fontWeight: activeAxis === axis.id ? 600 : 400,
                      color: activeAxis === axis.id ? "#7C3AED" : "#334155",
                      transition: "all 0.2s",
                    }}
                  >
                    {axis.label}{" "}
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>
                      ({getVertexById(axis.from).label} ↔{" "}
                      {getVertexById(axis.to).label})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile bottom panel */}
      <div
        className="mobile-bottom"
        style={{
          display: "none",
          padding: "16px 20px 32px",
        }}
      >
        {activeTab === "scenarios" && (
          <ScenarioSelector
            activeScenario={activeScenario}
            onSelect={handleScenarioSelect}
          />
        )}
        {activeTab === "ethique" && (
          <EthicsSlider value={ethicsValue} onChange={setEthicsValue} />
        )}
      </div>

      {/* Detail panel overlay */}
      {panelData && (
        <DetailPanel
          type={panelType}
          data={panelData}
          onClose={() => {
            setActiveAxis(null);
            setActiveVertex(null);
          }}
        />
      )}

      {/* References modal */}
      {showRefs && <ReferencesModal onClose={() => setShowRefs(false)} />}

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "16px 24px 24px",
          borderTop: "1px solid #f1f5f9",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 12,
            color: "#94a3b8",
            margin: 0,
          }}
        >
          Cadre théorique conçu par{" "}
          <a
            href="https://maprofbranchee.fr"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0D9488", textDecoration: "none", fontWeight: 600 }}
          >
            Vanessa Le Scolan — MaProfBranchée
          </a>{" "}
          · Basé sur le Triangle de Houssaye (1988)
        </p>
      </footer>
    </div>
  );
}
