export const TriangleHoussayeBase = () => (
  <svg
    viewBox="0 0 320 280"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Triangle pédagogique de Houssaye : trois sommets (Enseignant, Élève, Savoir) reliés par trois axes nommés Préparer, Enseigner et Apprendre"
    className="w-full h-auto max-w-[320px] mx-auto"
  >
    <defs>
      <filter id="glowTeal" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <line x1="60" y1="220" x2="160" y2="50" stroke="#14B8A6" strokeWidth="2" strokeOpacity="0.6" />
    <line x1="60" y1="220" x2="260" y2="220" stroke="#F59E0B" strokeWidth="2" strokeOpacity="0.6" />
    <line x1="260" y1="220" x2="160" y2="50" stroke="#8B5CF6" strokeWidth="2" strokeOpacity="0.6" />

    <text x="90" y="130" fill="#E2E8F0" fontSize="11" fontFamily="Inter, sans-serif" fontStyle="italic" transform="rotate(-60 90 130)" textAnchor="middle">préparer</text>
    <text x="160" y="240" fill="#E2E8F0" fontSize="11" fontFamily="Inter, sans-serif" fontStyle="italic" textAnchor="middle">enseigner</text>
    <text x="230" y="130" fill="#E2E8F0" fontSize="11" fontFamily="Inter, sans-serif" fontStyle="italic" transform="rotate(60 230 130)" textAnchor="middle">apprendre</text>

    <circle cx="160" cy="50" r="24" fill="#1E293B" stroke="#14B8A6" strokeWidth="2.5" filter="url(#glowTeal)" />
    <text x="160" y="54" fill="#F8FAFC" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">Savoir</text>

    <circle cx="60" cy="220" r="26" fill="#1E293B" stroke="#14B8A6" strokeWidth="2.5" filter="url(#glowTeal)" />
    <text x="60" y="218" fill="#F8FAFC" fontSize="10.5" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">Ensei-</text>
    <text x="60" y="230" fill="#F8FAFC" fontSize="10.5" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">gnant</text>

    <circle cx="260" cy="220" r="24" fill="#1E293B" stroke="#14B8A6" strokeWidth="2.5" filter="url(#glowTeal)" />
    <text x="260" y="224" fill="#F8FAFC" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">Élève</text>
  </svg>
);

export const TriangleAugmenteIA = () => (
  <svg
    viewBox="0 0 320 280"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Triangle Pédagogique Augmenté : un halo violet représentant l'IA entoure les axes du triangle sans toucher les sommets Enseignant, Élève et Savoir, matérialisant le principe humain au cœur, IA en périphérie"
    className="w-full h-auto max-w-[320px] mx-auto"
  >
    <defs>
      <filter id="glowTealAug" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="glowViolet" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="violetBlur" />
        <feMerge>
          <feMergeNode in="violetBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id="haloIA" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#C4B5FD" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
      </linearGradient>
      <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <polygon points="0 0, 6 3, 0 6" fill="#C4B5FD" opacity="0.7" />
      </marker>
    </defs>

    <line x1="60" y1="220" x2="160" y2="50" stroke="#14B8A6" strokeWidth="2" strokeOpacity="0.9" />
    <line x1="60" y1="220" x2="260" y2="220" stroke="#F59E0B" strokeWidth="2" strokeOpacity="0.9" />
    <line x1="260" y1="220" x2="160" y2="50" stroke="#8B5CF6" strokeWidth="2" strokeOpacity="0.9" />

    <line x1="75" y1="203" x2="155" y2="67" stroke="url(#haloIA)" strokeWidth="14" strokeLinecap="round" filter="url(#glowViolet)" opacity="0.65">
      <animate attributeName="opacity" values="0.5;0.75;0.5" dur="4s" repeatCount="indefinite" />
    </line>
    <line x1="88" y1="220" x2="232" y2="220" stroke="url(#haloIA)" strokeWidth="14" strokeLinecap="round" filter="url(#glowViolet)" opacity="0.65">
      <animate attributeName="opacity" values="0.5;0.75;0.5" dur="4s" begin="1.3s" repeatCount="indefinite" />
    </line>
    <line x1="245" y1="203" x2="165" y2="67" stroke="url(#haloIA)" strokeWidth="14" strokeLinecap="round" filter="url(#glowViolet)" opacity="0.65">
      <animate attributeName="opacity" values="0.5;0.75;0.5" dur="4s" begin="2.6s" repeatCount="indefinite" />
    </line>

    <text x="12" y="100" fill="#C4B5FD" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="500" fontStyle="italic">IA</text>
    <text x="12" y="114" fill="#C4B5FD" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="500" fontStyle="italic">périphérique</text>
    <line x1="55" y1="110" x2="85" y2="145" stroke="#C4B5FD" strokeWidth="1" strokeOpacity="0.7" markerEnd="url(#arrowhead)" />

    <circle cx="160" cy="50" r="24" fill="#1E293B" stroke="#14B8A6" strokeWidth="2.5" filter="url(#glowTealAug)" />
    <text x="160" y="54" fill="#F8FAFC" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">Savoir</text>

    <circle cx="60" cy="220" r="26" fill="#1E293B" stroke="#14B8A6" strokeWidth="2.5" filter="url(#glowTealAug)" />
    <text x="60" y="218" fill="#F8FAFC" fontSize="10.5" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">Ensei-</text>
    <text x="60" y="230" fill="#F8FAFC" fontSize="10.5" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">gnant</text>

    <circle cx="260" cy="220" r="24" fill="#1E293B" stroke="#14B8A6" strokeWidth="2.5" filter="url(#glowTealAug)" />
    <text x="260" y="224" fill="#F8FAFC" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">Élève</text>

    <text x="160" y="268" fill="#FDE68A" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="500" fontStyle="italic" textAnchor="middle">Humain au cœur — IA en périphérie</text>
  </svg>
);
