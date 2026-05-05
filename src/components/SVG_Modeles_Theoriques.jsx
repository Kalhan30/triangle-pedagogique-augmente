import React from 'react';

export const TetraedreFaerber = () => (
  <svg
    viewBox="0 0 320 300"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Tétraèdre de Faerber : ajout du pôle Groupe au sommet du triangle de Houssaye"
    className="w-full h-auto max-w-[320px] mx-auto"
  >
    <defs>
      <filter id="glowFaerber" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Arêtes cachées / arrière plan */}
    <line x1="60" y1="240" x2="160" y2="130" stroke="#0F766E" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
    <line x1="260" y1="240" x2="160" y2="130" stroke="#D97706" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
    <line x1="160" y1="40" x2="160" y2="130" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

    {/* Textes arêtes arrière */}
    <text x="100" y="170" fill="var(--svg-stroke-muted)" fontSize="9" fontFamily="Inter" fontStyle="italic" opacity="0.8">enseigner</text>
    <text x="220" y="170" fill="var(--svg-stroke-muted)" fontSize="9" fontFamily="Inter" fontStyle="italic" opacity="0.8">apprendre</text>
    <text x="170" y="90" fill="var(--svg-stroke-muted)" fontSize="9" fontFamily="Inter" fontStyle="italic" opacity="0.8">partager</text>

    {/* Arêtes avant */}
    <line x1="60" y1="240" x2="260" y2="240" stroke="#0F766E" strokeWidth="2" opacity="0.8" />
    <line x1="60" y1="240" x2="160" y2="40" stroke="#3B82F6" strokeWidth="2" opacity="0.8" />
    <line x1="260" y1="240" x2="160" y2="40" stroke="#EAB308" strokeWidth="2" opacity="0.8" />

    {/* Halo IA central rayonnant */}
    <circle cx="160" cy="150" r="25" fill="#7C3AED" filter="url(#glowFaerber)" opacity="0.25">
      <animate attributeName="opacity" values="0.15;0.35;0.15" dur="4s" repeatCount="indefinite" />
      <animate attributeName="r" values="20;35;20" dur="4s" repeatCount="indefinite" />
    </circle>
    <text x="160" y="153" fill="#7C3AED" fontSize="10" fontFamily="Inter" fontWeight="600" textAnchor="middle" opacity="0.8">IA</text>

    {/* Textes arêtes avant */}
    <text x="160" y="255" fill="var(--svg-stroke-muted)" fontSize="10" fontFamily="Inter" fontStyle="italic" textAnchor="middle">former</text>
    <text x="95" y="130" fill="var(--svg-stroke-muted)" fontSize="10" fontFamily="Inter" fontStyle="italic" transform="rotate(-63 95 130)">faciliter</text>
    <text x="225" y="130" fill="var(--svg-stroke-muted)" fontSize="10" fontFamily="Inter" fontStyle="italic" transform="rotate(63 225 130)">participer</text>

    {/* Nœud arrière : Savoir */}
    <circle cx="160" cy="130" r="18" fill="var(--svg-circle-fill)" stroke="#7C3AED" strokeWidth="1.5" />
    <text x="160" y="133" fill="var(--text-primary)" fontSize="9" fontFamily="Inter" fontWeight="600" textAnchor="middle">Savoir</text>

    {/* Nœuds avant : Enseignant, Élève, Groupe */}
    <circle cx="160" cy="40" r="24" fill="var(--svg-circle-fill)" stroke="#3B82F6" strokeWidth="1.5" />
    <text x="160" y="44" fill="var(--text-primary)" fontSize="11" fontFamily="Inter" fontWeight="600" textAnchor="middle">Groupe</text>

    <circle cx="60" cy="240" r="24" fill="var(--svg-circle-fill)" stroke="#0F766E" strokeWidth="1.5" />
    <text x="60" y="238" fill="var(--text-primary)" fontSize="9" fontFamily="Inter" fontWeight="600" textAnchor="middle">Ensei-</text>
    <text x="60" y="248" fill="var(--text-primary)" fontSize="9" fontFamily="Inter" fontWeight="600" textAnchor="middle">gnant</text>

    <circle cx="260" cy="240" r="24" fill="var(--svg-circle-fill)" stroke="#D97706" strokeWidth="1.5" />
    <text x="260" y="244" fill="var(--text-primary)" fontSize="11" fontFamily="Inter" fontWeight="600" textAnchor="middle">Élève</text>
  </svg>
);

export const SAMRScale = () => (
  <svg
    viewBox="0 0 320 240"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Modèle SAMR : Substitution, Augmentation, Modification, Redéfinition"
    className="w-full h-auto max-w-[320px] mx-auto"
  >
    {/* Grille de fond optionnelle */}
    <line x1="40" y1="20" x2="40" y2="220" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="2 2" />
    
    {/* Ligne de séparation Transformation / Amélioration */}
    <line x1="20" y1="120" x2="300" y2="120" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.5" />
    <text x="300" y="115" fill="var(--text-muted)" fontSize="9" fontFamily="Inter" fontStyle="italic" textAnchor="end">Seuil de transformation</text>

    {/* Substitution */}
    <rect x="40" y="180" width="65" height="40" rx="4" fill="#64748B" opacity="0.9" />
    <text x="72" y="204" fill="white" fontSize="10" fontFamily="Inter" fontWeight="600" textAnchor="middle">S</text>
    <text x="115" y="198" fill="var(--text-primary)" fontSize="11" fontFamily="Inter" fontWeight="600">Substitution</text>
    <text x="115" y="212" fill="var(--text-secondary)" fontSize="9" fontFamily="Inter">Outil remplaçant</text>

    {/* Augmentation */}
    <rect x="80" y="140" width="65" height="40" rx="4" fill="#0F766E" opacity="0.9" />
    <text x="112" y="164" fill="white" fontSize="10" fontFamily="Inter" fontWeight="600" textAnchor="middle">A</text>
    <text x="155" y="158" fill="var(--text-primary)" fontSize="11" fontFamily="Inter" fontWeight="600">Augmentation</text>
    <text x="155" y="172" fill="var(--text-secondary)" fontSize="9" fontFamily="Inter">Outil améliorant</text>

    {/* Modification */}
    <rect x="120" y="80" width="65" height="40" rx="4" fill="#D97706" opacity="0.9" />
    <text x="152" y="104" fill="white" fontSize="10" fontFamily="Inter" fontWeight="600" textAnchor="middle">M</text>
    <text x="195" y="98" fill="var(--text-primary)" fontSize="11" fontFamily="Inter" fontWeight="600">Modification</text>
    <text x="195" y="112" fill="var(--text-secondary)" fontSize="9" fontFamily="Inter">Tâche reconfigurée</text>

    {/* Redéfinition */}
    <rect x="160" y="20" width="65" height="40" rx="4" fill="#7C3AED" opacity="0.9" />
    <text x="192" y="44" fill="white" fontSize="10" fontFamily="Inter" fontWeight="600" textAnchor="middle">R</text>
    <text x="235" y="38" fill="var(--text-primary)" fontSize="11" fontFamily="Inter" fontWeight="600">Redéfinition</text>
    <text x="235" y="52" fill="var(--text-secondary)" fontSize="9" fontFamily="Inter">Tâche inédite</text>

    {/* Flèche d'ascension */}
    <defs>
      <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
        <polygon points="0 0, 6 3, 0 6" fill="var(--text-muted)" />
      </marker>
    </defs>
    <path d="M 20 200 L 20 40" stroke="var(--text-muted)" strokeWidth="2" fill="none" markerEnd="url(#arrow)" opacity="0.5" />
  </svg>
);

export const TPACKVenn = () => (
  <svg
    viewBox="0 0 320 320"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Modèle TPACK et I-TPACK : Intersection des savoirs pédagogiques, disciplinaires et technologiques, englobée par l'éthique de l'IA"
    className="w-full h-auto max-w-[320px] mx-auto"
  >
    {/* Anneau extérieur I-TPACK */}
    <circle cx="160" cy="160" r="140" fill="none" stroke="#7C3AED" strokeWidth="2" strokeDasharray="6 6" opacity="0.4" />
    <text x="160" y="35" fill="#7C3AED" fontSize="10" fontFamily="Inter" fontWeight="600" textAnchor="middle" opacity="0.8">
      I-TPACK : Éthique & Littératie IA
    </text>

    {/* Savoirs Pédagogiques (Teal) */}
    <circle cx="120" cy="190" r="80" fill="#0F766E" opacity="0.25" stroke="#0F766E" strokeWidth="1.5" />
    <text x="85" y="235" fill="var(--text-primary)" fontSize="10" fontFamily="Inter" fontWeight="600" textAnchor="middle">Savoirs</text>
    <text x="85" y="247" fill="var(--text-primary)" fontSize="10" fontFamily="Inter" fontWeight="600" textAnchor="middle">Pédago.</text>

    {/* Savoirs Disciplinaires (Ambre) */}
    <circle cx="200" cy="190" r="80" fill="#D97706" opacity="0.25" stroke="#D97706" strokeWidth="1.5" />
    <text x="235" y="235" fill="var(--text-primary)" fontSize="10" fontFamily="Inter" fontWeight="600" textAnchor="middle">Savoirs</text>
    <text x="235" y="247" fill="var(--text-primary)" fontSize="10" fontFamily="Inter" fontWeight="600" textAnchor="middle">Disciplin.</text>

    {/* Savoirs Technologiques (Violet) */}
    <circle cx="160" cy="110" r="80" fill="#7C3AED" opacity="0.25" stroke="#7C3AED" strokeWidth="1.5" />
    <text x="160" y="80" fill="var(--text-primary)" fontSize="10" fontFamily="Inter" fontWeight="600" textAnchor="middle">Savoirs</text>
    <text x="160" y="92" fill="var(--text-primary)" fontSize="10" fontFamily="Inter" fontWeight="600" textAnchor="middle">Techno.</text>

    {/* Intersection centrale TPACK */}
    <text x="160" y="165" fill="var(--text-primary)" fontSize="12" fontFamily="Inter" fontWeight="700" textAnchor="middle">TPACK</text>
    
    {/* Intersections partielles */}
    <text x="160" y="215" fill="var(--text-secondary)" fontSize="9" fontFamily="Inter" fontStyle="italic" textAnchor="middle" opacity="0.8">PCK</text>
    <text x="110" y="145" fill="var(--text-secondary)" fontSize="9" fontFamily="Inter" fontStyle="italic" textAnchor="middle" opacity="0.8">TPK</text>
    <text x="210" y="145" fill="var(--text-secondary)" fontSize="9" fontFamily="Inter" fontStyle="italic" textAnchor="middle" opacity="0.8">TCK</text>
  </svg>
);
