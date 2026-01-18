import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants';
import { db } from '../firebase';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

interface VisionLine {
  id: number;
  year: string;
  text: string;
}

const StrategyPage: React.FC = () => {
  // Estados para Campos Institucionais
  const [logo, setLogo] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  // Estados para Identidade Estratégica
  const [proposito, setProposito] = useState('');
  const [negocio, setNegocio] = useState('');
  const [missao, setMissao] = useState('');
  const [visao, setVisao] = useState('');
  const [valores, setValores] = useState('');

  // Estado para Linha de Visão
  const [visionLines, setVisionLines] = useState<VisionLine[]>([
    { id: Date.now(), year: '', text: '' }
  ]);

  /* ======================
     CARREGAR DADOS (Firestore)
  ====================== */
  useEffect(() => {
    const loadData = async () => {
      const snap = await getDoc(doc(db, 'strategy', 'main'));
      if (snap.exists()) {
        const data = snap.data();
        setCompanyName(data.companyName || '');
        setStartYear(data.startYear || '');
        setEndYear(data.endYear || '');
        setProposito(data.proposito || '');
        setNegocio(data.negocio || '');
        setMissao(data.missao || '');
        setVisao(data.visao || '');
        setValores(data.valores || '');
        setVisionLines(
          data.visionLines && data.visionLines.length > 0
            ? data.visionLines
            : [{ id: Date.now(), year: '', text: '' }]
        );
      }
    };

    loadData();
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const addVisionLine = () => {
    setVisionLines([...visionLines, { id: Date.now(), year: '', text: '' }]);
  };

  const updateVisionLine = (id: number, field: keyof VisionLine, value: string) => {
    setVisionLines(
      visionLines.map(line =>
        line.id === id ? { ...line, [field]: value } : line
      )
    );
  };

  const removeVisionLine = (id: number) => {
    if (visionLines.length > 1) {
      setVisionLines(visionLines.filter(line => line.id !== id));
    }
  };

  /* ======================
     SALVAR PLANO (Firestore)
  ====================== */
  const handleSave = async () => {
    const data = {
      companyName,
      startYear,
      endYear,
      proposito,
      negocio,
      missao,
      visao,
      valores,
      visionLines,
      updatedAt: new Date()
    };

    await setDoc(doc(db, 'strategy', 'main'), data);
    alert('Plano Estratégico salvo com sucesso!');
  };

  /* ======================
     LIMPAR TUDO (Firestore)
  ====================== */
  const handleClear = async () => {
    if (window.confirm('Deseja limpar todos os campos?')) {
      await deleteDoc(doc(db, 'strategy', 'main'));
      window.location.reload();
    }
  };

  /* ======================
     JSX ORIGINAL – INTACTO
  ====================== */

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* BLOCO SUPERIOR - Institucional */}
      <section className="bg-white border rounded-xl p-6 shadow-sm" style={{ borderColor: COLORS.border }}>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-6 opacity-50" style={{ color: COLORS.primary }}>
          Informações Institucionais
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Upload de Logomarca */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Logomarca da Empresa</label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 h-32 bg-slate-50 relative overflow-hidden transition-all hover:bg-slate-100" style={{ borderColor: COLORS.border }}>
              {logo ? (
                <img src={logo} alt="Logo" className="h-full w-full object-contain" />
              ) : (
                <div className="text-center text-slate-400">
                  <span className="text-2xl block">📷</span>
                  <span className="text-xs">Clique para upload</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleLogoUpload}
              />
            </div>
          </div>

          {/* Nome da Empresa */}
          <div className="md:col-span-1 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Nome da Empresa</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ex: Holding LADE S.A."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-all"
              style={{ borderColor: COLORS.border }}
            />
          </div>

          {/* Horizonte do Planejamento */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Horizonte do Planejamento</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                placeholder="Ano Inicial"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none"
                style={{ borderColor: COLORS.border }}
              />
              <span className="text-slate-400">até</span>
              <input
                type="number"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                placeholder="Ano Final"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none"
                style={{ borderColor: COLORS.border }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO PRINCIPAL - Identidade Estratégica */}
      <section className="bg-white border rounded-xl p-6 shadow-sm" style={{ borderColor: COLORS.border }}>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-6 opacity-50" style={{ color: COLORS.primary }}>
          Identidade Estratégica
        </h3>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">PROPÓSITO</label>
            <textarea
              value={proposito}
              onChange={(e) => setProposito(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg min-h-[80px] focus:ring-2 outline-none"
              placeholder="Por que existimos?"
              style={{ borderColor: COLORS.border }}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">NEGÓCIO</label>
            <textarea
              value={negocio}
              onChange={(e) => setNegocio(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg min-h-[80px] focus:ring-2 outline-none"
              placeholder="Em que mercado/setor atuamos?"
              style={{ borderColor: COLORS.border }}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">MISSÃO</label>
            <textarea
              value={missao}
              onChange={(e) => setMissao(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg min-h-[80px] focus:ring-2 outline-none"
              placeholder="O que fazemos diariamente?"
              style={{ borderColor: COLORS.border }}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">VISÃO</label>
            <textarea
              value={visao}
              onChange={(e) => setVisao(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg min-h-[80px] focus:ring-2 outline-none"
              placeholder="Onde queremos chegar?"
              style={{ borderColor: COLORS.border }}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">VALORES</label>
            <textarea
              value={valores}
              onChange={(e) => setValores(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg min-h-[100px] focus:ring-2 outline-none"
              placeholder="Quais princípios guiam nosso comportamento?"
              style={{ borderColor: COLORS.border }}
            />
          </div>
        </div>
      </section>

      {/* LINHA DE VISÃO */}
      <section className="bg-white border rounded-xl p-6 shadow-sm" style={{ borderColor: COLORS.border }}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold uppercase tracking-wider opacity-50" style={{ color: COLORS.primary }}>
            Linha de Visão
          </h3>
          <button
            onClick={addVisionLine}
            className="text-xs font-bold px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border"
            style={{ borderColor: COLORS.border }}
          >
            + Adicionar Marco
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase w-32 border-b" style={{ borderColor: COLORS.border }}>Ano</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase border-b" style={{ borderColor: COLORS.border }}>Texto Livre</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase w-16 border-b text-center" style={{ borderColor: COLORS.border }}>-</th>
              </tr>
            </thead>
            <tbody>
              {visionLines.map((line) => (
                <tr key={line.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2 border-b" style={{ borderColor: COLORS.border }}>
                    <input
                      type="number"
                      value={line.year}
                      onChange={(e) => updateVisionLine(line.id, 'year', e.target.value)}
                      placeholder="AAAA"
                      className="w-full bg-transparent outline-none focus:text-blue-700 font-medium"
                    />
                  </td>
                  <td className="px-4 py-2 border-b" style={{ borderColor: COLORS.border }}>
                    <input
                      type="text"
                      value={line.text}
                      onChange={(e) => updateVisionLine(line.id, 'text', e.target.value)}
                      placeholder="Descreva o objetivo para este ano..."
                      className="w-full bg-transparent outline-none"
                    />
                  </td>
                  <td className="px-4 py-2 border-b text-center" style={{ borderColor: COLORS.border }}>
                    <button
                      onClick={() => removeVisionLine(line.id)}
                      className="text-slate-300 hover:text-red-500 transition-all"
                      title="Remover linha"
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Ações da Página */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          onClick={handleClear}
          className="px-8 py-3 bg-white border rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
          style={{ borderColor: COLORS.border }}
        >
          Limpar Tudo
        </button>
        <button
          onClick={handleSave}
          className="px-8 py-3 text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-all"
          style={{ backgroundColor: COLORS.primary }}
        >
          💾 Salvar Plano Estratégico
        </button>
      </div>
    </div>
  );
};

export default StrategyPage;
