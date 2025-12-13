import React from 'react';
import { LayoutDashboard, Radio, Rss, ScrollText, Terminal, Settings, ShieldCheck } from 'lucide-react';
import { ViewState } from '../../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { view: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { view: ViewState.SOURCES, label: 'Sources & Groups', icon: Radio },
    { view: ViewState.FEEDS, label: 'Feeds & Policies', icon: Rss },
    { view: ViewState.LOGS, label: 'Audit & Decision Log', icon: ScrollText },
    { view: ViewState.SIMULATOR, label: 'Agent Simulator', icon: Terminal },
  ];

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-screen fixed left-0 top-0 z-10">
      <div className="p-6 flex items-center gap-3 border-b border-gray-800">
        <div className="bg-blue-600 p-2 rounded-lg">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight">Feed Agent</h1>
          <p className="text-xs text-gray-500 font-mono">v1.0.4 (MVP)</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => onChangeView(item.view)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-500'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-medium text-gray-300">Agent Online</span>
          </div>
          <div className="text-xs text-gray-500">
            <p>Uptime: 4d 12h</p>
            <p>Tokens: 45K / 100K (Daily)</p>
          </div>
        </div>
      </div>
    </aside>
  );
};