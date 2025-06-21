import React, { useState, useEffect } from 'react';

const SuiteSelector = ({ onChange, selectedSuites = [] }) => {
  const [selected, setSelected] = useState(selectedSuites);

  const suites = [
    { id: 'funTest', name: 'FunTest', description: 'Functional testing suite' },
    { id: 'expressTest', name: 'ExpressTest', description: 'Quick validation tests' },
    { id: 'fullSuite', name: 'FullSuite', description: 'Complete test coverage' }
  ];

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  const handleSuiteToggle = (suiteId) => {
    setSelected(prev => {
      if (prev.includes(suiteId)) {
        return prev.filter(id => id !== suiteId);
      } else {
        return [...prev, suiteId];
      }
    });
  };

  const getSuiteIcon = (suiteId) => {
    switch (suiteId) {
      case 'funTest':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'expressTest':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'fullSuite':
        return (
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-nokia-gray-700">
        Test Suites
      </label>
      <div className="space-y-3">
        {suites.map((suite) => (
          <label
            key={suite.id}
            className="flex items-start space-x-3 p-3 border border-nokia-gray-200 rounded-lg hover:bg-nokia-gray-50 cursor-pointer transition-colors duration-200"
          >
            <input
              type="checkbox"
              checked={selected.includes(suite.id)}
              onChange={() => handleSuiteToggle(suite.id)}
              className="mt-1 h-4 w-4 text-nokia-blue-600 focus:ring-nokia-blue-500 border-nokia-gray-300 rounded"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                {getSuiteIcon(suite.id)}
                <span className="text-sm font-medium text-nokia-gray-900">
                  {suite.name}
                </span>
                {selected.includes(suite.id) && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-nokia-blue-100 text-nokia-blue-800">
                    Selected
                  </span>
                )}
              </div>
              <p className="text-sm text-nokia-gray-500 mt-1">
                {suite.description}
              </p>
            </div>
          </label>
        ))}
      </div>
      
      {selected.length === 0 && (
        <p className="text-sm text-nokia-gray-500 italic">
          Please select at least one test suite to continue
        </p>
      )}
      
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-sm text-nokia-gray-600">Selected:</span>
          {selected.map(suiteId => {
            const suite = suites.find(s => s.id === suiteId);
            return (
              <span
                key={suiteId}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-nokia-blue-100 text-nokia-blue-800"
              >
                {suite.name}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SuiteSelector; 