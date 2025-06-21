import React, { useState } from 'react';

const CompileStatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'waiting':
        return {
          text: 'Waiting',
          bgColor: 'bg-nokia-gray-100',
          textColor: 'text-nokia-gray-800',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'compiling':
        return {
          text: 'Compiling',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          icon: (
            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )
        };
      case 'pass':
        return {
          text: 'Pass',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )
        };
      case 'fail':
        return {
          text: 'Fail',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )
        };
      default:
        return {
          text: 'Unknown',
          bgColor: 'bg-nokia-gray-100',
          textColor: 'text-nokia-gray-800',
          icon: null
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`status-badge ${config.bgColor} ${config.textColor} flex items-center space-x-1`}>
      {config.icon}
      <span>{config.text}</span>
    </span>
  );
};

const TestResultTable = ({ results = [] }) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-nokia-gray-500">
        <svg className="w-12 h-12 mx-auto mb-4 text-nokia-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p>No test results available</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-nokia-gray-200">
        <thead className="bg-nokia-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-nokia-gray-500 uppercase tracking-wider">
              Suite
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-nokia-gray-500 uppercase tracking-wider">
              Test Case
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-nokia-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-nokia-gray-500 uppercase tracking-wider">
              Exec Time
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-nokia-gray-200">
          {results.map((result, index) => (
            <tr key={index} className="hover:bg-nokia-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-nokia-gray-900">
                {result.suite}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-nokia-gray-900">
                {result.testCase}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {result.status === 'pass' ? (
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-nokia-gray-500">
                {result.execTime}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ReviewStatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'not_submitted':
        return {
          text: 'Not Submitted',
          bgColor: 'bg-nokia-gray-100',
          textColor: 'text-nokia-gray-800'
        };
      case 'pending':
        return {
          text: 'Pending',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800'
        };
      case 'approved':
        return {
          text: 'Approved',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800'
        };
      case 'denied':
        return {
          text: 'Denied',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800'
        };
      default:
        return {
          text: 'Unknown',
          bgColor: 'bg-nokia-gray-100',
          textColor: 'text-nokia-gray-800'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`status-badge ${config.bgColor} ${config.textColor}`}>
      {config.text}
    </span>
  );
};

const LogViewer = ({ logs = [] }) => {
  const [filter, setFilter] = useState('all');

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.level === filter);

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      case 'info':
        return 'text-blue-600';
      case 'debug':
        return 'text-nokia-gray-600';
      default:
        return 'text-nokia-gray-800';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-nokia-gray-900">Logs</h4>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-xs border border-nokia-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-nokia-blue-500"
        >
          <option value="all">All Levels</option>
          <option value="error">Error</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
          <option value="debug">Debug</option>
        </select>
      </div>
      
      <div className="bg-nokia-gray-900 text-nokia-gray-100 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
        {filteredLogs.length === 0 ? (
          <div className="text-nokia-gray-400 text-center py-8">
            No logs available
          </div>
        ) : (
          <div className="space-y-1">
            {filteredLogs.map((log, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-nokia-gray-500 text-xs flex-shrink-0">
                  {log.timestamp}
                </span>
                <span className={`text-xs px-1 rounded ${getLogLevelColor(log.level)}`}>
                  [{log.level.toUpperCase()}]
                </span>
                <span className="flex-1 break-all">
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatusPanel = ({
  compileStatus = 'waiting',
  testResults = [],
  reviewStatus = 'not_submitted',
  logs = []
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-nokia-gray-900">Status Panel</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compile Status */}
        <div className="card p-6">
          <h4 className="text-sm font-medium text-nokia-gray-900 mb-3">Compile Status</h4>
          <CompileStatusBadge status={compileStatus} />
        </div>

        {/* Review Status */}
        <div className="card p-6">
          <h4 className="text-sm font-medium text-nokia-gray-900 mb-3">Review Status</h4>
          <ReviewStatusBadge status={reviewStatus} />
        </div>
      </div>

      {/* Test Results */}
      <div className="card p-6">
        <h4 className="text-sm font-medium text-nokia-gray-900 mb-4">Test Results</h4>
        <TestResultTable results={testResults} />
      </div>

      {/* Log Viewer */}
      <div className="card p-6">
        <LogViewer logs={logs} />
      </div>
    </div>
  );
};

export default StatusPanel;
export { CompileStatusBadge, TestResultTable, ReviewStatusBadge, LogViewer }; 