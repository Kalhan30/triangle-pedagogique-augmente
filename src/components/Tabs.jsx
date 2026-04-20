import { Compass, Sparkles, Shield, FileText } from 'lucide-react';
import { useApp } from '../contexts/AppContext.jsx';

const TABS = [
  { id: 'explorer', label: 'Explorer', Icon: Compass },
  { id: 'situations', label: 'Situations', Icon: Sparkles },
  { id: 'ethique', label: 'Éthique', Icon: Shield },
  { id: 'diagnostic', label: 'Mon Diagnostic', Icon: FileText },
];

export default function Tabs() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex gap-1 overflow-x-auto">
        {TABS.map(({ id, label, Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                active
                  ? 'border-brand-teal-primary text-brand-teal-primary'
                  : 'border-transparent text-text-secondary hover:text-text hover:border-border'
              }`}
              aria-current={active ? 'page' : undefined}
              role="tab"
              aria-selected={active}
            >
              <Icon size={16} strokeWidth={1.75} />
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
