import React, { useState, useRef, useEffect } from 'react';

const BranchSelector = ({ onChange, selectedBranches = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedBranches);
  const dropdownRef = useRef(null);

  const branches = [
    'dev/feature1',
    'dev/feature2',
    'main',
    'develop',
    'hotfix/bug-123',
    'release/v1.2.0',
    'feature/user-auth',
    'feature/api-integration'
  ];

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleBranchToggle = (branch) => {
    setSelected(prev => {
      if (prev.includes(branch)) {
        return prev.filter(b => b !== branch);
      } else {
        return [...prev, branch];
      }
    });
  };

  const handleSelectAll = () => {
    setSelected(branches);
  };

  const handleClearAll = () => {
    setSelected([]);
  };

  const getDisplayText = () => {
    if (selected.length === 0) {
      return 'Select branches...';
    }
    if (selected.length === 1) {
      return selected[0];
    }
    if (selected.length === branches.length) {
      return 'All branches selected';
    }
    return `${selected.length} branches selected`;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-nokia-gray-700">
        Branches
      </label>
      
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 border border-nokia-gray-300 rounded-lg bg-white hover:bg-nokia-gray-50 focus:outline-none focus:ring-2 focus:ring-nokia-blue-500 focus:border-transparent transition-colors duration-200"
        >
          <span className={`${selected.length === 0 ? 'text-nokia-gray-500' : 'text-nokia-gray-900'}`}>
            {getDisplayText()}
          </span>
          <svg
            className={`w-5 h-5 text-nokia-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-nokia-gray-200 rounded-lg shadow-medium max-h-60 overflow-y-auto">
            <div className="p-2 border-b border-nokia-gray-200">
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-xs text-nokia-blue-600 hover:text-nokia-blue-700 font-medium"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs text-nokia-gray-600 hover:text-nokia-gray-700 font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>
            
            <div className="py-1">
              {branches.map((branch) => (
                <label
                  key={branch}
                  className="flex items-center px-3 py-2 hover:bg-nokia-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(branch)}
                    onChange={() => handleBranchToggle(branch)}
                    className="h-4 w-4 text-nokia-blue-600 focus:ring-nokia-blue-500 border-nokia-gray-300 rounded"
                  />
                  <span className="ml-3 text-sm text-nokia-gray-900 font-mono">
                    {branch}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map(branch => (
            <span
              key={branch}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-nokia-gray-100 text-nokia-gray-800 font-mono"
            >
              {branch}
              <button
                type="button"
                onClick={() => handleBranchToggle(branch)}
                className="ml-1.5 text-nokia-gray-400 hover:text-nokia-gray-600"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BranchSelector; 