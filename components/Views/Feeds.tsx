import React from 'react';
import { FeedPolicy } from '../../types';
import { Sliders, Cpu, Save, RefreshCw } from 'lucide-react';

const mockPolicy: FeedPolicy = {
  id: 'main-feed-1',
  name: 'Main News Feed',
  model: 'gemini-1.5-flash',
  temperature: 0.3,
  promptVersion: 'v2.4.1',
  tokenBudget: 50000
};

export const Feeds: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Feed Policy Configuration</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Reset to Default
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-900/20">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Sliders className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white">Parameters</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Active Model</label>
                <div className="relative">
                  <select className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500 appearance-none">
                    <option>gemini-2.5-flash (Recommended)</option>
                    <option>gemini-2.5-flash-lite</option>
                    <option>gemini-3-pro-preview</option>
                  </select>
                  <Cpu className="w-4 h-4 text-gray-500 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Temperature (Creativity)</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="0" max="1" step="0.1" className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  <span className="text-sm text-gray-300 font-mono w-8">0.3</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Daily Token Budget</label>
                <input type="number" className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-mono" defaultValue={50000} />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Freshness Window (Hours)</label>
                 <input type="number" className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-mono" defaultValue={24} />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="font-semibold text-white mb-4 text-sm">Active Rules</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded border border-gray-800">
                <span className="text-xs text-gray-300">No Audio/Video</span>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded border border-gray-800">
                <span className="text-xs text-gray-300">Deduplication (Cluster)</span>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded border border-gray-800">
                <span className="text-xs text-gray-300">Anti-Hype Filter</span>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* System Instruction Editor */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-semibold text-white">System Instruction (Prompt)</h3>
             <span className="text-xs font-mono text-gray-500">Version: {mockPolicy.promptVersion}</span>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            This prompt defines how the Agent evaluates content relevance and formatting. 
            Do not include explicit filtering logic here if covered by the pipeline rules.
          </p>
          <textarea 
            className="flex-1 w-full bg-gray-950 border border-gray-800 rounded-lg p-4 text-gray-300 font-mono text-sm leading-relaxed resize-none focus:border-blue-500 outline-none"
            defaultValue={`You are an intelligent news curator. Your goal is to filter Telegram posts for a user interested in Technology, AI, and Global Economics.

CRITERIA:
1.  **Relevance**: Must be directly related to the user's topics.
2.  **Novelty**: Prioritize original reporting over generic summaries.
3.  **Factuality**: Downrank clickbait, rumors, or unverified claims.
4.  **Signal-to-Noise**: Discard memes, short reactions, and promotional posts.

OUTPUT FORMAT:
Return a JSON object with:
- score (0-10)
- reasoning (concise explanation)
- category (string)`}
          ></textarea>
        </div>
      </div>
    </div>
  );
};