
import React from 'react';
import { COLORS, MENU_ITEMS } from '../constants';

interface DevelopmentPageProps {
  pageKey: string;
}

const DevelopmentPage: React.FC<DevelopmentPageProps> = ({ pageKey }) => {
  const pageInfo = MENU_ITEMS.find(item => item.key === pageKey);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div 
        className="w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-inner border"
        style={{ backgroundColor: 'white', borderColor: COLORS.border }}
      >
        {pageInfo?.icon || '⚙️'}
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
          Módulo: {pageInfo?.label}
        </h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Este módulo está em fase de desenvolvimento e será liberado progressivamente nas próximas atualizações do sistema.
        </p>
      </div>

      <div className="pt-4">
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-amber-50 text-amber-700 border"
          style={{ borderColor: '#fef3c7' }}
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          Em Breve
        </div>
      </div>
    </div>
  );
};

export default DevelopmentPage;
