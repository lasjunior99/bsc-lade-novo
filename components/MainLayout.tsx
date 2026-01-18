
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { COLORS, MENU_ITEMS } from '../constants';

interface MainLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, currentPage, onNavigate }) => {
  const activeItem = MENU_ITEMS.find(item => item.key === currentPage);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Component */}
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />

      {/* Content Area */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top bar placeholder */}
        <header 
          className="h-14 flex items-center justify-between px-8 border-b sticky top-0 bg-white/80 backdrop-blur-sm z-40"
          style={{ borderColor: COLORS.border, backgroundColor: COLORS.topbar }}
        >
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-2">
            BSC-LADE / <span className="text-slate-900">{activeItem?.label || 'Início'}</span>
          </div>
          <div className="text-xs text-slate-400 font-semibold italic">
            v1.2.0 - Multi-Modulos
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-8 max-w-6xl mx-auto w-full">
          {children}
        </div>

        {/* Footer Area */}
        <footer className="mt-auto p-6 text-center text-xs text-slate-400 border-t" style={{ borderColor: COLORS.border }}>
          &copy; {new Date().getFullYear()} BSC-LADE NOVO. Desenvolvido para Gestão Estratégica de Alta Performance.
        </footer>
      </main>
    </div>
  );
};

export default MainLayout;
