import React from 'react';
import { AuditLogEntry } from '../../types';
import { Search, AlertCircle, CheckCircle, Info } from 'lucide-react';

const mockLogs: AuditLogEntry[] = [
  { id: 'log-1', timestamp: '2023-10-27 14:32:01', action: 'Auto-Subscribe', initiator: 'Agent', details: 'Subscribed to "AI Research Daily" (Score: 9.1). Added to Group: AI & ML.', status: 'Success' },
  { id: 'log-2', timestamp: '2023-10-27 14:30:15', action: 'Post Published', initiator: 'Agent', details: 'Forwarded message ID 8841 from "Tech Insider". Cluster size: 4.', status: 'Success' },
  { id: 'log-3', timestamp: '2023-10-27 14:15:00', action: 'Policy Update', initiator: 'User', details: 'Changed temperature from 0.4 to 0.3.', status: 'Success' },
  { id: 'log-4', timestamp: '2023-10-27 13:55:22', action: 'Feed Error', initiator: 'Agent', details: 'Rate limit exceeded on Source ID 55.', status: 'Failed' },
  { id: 'log-5', timestamp: '2023-10-27 13:40:10', action: 'Content Filtered', initiator: 'Agent', details: 'Blocked post ID 992. Reason: Promotional content/Spam.', status: 'Warning' },
];

export const Logs: React.FC = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900">
        <h3 className="font-semibold text-white">System Audit & Decision Log</h3>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search logs..." 
            className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg pl-9 pr-4 py-2 outline-none focus:border-blue-500 w-64"
          />
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-gray-900 sticky top-0 z-10 shadow-sm">
            <tr className="border-b border-gray-800">
              <th className="px-6 py-3 font-medium text-gray-300 w-48">Timestamp</th>
              <th className="px-6 py-3 font-medium text-gray-300 w-32">Status</th>
              <th className="px-6 py-3 font-medium text-gray-300 w-32">Initiator</th>
              <th className="px-6 py-3 font-medium text-gray-300 w-48">Action</th>
              <th className="px-6 py-3 font-medium text-gray-300">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {mockLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-800/50 transition font-mono text-xs">
                <td className="px-6 py-4 text-gray-500">{log.timestamp}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {log.status === 'Success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {log.status === 'Failed' && <AlertCircle className="w-4 h-4 text-red-500" />}
                    {log.status === 'Warning' && <Info className="w-4 h-4 text-yellow-500" />}
                    <span className={
                      log.status === 'Success' ? 'text-green-400' : 
                      log.status === 'Failed' ? 'text-red-400' : 'text-yellow-400'
                    }>{log.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded border ${
                    log.initiator === 'User' ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' : 'border-blue-500/30 text-blue-400 bg-blue-500/10'
                  }`}>
                    {log.initiator}
                  </span>
                </td>
                <td className="px-6 py-4 text-white font-medium">{log.action}</td>
                <td className="px-6 py-4 text-gray-300">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};