
import React, { useState } from 'react';
import MainLayout from './components/MainLayout';
import HomePage from './components/HomePage';
import StrategyPage from './components/StrategyPage';
import SettingsPage from './components/SettingsPage';
import IndicatorsPage from './components/IndicatorsPage';
import ProjectsPage from './components/ProjectsPage';
import ReportsPage from './components/ReportsPage';
import DevelopmentPage from './components/DevelopmentPage';

/**
 * App Component
 * 
 * Gerencia a navegação entre as páginas do sistema.
 * Itens não implementados redirecionam para a DevelopmentPage.
 */
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'strategy':
        return <StrategyPage />;
      case 'settings':
        return <SettingsPage />;
      case 'indicators':
        return <IndicatorsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'reports':
        return <ReportsPage />;
      default:
        return <DevelopmentPage pageKey={currentPage} />;
    }
  };

  return (
    <MainLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderContent()}
    </MainLayout>
  );
};

export default App;
