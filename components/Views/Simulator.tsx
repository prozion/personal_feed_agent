import React, { useState } from 'react';
import { Send, Play, RotateCcw } from 'lucide-react';

export const Simulator: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = () => {
    if (!input) return;
    setLoading(true);
    // Mimic API latency
    setTimeout(() => {
      setOutput(JSON.stringify({
        decision: "PUBLISH",
        score: 8.7,
        cluster_id: "evt-2023-991",
        reasoning: "High relevance to user interests (AI). Source is reliable. No duplicates found in 24h window.",
        tokens_used: 145,
        estimated_cost: 0.0004
      }, null, 2));
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col gap-6">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <h2 className="text-xl font-bold text-white">Agent Logic Simulator</h2>
        </div>
        <p className="text-gray-400 text-sm mb-6">
          Paste a sample Telegram message to test how the current Policy and LLM rules will evaluate it.
          This does not affect live channels.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Input Message</label>
            <textarea
              className="flex-1 bg-gray-950 border border-gray-800 rounded-lg p-4 text-gray-300 font-mono text-sm resize-none focus:border-blue-500 outline-none"
              placeholder="Paste raw message text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>

          <div className="flex flex-col">
             <label className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Agent Decision Output</label>
             <div className="flex-1 bg-gray-950 border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-auto relative">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                       <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                       <span className="text-blue-500 text-xs">Reasoning...</span>
                    </div>
                  </div>
                ) : output ? (
                  <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
                ) : (
                  <span className="text-gray-600 italic">Waiting for simulation...</span>
                )}
             </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
            <button 
              onClick={() => { setInput(''); setOutput(null); }}
              className="px-4 py-2 text-gray-400 hover:text-white transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </button>
            <button 
              onClick={handleSimulate}
              disabled={loading || !input}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2 transition shadow-lg shadow-blue-900/20 ${loading || !input ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'}`}
            >
              <Play className="w-4 h-4" />
              Run Simulation
            </button>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Simulator Config:</span>
            <span className="px-2 py-1 bg-gray-800 rounded text-xs text-blue-400 font-mono">Model: gemini-2.5-flash</span>
            <span className="px-2 py-1 bg-gray-800 rounded text-xs text-blue-400 font-mono">Thinking Budget: 0</span>
         </div>
      </div>
    </div>
  );
};