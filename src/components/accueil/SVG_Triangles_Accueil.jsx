export const TriangleHoussayeBase = () => (
  <svg
    viewBox="0 0 320 280"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Triangle pédagogique de Houssaye : trois sommets (Enseignant, Élève, Savoir) reliés par trois processus nommés Enseigner, Former et Apprendre"
    className="w-full h-auto max-w-[320px] mx-auto"
  >
    <line x1="60" y1="220" x2="160" y2="50" stroke="#0F766E" strokeWidth="2" strokeOpacity="0.75" />
    <line x1="60" y1="220" x2="260" y2="220" stroke="#D97706" strokeWidth="2" strokeOpacity="0.75" />
    <line x1="260" y1="220" x2="160" y2="50" stroke="#7C3AED" strokeWidth="2" strokeOpacity="0.75" />

    <text x="90" y="130" style={{ fill: 'var(--svg-stroke-muted)' }} fontSize="11" fontFamily="Inter, sans-serif" fontStyle="italic" transform="rotate(-60 90 130)" textAnchor="middle">enseigner</text>
    <text x="160" y="240" style={{ fill: 'var(--svg-stroke-muted)' }} fontSize="11" fontFamily="Inter, sans-serif" fontStyle="italic" textAnchor="middle">former</text>
    <text x="230" y="130" style={{ fill: 'var(--svg-stroke-muted)' }} fontSize="11" fontFamily="Inter, sans-serif" fontStyle="italic" transform="rotate(60 230 130)" textAnchor="middle">apprendre</text>

    <circle cx="160" cy="50" r="24" stroke="#7C3AED" strokeWidth="1.5" style={{ fill: 'var(--svg-circle-fill)', filter: 'drop-shadow(0 2px 4px rgba(15,23,42,0.08))' }} />
    <text x="160" y="54" style={{ fill: 'rgb(var(--text-primary))' }} fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">Savoir</text>

    <circle cx="60" cy="220" r="26" stroke="#0F766E" strokeWidth="1.5" style={{ fill: 'var(--svg-circle-fill)', filter: 'drop-shadow(0 2px 4px rgba(15,23,42,0.08))' }} />
    <text x="60" y="218" style={{ fill: 'rgb(var(--text-primary))' }} fontSize="10.5" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">Ensei-</text>
    <text x="60" y="230" style={{ fill: 'rgb(var(--text-primary))' }} fontSize="10.5" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">gnant</text>

    <circle cx="260" cy="220" r="24" stroke="#D97706" strokeWidth="1.5" style={{ fill: 'var(--svg-circle-fill)', filter: 'drop-shadow(0 2px 4px rgba(15,23,42,0.08))' }} />
    <text x="260" y="224" style={{ fill: 'rgb(var(--text-primary))' }} fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">Élève</text>
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
      <filter id="softGlowViolet" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="5" result="violetBlur" />
        <feMerge>
          <feMergeNode in="violetBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id="haloIAlight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.45" />
        <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.45" />
      </linearGradient>
      <marker id="arrowheadLight" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <polygon points="0 0, 6 3, 0 6" fill="#7C3AED" opacity="0.7" />
      </marker>
    </defs>

    <line x1="60" y1="220" x2="160" y2="50" stroke="#0F766E" strokeWidth="2" strokeOpacity="0.9" />
    <line x1="60" y1="220" x2="260" y2="220" stroke="#D97706" strokeWidth="2" strokeOpacity="0.9" />
    <line x1="260" y1="220" x2="160" y2="50" stroke="#7C3AED" strokeWidth="2" strokeOpacity="0.9" />

    <line x1="75" y1="203" x2="155" y2="67" stroke="url(#haloIAlight)" strokeWidth="12" strokeLinecap="round" filter="url(#softGlowViolet)" opacity="0.55">
      <animate attributeName="opacity" values="0.4;0.65;0.4" dur="4s" repeatCount="indefinite" />
    </line>
    <line x1="88" y1="220" x2="232" y2="220" stroke="url(#haloIAlight)" strokeWidth="12" strokeLinecap="round" filter="url(#softGlowViolet)" opacity="0.55">
      <animate attributeName="opacity" values="0.4;0.65;0.4" dur="4s" begin="1.3s" repeatCount="indefinite" />
    </line>
    <line x1="245" y1="203" x2="165" y2="67" stroke="url(#haloIAlight)" strokeWidth="12" strokeLinecap="round" filter="url(#softGlowViolet)" opacity="0.55">
      <animate attributeName="opacity" values="0.4;0.65;0.4" dur="4s" begin="2.6s" repeatCount="indefinite" />
    </line>

    <text x="12" y="100" fill="#7C3AED" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="500" fontStyle="italic">IA</text>
    <text x="12" y="114" fill="#7C3AED" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="500" fontStyle="italic">périphérique</text>
    <line x1="55" y1="110" x2="85" y2="145" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.7" markerEnd="url(#arrowheadLight)" />

    <circle cx="160" cy="50" r="24" stroke="#7C3AED" strokeWidth="1.5" style={{ fill: 'var(--svg-circle-fill)', filter: 'drop-shadow(0 2px 4px rgba(15,23,42,0.08))' }} />
    <text x="160" y="54" style={{ fill: 'rgb(var(--text-primary))' }} fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">Savoir</text>

    <circle cx="60" cy="220" r="26" stroke="#0F766E" strokeWidth="1.5" style={{ fill: 'var(--svg-circle-fill)', filter: 'drop-shadow(0 2px 4px rgba(15,23,42,0.08))' }} />
    <text x="60" y="218" style={{ fill: 'rgb(var(--text-primary))' }} fontSize="10.5" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">Ensei-</text>
    <text x="60" y="230" style={{ fill: 'rgb(var(--text-primary))' }} fontSize="10.5" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">gnant</text>

    <circle cx="260" cy="220" r="24" stroke="#D97706" strokeWidth="1.5" style={{ fill: 'var(--svg-circle-fill)', filter: 'drop-shadow(0 2px 4px rgba(15,23,42,0.08))' }} />
    <text x="260" y="224" style={{ fill: 'rgb(var(--text-primary))' }} fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">Élève</text>

    <text x="160" y="268" style={{ fill: 'var(--svg-stroke-muted)' }} fontSize="11" fontFamily="Inter, sans-serif" fontWeight="500" fontStyle="italic" textAnchor="middle">Humain au cœur — IA en périphérie</text>
  </svg>
);
