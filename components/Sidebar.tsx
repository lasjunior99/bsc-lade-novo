
import React from 'react';
import { MENU_ITEMS, COLORS } from '../constants';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  return (
    <aside 
      className="fixed left-0 top-0 h-screen w-64 flex flex-col border-r shadow-sm transition-all z-50"
      style={{ backgroundColor: COLORS.sidebar, borderColor: COLORS.border }}
    >
      {/* Logo Section */}
      <div className="p-6 border-b" style={{ borderColor: COLORS.border }}>
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2" style={{ color: COLORS.primary }}>
          <div className="w-8 h-8 rounded bg-blue-900 flex items-center justify-center text-white text-xs font-black">LA</div>
          BSC-LADE
        </h1>
        <p className="text-[10px] uppercase tracking-widest mt-1 opacity-60">Gestão da Estratégia</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {MENU_ITEMS.map((item) => {
            const isActive = currentPage === item.key;

            return (
              <li key={item.key}>
                <button
                  onClick={() => onNavigate(item.key)}
                  className={`w-full text-left px-6 py-3 flex items-center gap-3 transition-all
                    ${isActive ? 'bg-white border-r-4' : 'opacity-70 hover:opacity-100 hover:bg-white/30'}
                  `}
                  style={{ 
                    borderRightColor: isActive ? COLORS.primary : 'transparent',
                    color: COLORS.primary 
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Persistent Actions */}
      <div className="p-4 border-t space-y-2 bg-white/50" style={{ borderColor: COLORS.border }}>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white rounded transition-all border border-transparent hover:border-slate-200">
          <span>💾</span> Salvar Rascunho
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white rounded transition-all border border-transparent hover:border-slate-200">
          <span>📄</span> Exportar Relatório PDF
        </button>
        <div className="pt-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 opacity-80 hover:opacity-100 transition-all">
            <span>🚪</span> Sair do Sistema
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
