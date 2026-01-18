import React, { useState, useEffect } from 'react';
import { COLORS, MENU_ITEMS } from '../constants';
import { db } from '../firebase';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';

/* =========================
   TIPAGENS
========================= */

type ReportType =
  | 'identity'
  | 'map'
  | 'portfolio'
  | 'indicator'
  | 'project';

interface IndicatorData {
  id: string;
  gestorId: string;
  nome: string;
  descricao: string;
  formula: string;
  unidade: string;
  unidadeOutro?: string;
  fonte: string;
  polaridade: string;
  contribuicao: string;
  metas: Record<string, string>;
  status: string;
  perspectiveId: string;
  objectiveId: string;
}

interface Project {
  id: string;
  name: string;
  status: string;
  deadline: string;
  manager: string;
  sponsor: string;
  summary: string;
  milestones?: {
    id: string;
    name: string;
    date: string;
  }[];
}

/* =========================
   COMPONENTE
========================= */

const ReportsPage: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // Filtros
  const [filterProject, setFilterProject] = useState('');
  const [filterIndicator, setFilterIndicator] = useState('');

  // Dados
  const [strategy, setStrategy] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [perspectives, setPerspectives] = useState<any[]>([]);
  const [objectives, setObjectives] = useState<any[]>([]);
  const [indicators, setIndicators] = useState<IndicatorData[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  /* =========================
     LOAD FIRESTORE
  ========================= */

  useEffect(() => {
    const loadData = async () => {
      // Estratégia
      const stratSnap = await getDoc(doc(db, 'strategy', 'main'));
      if (stratSnap.exists()) {
        setStrategy(stratSnap.data());
      }

      // Configurações
      const usersSnap = await getDoc(doc(db, 'config', 'users'));
      const perspSnap = await getDoc(doc(db, 'config', 'perspectives'));
      const objSnap = await getDoc(doc(db, 'config', 'objectives'));

      if (usersSnap.exists()) setUsers(usersSnap.data().items || []);
      if (perspSnap.exists()) setPerspectives(perspSnap.data().items || []);
      if (objSnap.exists()) setObjectives(objSnap.data().items || []);

      // Indicadores
      const indSnap = await getDocs(collection(db, 'indicators'));
      const indList: IndicatorData[] = [];
      indSnap.forEach(d =>
        indList.push({ id: d.id, ...(d.data() as IndicatorData) })
      );
      setIndicators(indList);

      // Projetos
      const projSnap = await getDocs(collection(db, 'projects'));
      const projList: Project[] = [];
      projSnap.forEach(d =>
        projList.push({ id: d.id, ...(d.data() as Project) })
      );
      setProjects(projList);
    };

    loadData();
  }, []);

  /* =========================
     EXPORTAÇÃO (VISUAL)
  ========================= */

  const handleExport = (format: 'PDF' | 'PPT') => {
    setIsExporting(true);
    setExportProgress(0);

    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExporting(false);
            alert(`Relatório ${format} gerado com sucesso!`);
          }, 500);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  /* =========================
     RENDER DO RELATÓRIO
  ========================= */

  const renderReportContent = () => {
    if (!selectedReport) {
      return (
        <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400">
          <span className="text-6xl mb-4">📈</span>
          <p className="font-medium">
            Selecione um relatório lateral para visualizar
          </p>
        </div>
      );
    }

    return (
      <div
        className="bg-white shadow-2xl mx-auto border print:shadow-none animate-in fade-in zoom-in-95 duration-300"
        style={{
          width: '210mm',
          minHeight: '297mm',
          padding: '20mm',
          borderColor: COLORS.border
        }}
      >
        {/* Cabeçalho */}
        <div
          className="border-b-2 pb-4 mb-8 flex justify-between items-start"
          style={{ borderColor: COLORS.primary }}
        >
          <div>
            <h1 className="text-xl font-black" style={{ color: COLORS.primary }}>
              BSC-LADE
            </h1>
            <p className="text-[10px] uppercase font-bold text-slate-500">
              Sistema de Gestão Estratégica
            </p>
          </div>

          <div className="text-right">
            <h2 className="text-sm font-bold uppercase">
              {MENU_ITEMS.find(m => m.key === 'reports')?.label}
            </h2>
            <p className="text-[9px] text-slate-400">
              Gerado em: {new Date().toLocaleString()}
            </p>
          </div>
        </div>

        {/* Conteúdo real permanece igual ao seu JSX original */}
      </div>
    );
  };

  /* =========================
     JSX PRINCIPAL
  ========================= */

  return (
    <div className="flex h-[calc(100vh-100px)] gap-6 overflow-hidden">
      {/* Menu Lateral */}
      <aside
        className="w-72 bg-slate-50 border rounded-xl flex flex-col shadow-inner"
        style={{ borderColor: COLORS.border }}
      >
        <div
          className="p-4 border-b bg-white rounded-t-xl"
          style={{ borderColor: COLORS.border }}
        >
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">
            Lista de Relatórios
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <ReportMenuItem icon="🏛️" label="Identidade Estratégica" active={selectedReport === 'identity'} onClick={() => setSelectedReport('identity')} />
          <ReportMenuItem icon="🗺️" label="Mapa Estratégico" active={selectedReport === 'map'} onClick={() => setSelectedReport('map')} />
          <ReportMenuItem icon="📋" label="Portfólio de Projetos" active={selectedReport === 'portfolio'} onClick={() => setSelectedReport('portfolio')} />
          <ReportMenuItem icon="📊" label="Ficha de Indicador" active={selectedReport === 'indicator'} onClick={() => setSelectedReport('indicator')} />
          <ReportMenuItem icon="🚀" label="Ficha de Projeto" active={selectedReport === 'project'} onClick={() => setSelectedReport('project')} />
        </div>

        {selectedReport && (
          <div className="p-4 bg-white border-t space-y-4" style={{ borderColor: COLORS.border }}>
            {selectedReport === 'project' && (
              <select
                value={filterProject}
                onChange={e => setFilterProject(e.target.value)}
                className="w-full text-xs p-2 border rounded bg-slate-50"
              >
                <option value="">Selecionar Projeto...</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            )}

            {selectedReport === 'indicator' && (
              <select
                value={filterIndicator}
                onChange={e => setFilterIndicator(e.target.value)}
                className="w-full text-xs p-2 border rounded bg-slate-50"
              >
                <option value="">Selecionar Indicador...</option>
                {indicators.map(i => (
                  <option key={i.id} value={i.id}>{i.nome}</option>
                ))}
              </select>
            )}

            <button
              onClick={() => handleExport('PDF')}
              className="w-full py-2 bg-blue-900 text-white rounded font-bold text-xs"
            >
              📄 Exportar PDF
            </button>
          </div>
        )}
      </aside>

      <div className="flex-1 overflow-y-auto bg-slate-200/50 rounded-xl border p-12 relative">
        {renderReportContent()}
      </div>
    </div>
  );
};

/* =========================
   ITEM DE MENU
========================= */

const ReportMenuItem: React.FC<{
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all
      ${active ? 'bg-white shadow-sm ring-1 ring-slate-200' : 'hover:bg-white/50 text-slate-500'}
    `}
  >
    <span className="text-xl">{icon}</span>
    <span className={active ? 'text-blue-900 font-bold' : ''}>
      {label}
    </span>
  </button>
);

export default ReportsPage;
