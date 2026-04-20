import { useMemo } from 'react';
import { GraduationCap, Users, BookOpen } from 'lucide-react';
import { AXES_META, VERTICES_META, getZoneEthique } from '../data/niveaux.js';

const POSITIONS = {
  enseignant: { x: 350, y: 80 },
  eleve: { x: 120, y: 430 },
  savoir: { x: 580, y: 430 },
};

const VERTEX_ICONS = {
  enseignant: GraduationCap,
  eleve: Users,
  savoir: BookOpen,
};

function strokeConfig(activation) {
  if (activation < 20) return { width: 1, opacity: 0.25 };
  if (activation < 50) return { width: 2, opacity: 0.5 };
  if (activation < 80) return { width: 3, opacity: 0.75 };
  return { width: 4, opacity: 1 };
}

export default function Triangle({
  axes = { enseignantSavoir: 50, enseignantEleve: 50, eleveSavoir: 50 },
  selectedVertex = null,
  selectedAxis = null,
  onSelectVertex,
  onSelectAxis,
  ethicsValue = 0,
}) {
  const haloColor = useMemo(() => getZoneEthique(ethicsValue).color, [ethicsValue]);
  const haloOpacity = 0.1 + (ethicsValue / 100) * 0.8;

  const axisEdges = [
    { id: 'enseignantSavoir', from: 'enseignant', to: 'savoir', activation: axes.enseignantSavoir },
    { id: 'enseignantEleve', from: 'enseignant', to: 'eleve', activation: axes.enseignantEleve },
    { id: 'eleveSavoir', from: 'eleve', to: 'savoir', activation: axes.eleveSavoir },
  ];

  const trianglePath = `M ${POSITIONS.enseignant.x} ${POSITIONS.enseignant.y} L ${POSITIONS.eleve.x} ${POSITIONS.eleve.y} L ${POSITIONS.savoir.x} ${POSITIONS.savoir.y} Z`;

  return (
    <svg viewBox="0 0 700 510" className="w-full h-auto select-none" style={{ maxWidth: 680 }} role="img" aria-label="Triangle pédagogique interactif">
      <defs>
        <radialGradient id="halo-gradient" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor={haloColor} stopOpacity={haloOpacity} />
          <stop offset="100%" stopColor={haloColor} stopOpacity="0" />
        </radialGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>

      <path d={trianglePath} fill="url(#halo-gradient)" style={{ transition: 'fill 400ms' }} />

      {axisEdges.map((edge) => {
        const axisMeta = AXES_META[edge.id];
        const { width, opacity } = strokeConfig(edge.activation);
        const isSelected = selectedAxis === edge.id;
        const p1 = POSITIONS[edge.from];
        const p2 = POSITIONS[edge.to];
        const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
        return (
          <g key={edge.id}>
            <line
              x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke={axisMeta.color}
              strokeWidth={isSelected ? width + 2 : width}
              strokeOpacity={isSelected ? 1 : opacity}
              style={{ cursor: 'pointer', transition: 'all 200ms', filter: isSelected ? 'url(#glow)' : 'none' }}
              onClick={() => onSelectAxis?.(edge.id)}
              role="button"
              aria-label={`Axe ${axisMeta.label}, activation ${edge.activation}`}
            />
            <rect
              x={mid.x - 50} y={mid.y - 14} width={100} height={24} rx={12}
              fill="#FFFFFF" stroke={axisMeta.color} strokeOpacity={0.7}
              style={{ cursor: 'pointer', filter: 'drop-shadow(0 1px 2px rgba(15,23,42,0.06))' }}
              onClick={() => onSelectAxis?.(edge.id)}
            />
            <text x={mid.x} y={mid.y + 4} textAnchor="middle" fill={axisMeta.color} fontSize="11" fontWeight="600" style={{ pointerEvents: 'none' }}>
              {axisMeta.shortLabel}
            </text>
          </g>
        );
      })}

      {Object.values(VERTICES_META).map((v) => {
        const pos = POSITIONS[v.id];
        const isSelected = selectedVertex === v.id;
        const Icon = VERTEX_ICONS[v.id];
        return (
          <g key={v.id} style={{ cursor: 'pointer' }} onClick={() => onSelectVertex?.(v.id)}>
            <circle
              cx={pos.x} cy={pos.y} r={isSelected ? 38 : 34}
              fill="#FFFFFF" stroke={v.color}
              strokeWidth={isSelected ? 3 : 2}
              style={{ transition: 'all 200ms', filter: isSelected ? 'url(#glow)' : 'drop-shadow(0 2px 4px rgba(15,23,42,0.08))' }}
            />
            <foreignObject x={pos.x - 12} y={pos.y - 12} width={24} height={24} style={{ pointerEvents: 'none' }}>
              <div style={{ color: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={24} strokeWidth={1.5} />
              </div>
            </foreignObject>
            <text x={pos.x} y={pos.y + 58} textAnchor="middle" fill={v.color} fontSize="14" fontWeight="600">
              {v.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
