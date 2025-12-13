import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Views/Dashboard';
import { Sources } from './components/Views/Sources';
import { Feeds } from './components/Views/Feeds';
import { Logs } from './components/Views/Logs';
import { Simulator } from './components/Views/Simulator';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.SOURCES:
        return <Sources />;
      case ViewState.FEEDS:
        return <Feeds />;
      case ViewState.LOGS:
        return <Logs />;
      case ViewState.SIMULATOR:
        return <Simulator />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100 font-sans">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;