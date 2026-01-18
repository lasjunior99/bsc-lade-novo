
import React from 'react';
import { COLORS } from '../constants';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <header className="space-y-2">
        <h2 
          className="text-3xl font-extrabold tracking-tight"
          style={{ color: COLORS.primary }}
        >
          BSC-LADE – Sistema de Gestão Estratégica
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl">
          Planejamento estratégico, indicadores e execução integrados em um único ambiente.
        </p>
      </header>

      {/* Presentation Card */}
      <section className="bg-white rounded-xl border p-8 shadow-sm transition-all" style={{ borderColor: COLORS.border }}>
        <div className="flex items-start gap-4">
          <div 
            className="p-3 rounded-lg text-white"
            style={{ backgroundColor: COLORS.primary }}
          >
            <span className="text-2xl">🏛️</span>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold" style={{ color: COLORS.primary }}>Bem-vindo à sua Central Estratégica</h3>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
              <p>
                Este sistema foi desenvolvido para apoiar organizações na construção, acompanhamento e execução de suas estratégias, 
                utilizando conceitos consolidados de <strong>Balanced Scorecard (BSC)</strong>, governança e gestão de desempenho.
              </p>
              <p>
                A plataforma permite uma visão holística dos objetivos organizacionais através das quatro perspectivas clássicas: 
                Financeira, Clientes, Processos Internos e Aprendizado & Crescimento. Com o BSC-LADE, a estratégia deixa de ser um 
                documento estático e se torna o motor da execução diária.
              </p>
            </div>
            
            <div className="pt-4 border-t flex gap-4" style={{ borderColor: COLORS.border }}>
               <div className="flex items-center gap-2 text-sm font-medium text-amber-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Metodologia Consolidada
               </div>
               <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Foco em Resultados
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of features (Future indications) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-dashed p-6 rounded-lg bg-slate-50/50 text-center space-y-2 opacity-60">
          <div className="text-2xl">🎯</div>
          <h4 className="font-bold text-slate-700">Estratégia</h4>
          <p className="text-xs text-slate-500">Mapa estratégico e Identidade Organizacional.</p>
        </div>
        <div className="border border-dashed p-6 rounded-lg bg-slate-50/50 text-center space-y-2 opacity-60">
          <div className="text-2xl">📊</div>
          <h4 className="font-bold text-slate-700">Indicadores</h4>
          <p className="text-xs text-slate-500">Medição de KPIs e metas corporativas.</p>
        </div>
        <div className="border border-dashed p-6 rounded-lg bg-slate-50/50 text-center space-y-2 opacity-60">
          <div className="text-2xl">📋</div>
          <h4 className="font-bold text-slate-700">Projetos</h4>
          <p className="text-xs text-slate-500">Iniciativas estratégicas e planos de ação.</p>
        </div>
      </div>

      {/* System Status Block */}
      <section 
        className="bg-slate-50 border-l-4 p-5 rounded-r-lg" 
        style={{ borderColor: COLORS.highlight }}
      >
        <div className="flex items-center gap-2 mb-1">
           <span className="text-xs font-black uppercase tracking-widest text-slate-400">Status do Sistema</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-slate-700">
            <strong>Status:</strong> Página em desenvolvimento
          </p>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Fase de Setup
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-2 italic">
          Observação: Novos módulos serão adicionados progressivamente conforme o cronograma de implantação.
        </p>
      </section>

      {/* Action Area (Persona requirement: Save/Export) */}
      <div className="flex flex-wrap gap-4 pt-4">
        <button 
          className="px-6 py-2.5 bg-blue-900 text-white rounded-lg font-semibold shadow-md hover:bg-blue-800 transition-all flex items-center gap-2"
        >
          <span>💾</span> Salvar Configurações Iniciais
        </button>
        <button 
          className="px-6 py-2.5 bg-white text-slate-700 border rounded-lg font-semibold hover:bg-slate-50 transition-all flex items-center gap-2"
          style={{ borderColor: COLORS.border }}
        >
          <span>📄</span> Gerar Relatório de Abertura (PDF)
        </button>
      </div>
    </div>
  );
};

export default HomePage;
