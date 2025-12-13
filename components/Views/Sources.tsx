import React, { useState } from 'react';
import { Source, SourceStatus } from '../../types';
import { MoreHorizontal, Filter, Plus, Users, Hash } from 'lucide-react';

const mockSources: Source[] = [
  { id: '1', title: 'Tech Crunch Reposts', group: 'Technology', score: 8.5, status: SourceStatus.ACTIVE, postsPerDay: 45, lastActive: '2m ago' },
  { id: '2', title: 'Daily AI News', group: 'AI & ML', score: 9.2, status: SourceStatus.ACTIVE, postsPerDay: 12, lastActive: '15m ago' },
  { id: '3', title: 'Crypto Moonshot 🚀', group: 'Unsorted', score: 1.2, status: SourceStatus.QUARANTINE, postsPerDay: 120, lastActive: '1m ago' },
  { id: '4', title: 'Philosophy Daily', group: 'Theory', score: 7.8, status: SourceStatus.ACTIVE, postsPerDay: 3, lastActive: '5h ago' },
  { id: '5', title: 'Meme Central', group: 'Humor', score: 3.4, status: SourceStatus.BLOCKED, postsPerDay: 200, lastActive: '1m ago' },
];

const mockGroups = ['Technology', 'AI & ML', 'Theory', 'Humor', 'News', 'Unsorted'];

export const Sources: React.FC = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="flex h-[calc(100vh-2rem)] gap-6">
      {/* Groups Panel */}
      <div className="w-1/4 min-w-[250px] bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-white">Groups</h3>
          <button className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2 overflow-y-auto">
          {mockGroups.map(group => (
            <div key={group} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 cursor-pointer group transition">
              <div className="flex items-center gap-3">
                <Hash className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                <span className="text-gray-300 group-hover:text-white text-sm">{group}</span>
              </div>
              <span className="text-xs bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">
                {mockSources.filter(s => s.group === group).length}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sources List Panel */}
      <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl flex flex-col">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h3 className="font-semibold text-white">Sources</h3>
            <div className="h-4 w-px bg-gray-700"></div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Filter className="w-4 h-4" />
              <span>Status:</span>
              <select 
                className="bg-transparent text-white outline-none font-medium cursor-pointer"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value={SourceStatus.ACTIVE}>Active</option>
                <option value={SourceStatus.QUARANTINE}>Quarantine</option>
              </select>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
            <Plus className="w-4 h-4" />
            Add Source
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-900 sticky top-0 z-10">
              <tr className="border-b border-gray-800">
                <th className="px-6 py-3 font-medium text-gray-300">Title</th>
                <th className="px-6 py-3 font-medium text-gray-300">Group</th>
                <th className="px-6 py-3 font-medium text-gray-300">Score</th>
                <th className="px-6 py-3 font-medium text-gray-300">Volume</th>
                <th className="px-6 py-3 font-medium text-gray-300">Status</th>
                <th className="px-6 py-3 font-medium text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {mockSources.map((source) => (
                <tr key={source.id} className="hover:bg-gray-800/50 transition group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs font-bold text-gray-300">
                        {source.title.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-medium">{source.title}</div>
                        <div className="text-xs text-gray-500">Last active {source.lastActive}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
                      {source.group}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${source.score > 7 ? 'bg-green-500' : source.score > 4 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${source.score * 10}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono">{source.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{source.postsPerDay} / day</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      source.status === SourceStatus.ACTIVE 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : source.status === SourceStatus.QUARANTINE
                        ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {source.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-500 hover:text-white p-1 rounded hover:bg-gray-700 transition">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};