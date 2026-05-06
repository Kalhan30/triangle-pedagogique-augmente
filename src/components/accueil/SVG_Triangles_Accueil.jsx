export const TriangleHoussayeBase = () => (
  <svg
    viewBox="0 0 320 300"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Triangle pédagogique de Houssaye : trois sommets (Enseignant, Élève, Savoir) reliés par trois processus nommés Enseigner, Former et Apprendre"
    className="w-full h-auto max-w-[320px] mx-auto"
  >
    <line x1="60" y1="220" x2="160" y2="50" stroke="#0F766E" strokeWidth="2.5" strokeOpacity="1" />
    <line x1="60" y1="220" x2="260" y2="220" stroke="#D97706" strokeWidth="2.5" strokeOpacity="1" />
    <line x1="260" y1="220" x2="160" y2="50" stroke="#7C3AED" strokeWidth="2.5" strokeOpacity="1" />

    <text x="90" y="130" style={{ fill: 'var(--svg-stroke-muted)' }} fontSize="13" fontFamily="Inter, sans-serif" fontWeight="600" opacity="0.85" transform="rotate(-60 90 130)" textAnchor="middle">enseigner</text>
    <text x="160" y="255" style={{ fill: 'var(--svg-stroke-muted)' }} fontSize="13" fontFamily="Inter, sans-serif" fontWeight="600" opacity="0.85" textAnchor="middle">former</text>
    <text x="230" y="130" style={{ fill: 'var(--svg-stroke-muted)' }} fontSize="13" fontFamily="Inter, sans-serif" fontWeight="600" opacity="0.85" transform="rotate(60 230 130)" textAnchor="middle">apprendre</text>

    <circle cx="160" cy="50" r="30" stroke="#7C3AED" strokeWidth="1.5" style={{ fill: 'var(--svg-circle-fill)', filter: 'drop-shadow(0 2px 4px rgba(15,23,42,0.08))' }} />
    <text x="160" y="55" style={{ fill: 'rgb(var(--text-primary))' }} fontSize="13" fontFamily="Inter, sans-serif" fontWeight="700" textAnchor="middle">Savoir</text>

    <circle cx="60" cy="220" r="38" stroke="#0F766E" strokeWidth="1.5" style={{ fill: 'var(--svg-circle-fill)', filter: 'drop-shadow(0 2px 4px rgba(15,23,42,0.08))' }} />
    <text x="60" y="225" style={{ fill: 'rgb(var(--text-primary))' }} fontSize="11" fontFamily="Inter, sans-serif" fontWeight="700" textAnchor="middle">Enseignant</text>

    <circle cx="260" cy="220" r="30" stroke="#D97706" strokeWidth="1.5" style={{ fill: 'var(--svg-circle-fill)', filter: 'drop-shadow(0 2px 4px rgba(15,23,42,0.08))' }} />
    <text x="260" y="225" style={{ fill: 'rgb(var(--text-primary))' }} fontSize="13" fontFamily="Inter, sans-serif" fontWeight="700" textAnchor="middle">Élève</text>
  </svg>
);

export const TriangleAugmenteIA = () => (
  <svg
    viewBox="0 0 320 300"
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
    <style>{`
      .ia-halo-pulse-1 { animation: iaHaloPulse 4s ease-in-out infinite; }
      .ia-halo-pulse-2 { animation: iaHaloPulse 4s ease-in-out infinite -2.7s; }
      .ia-halo-pulse-3 { animation: iaHaloPulse 4s ease-in-out infinite -1.4s; }
      @keyframes iaHaloPulse {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.65; }
      }
      @media (prefers-reduced-motion: reduce) {
        .ia-halo-pulse-1, .ia-halo-pulse-2, .ia-halo-pulse-3 { animation: none; opacity: 0.5; }
      }
    `}</style>

    <line x1="60" y1="220" x2="160" y2="50" stroke="#0F766E" strokeWidth="2.5" strokeOpacity="1" />
    <line x1="60" y1="220" x2="260" y2="220" stroke="#D97706" strokeWidth="2.5" strokeOpacity="1" />
    <line x1="260" y1="220" x2="160" y2="50" stroke="#7C3AED" strokeWidth="2.5" strokeOpacity="1" />

    <line className="ia-halo-pulse-1" x1="75" y1="203" x2="155" y2="67" stroke="url(#haloIAlight)" strokeWidth="12" strokeLinecap="round" filter="url(#softGlowViolet)" />
    <line className="ia-halo-pulse-2" x1="88" y1="220" x2="232" y2="220" stroke="url(#haloIAlight)" strokeWidth="12" strokeLinecap="round" filter="url(#softGlowViolet)" />
    <line className="ia-halo-pulse-3" x1="245" y1="203" x2="165" y2="67" stroke="url(#haloIAlight)" strokeWidth="12" strokeLinecap="round" filter="url(#softGlowViolet)" />

    <rect x="6" y="92" width="92" height="22" rx="11" style={{ fill: 'var(--svg-circle-fill)' }} stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.5" />
    <text x="52" y="107" fill="#7C3AED" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">IA périphérique</text>
    <line x1="65" y1="116" x2="85" y2="145" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.7" markerEnd="url(#arrowheadLight)" />

    <circle cx="160" cy="50" r="30" stroke="#7C3AED" strokeWidth="1.5" style={{ fill: 'var(--svg-circle-fill)', filter: 'drop-shadow(0 2px 4px rgba(15,23,42,0.08))' }} />
    <text x="160" y="55" style={{ fill: 'rgb(var(--text-primary))' }} fontSize="13" fontFamily="Inter, sans-serif" fontWeight="700" textAnchor="middle">Savoir</text>

    <circle cx="60" cy="220" r="38" stroke="#0F766E" strokeWidth="1.5" style={{ fill: 'var(--svg-circle-fill)', filter: 'drop-shadow(0 2px 4px rgba(15,23,42,0.08))' }} />
    <text x="60" y="225" style={{ fill: 'rgb(var(--text-primary))' }} fontSize="11" fontFamily="Inter, sans-serif" fontWeight="700" textAnchor="middle">Enseignant</text>

    <circle cx="260" cy="220" r="30" stroke="#D97706" strokeWidth="1.5" style={{ fill: 'var(--svg-circle-fill)', filter: 'drop-shadow(0 2px 4px rgba(15,23,42,0.08))' }} />
    <text x="260" y="225" style={{ fill: 'rgb(var(--text-primary))' }} fontSize="13" fontFamily="Inter, sans-serif" fontWeight="700" textAnchor="middle">Élève</text>

    <text x="160" y="290" style={{ fill: 'var(--svg-stroke-muted)' }} fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600" textAnchor="middle">Humain au cœur — IA en périphérie</text>
  </svg>
);
