
import React, { useState } from 'react';
import { LogEntry } from '@/utils/mockData';

interface ActivityLogsProps {
  logs: LogEntry[];
}

const ActivityLogs = ({ logs }: ActivityLogsProps) => {
  const [filterAction, setFilterAction] = useState<'all' | 'allowed' | 'blocked'>('all');
  
  const filteredLogs = logs.filter(log => 
    filterAction === 'all' ? true : log.action === filterAction
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Gatekeeper Activity Logs</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilterAction('all')}
              className={`px-3 py-1 text-sm rounded-full ${
                filterAction === 'all' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilterAction('allowed')}
              className={`px-3 py-1 text-sm rounded-full ${
                filterAction === 'allowed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Allowed
            </button>
            <button 
              onClick={() => setFilterAction('blocked')}
              className={`px-3 py-1 text-sm rounded-full ${
                filterAction === 'blocked' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Blocked
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Application</th>
                <th className="px-4 py-3">Path</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Reason</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{log.application}</td>
                    <td className="px-4 py-3 max-w-xs truncate" title={log.path}>
                      {log.path}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        log.action === 'allowed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3">{log.reason}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                    No logs found matching your filter
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
