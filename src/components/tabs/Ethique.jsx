import Triangle from '../Triangle.jsx';
import { ETHICS_ZONES, getZoneEthique } from '../../data/niveaux.js';
import { ZONE_CITATIONS } from '../../data/cadre.js';
import { useApp } from '../../contexts/AppContext.jsx';

export default function Ethique() {
  const { ethicsValue, setEthicsValue } = useApp();
  const zone = getZoneEthique(ethicsValue);
  const cadreZone = ZONE_CITATIONS[zone.id];

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-6 grid md:grid-cols-[1fr_380px] gap-6 animate-fade">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Curseur éthique</h2>
        <Triangle
          axes={{ enseignantSavoir: 60, enseignantEleve: 60, eleveSavoir: 60 }}
          ethicsValue={ethicsValue}
        />

        <div className="mt-6">
          <div
            className="h-3 rounded-full mb-3"
            style={{
              background: 'linear-gradient(to right, #0F766E 0%, #059669 25%, #059669 60%, #D97706 60%, #D97706 85%, #DC2626 85%, #DC2626 100%)',
              opacity: 0.55,
            }}
            aria-hidden="true"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={ethicsValue}
            onChange={(e) => setEthicsValue(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: zone.color }}
            aria-label="Curseur éthique, zone actuelle"
            aria-valuenow={ethicsValue}
            aria-valuemin={0}
            aria-valuemax={100}
          />
          <div className="relative h-4 mt-2 text-xs text-text-muted">
            <span className="absolute" style={{ left: '0%' }}>0 %</span>
            <span className="absolute" style={{ left: '25%', transform: 'translateX(-50%)' }}>25 %</span>
            <span className="absolute" style={{ left: '60%', transform: 'translateX(-50%)' }}>60 %</span>
            <span className="absolute" style={{ left: '85%', transform: 'translateX(-50%)' }}>85 %</span>
            <span className="absolute" style={{ right: '0%' }}>100 %</span>
          </div>
        </div>
      </div>

      <aside className="card p-6" style={{ transition: 'background 400ms', background: zone.bgColor }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: zone.color }}></span>
          <h3 className="text-lg font-semibold" style={{ color: zone.color }}>{zone.label}</h3>
          {zone.badge && (
            <span className="ml-auto text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded text-white" style={{ background: zone.color }}>
              {zone.badge}
            </span>
          )}
        </div>
        <p className="text-2xl font-bold mb-3 text-text">{ethicsValue} %</p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: zone.color }}>{zone.message}</p>

        {cadreZone && (
          <div className="p-3 rounded-lg bg-white border border-border-subtle mb-4">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-text-muted mb-2">Citation du Cadre d'usage — Juin 2025</p>
            <p className="text-xs italic text-text-secondary leading-relaxed mb-2">« {cadreZone.citation} »</p>
            <p className="text-xs text-text-muted">{cadreZone.interpretation}</p>
          </div>
        )}

        <div className="border-t border-border-subtle pt-4 mt-4">
          <p className="text-xs uppercase tracking-wide text-text-muted mb-2">Toutes les zones</p>
          <ul className="space-y-1">
            {ETHICS_ZONES.map((z) => (
              <li key={z.id} className={`flex items-center gap-2 text-xs ${z.id === zone.id ? 'text-text font-semibold' : 'text-text-muted'}`}>
                <span className="inline-block w-2 h-2 rounded-full" style={{ background: z.color }}></span>
                <span>{z.label}</span>
                <span className="ml-auto">{z.min}-{z.max} %</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}
