import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';

import StrategyPage from './components/StrategyPage';
import ProjectsPage from './components/ProjectsPage';
import IndicatorsPage from './components/IndicatorsPage';
import ReportsPage from './components/ReportsPage';
import SettingsPage from './components/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout principal com Sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<StrategyPage />} />
          <Route path="/strategy" element={<StrategyPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/indicators" element={<IndicatorsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
