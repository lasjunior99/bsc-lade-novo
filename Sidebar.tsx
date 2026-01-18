
import React, { useState, useEffect } from 'react';
import { MENU_ITEMS, COLORS } from './constants';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const [projects, setProjects] = useState<any[]>([]);

  const loadProjects = () => {
    const saved = localStorage.getItem('bsc_lade_projects');
    if (saved) setProjects(JSON.parse(saved));
  };

  useEffect(() => {
    loadProjects();
    const handleUpdate = () => loadProjects();
    window.addEventListener('projectsUpdated', handleUpdate);
    return () => window.removeEventListener('projectsUpdated', handleUpdate);
  }, []);

  const handleProjectClick = (id: string) => {
    window.dispatchEvent(new CustomEvent('openProject', { detail: id }));
  };

  const handleDeleteProject = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja excluir este projeto estrategico e todos os seus vínculos?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      localStorage.setItem('bsc_lade_projects', JSON.stringify(updated));
      window.dispatchEvent(new Event('projectsUpdated'));
      // Se estiver editando o projeto excluido, limpar
      window.dispatchEvent(new CustomEvent('openProject', { detail: 'NEW' }));
    }
  };

  return (
    <aside 
      className="fixed left-0 top-0 h-screen w-64 flex flex-col border-r shadow-sm transition-all z-50 overflow-hidden"
      style={{ backgroundColor: COLORS.sidebar, borderColor: COLORS.border }}
    >
      {/* Logo Section */}
      <div className="p-6 border-b bg-white/50" style={{ borderColor: COLORS.border }}>
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2" style={{ color: COLORS.primary }}>
          <div className="w-8 h-8 rounded bg-blue-900 flex items-center justify-center text-white text-xs font-black">LA</div>
          BSC-LADE
        </h1>
        <p className="text-[10px] uppercase tracking-widest mt-1 opacity-60">Plataforma Estratégica</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar">
        <ul className="space-y-1">
          {MENU_ITEMS.map((item) => {
            const isActive = currentPage === item.key;
            // Todos os itens habilitados agora, exceto se houver nova expansão futura
            const isEnabled = ['home', 'strategy', 'settings', 'indicators', 'projects', 'reports'].includes(item.key);
            const isProjectPage = item.key === 'projects' && currentPage === 'projects';

            return (
              <li key={item.key}>
                <button
                  onClick={() => isEnabled && onNavigate(item.key)}
                  className={`w-full text-left px-6 py-3 flex items-center gap-3 transition-all
                    ${isActive ? 'bg-white border-r-4' : 'opacity-70'}
                    ${isEnabled ? 'hover:opacity-100 hover:bg-white/50 cursor-pointer' : 'cursor-not-allowed opacity-30'}
                  `}
                  style={{ 
                    borderRightColor: isActive ? COLORS.primary : 'transparent',
                    color: COLORS.primary 
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                  {!isEnabled && <span className="text-[9px] bg-slate-200 px-1 rounded ml-auto text-slate-500">Breve</span>}
                </button>

                {/* Sub-bloco de Projetos */}
                {isProjectPage && projects.length > 0 && (
                  <div className="bg-slate-50/80 border-y py-2 px-4 space-y-1 animate-in slide-in-from-top-2 duration-300" style={{ borderColor: COLORS.border }}>
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-2 px-2">Lista de Projetos Ativos</div>
                    {projects.map(proj => (
                      <div 
                        key={proj.id}
                        onClick={() => handleProjectClick(proj.id)}
                        className="group flex items-center justify-between p-2 rounded hover:bg-white transition-all cursor-pointer border border-transparent hover:border-slate-200"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0
                            ${proj.status === 'EM ELABORAÇÃO' ? 'bg-amber-400' : ''}
                            ${proj.status === 'EM EXECUÇÃO' ? 'bg-blue-400' : ''}
                            ${proj.status === 'CONCLUÍDO' ? 'bg-green-400' : ''}
                          `}></span>
                          <span className="text-[11px] font-medium text-slate-600 truncate">{proj.name}</span>
                        </div>
                        <button 
                          onClick={(e) => handleDeleteProject(e, proj.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 text-xs p-1"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Persistent Actions */}
      <div className="p-4 border-t space-y-2 bg-white/50" style={{ borderColor: COLORS.border }}>
        <button 
          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white rounded transition-all border border-transparent hover:border-slate-200"
        >
          <span>💾</span> Salvar Rascunho
        </button>
        <button 
          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white rounded transition-all border border-transparent hover:border-slate-200"
        >
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
