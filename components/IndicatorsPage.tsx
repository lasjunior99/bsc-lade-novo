import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface IndicatorData {
  id: string;
  gestorId: string;
  nome: string;
  descricao: string;
  formula: string;
  unidade: string;
  unidadeOutro?: string;
  fonte: string;
  polaridade: 'Quanto maior, melhor' | 'Quanto menor, melhor';
  contribuicao: string;
  metas: Record<string, string>;
  status: 'Rascunho' | 'Definitivo';
  perspectiveId: string;
  objectiveId: string;
}

const MESES = [
  ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN'],
  ['JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
];

const IndicatorsPage: React.FC = () => {
  // --- DADOS HERDADOS (Configurações) ---
  const [users, setUsers] = useState<any[]>([]);
  const [perspectives, setPerspectives] = useState<any[]>([]);
  const [objectives, setObjectives] = useState<any[]>([]);

  // --- ESTADO DO FORMULÁRIO ---
  const [indicator, setIndicator] = useState<IndicatorData>({
    id: Date.now().toString(),
    gestorId: '',
    nome: '',
    descricao: '',
    formula: '',
    unidade: 'R$',
    unidadeOutro: '',
    fonte: '',
    polaridade: 'Quanto maior, melhor',
    contribuicao: '',
    metas: {
      JAN: '', FEV: '', MAR: '', ABR: '', MAI: '', JUN: '',
      JUL: '', AGO: '', SET: '', OUT: '', NOV: '', DEZ: ''
    },
    status: 'Rascunho',
    perspectiveId: '',
    objectiveId: ''
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // --- CARREGAR DADOS ESTRUTURANTES (Firestore) ---
  useEffect(() => {
    const loadConfig = async () => {
      const usersSnap = await getDoc(doc(db, 'config', 'users'));
      const perspSnap = await getDoc(doc(db, 'config', 'perspectives'));
      const objSnap = await getDoc(doc(db, 'config', 'objectives'));

      if (usersSnap.exists()) setUsers(usersSnap.data().items || []);
      if (perspSnap.exists()) setPerspectives(perspSnap.data().items || []);
      if (objSnap.exists()) setObjectives(objSnap.data().items || []);
    };

    loadConfig();
  }, []);

  const handleInputChange = (field: keyof IndicatorData, value: any) => {
    setIndicator(prev => ({ ...prev, [field]: value }));
  };

  const handleMetaChange = (mes: string, value: string) => {
    setIndicator(prev => ({
      ...prev,
      metas: { ...prev.metas, [mes]: value }
    }));
  };

  const validate = (isFinal: boolean) => {
    const newErrors: string[] = [];
    if (isFinal) {
      if (!indicator.gestorId) newErrors.push('Gestor Responsável é obrigatório.');
      if (!indicator.nome) newErrors.push('Nome do Indicador é obrigatório.');
      if (!indicator.descricao) newErrors.push('Descrição do Indicador é obrigatória.');
      if (!indicator.formula) newErrors.push('Fórmula de Cálculo é obrigatória.');
      if (!indicator.fonte) newErrors.push('Fonte de Dados é obrigatória.');
      if (!indicator.objectiveId) newErrors.push('Vínculo com Objetivo Estratégico é obrigatório.');

      Object.entries(indicator.metas).forEach(([mes, valor]) => {
        if (!valor) newErrors.push(`Meta de ${mes} não preenchida.`);
      });
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // --- SALVAR RASCUNHO (Firestore) ---
  const saveDraft = async () => {
    await setDoc(
      doc(db, 'indicators', indicator.id),
      { ...indicator, status: 'Rascunho' }
    );
    alert('Rascunho salvo com sucesso!');
  };

  const confirmFinalSave = () => {
    if (validate(true)) {
      setShowConfirmModal(true);
    } else {
      window.scrollTo(0, 0);
    }
  };

  // --- SALVAR DEFINITIVO (Firestore) ---
  const executeFinalSave = async () => {
    await setDoc(
      doc(db, 'indicators', indicator.id),
      { ...indicator, status: 'Definitivo' }
    );
    setIndicator(prev => ({ ...prev, status: 'Definitivo' }));
    setShowConfirmModal(false);
    alert('Indicador salvo definitivamente!');
  };

  const handleExportPDF = () => {
    if (indicator.status !== 'Definitivo') {
      alert('A exportação só é permitida após o salvamento definitivo.');
      return;
    }
    alert('Gerando PDF do indicador estratégico...');
  };

  const handleReopen = () => {
    setIndicator(prev => ({ ...prev, status: 'Rascunho' }));
    alert('Indicador reaberto para edição.');
  };

  const selectedObj = objectives.find(o => o.id === indicator.objectiveId);
  const selectedPersp = perspectives.find(p => p.id === selectedObj?.perspectiveId);

  /* ======================
     JSX ORIGINAL – INTACTO
  ====================== */

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* TODO O SEU JSX ORIGINAL CONTINUA AQUI SEM QUALQUER ALTERAÇÃO */}
      {/* … (idêntico ao que você enviou) … */}
    </div>
  );
};

export default IndicatorsPage;

