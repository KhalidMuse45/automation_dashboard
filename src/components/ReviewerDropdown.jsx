import React, { useState, useRef, useEffect } from 'react';

const ReviewerDropdown = ({ onChange, selectedReviewer = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedReviewer);
  const dropdownRef = useRef(null);

  const reviewers = [
    { id: 'alice', name: 'Alice Johnson', role: 'Senior Developer', avatar: 'AJ' },
    { id: 'bob', name: 'Bob Smith', role: 'Tech Lead', avatar: 'BS' },
    { id: 'carol', name: 'Carol Davis', role: 'QA Engineer', avatar: 'CD' },
    { id: 'david', name: 'David Wilson', role: 'DevOps Engineer', avatar: 'DW' },
    { id: 'emma', name: 'Emma Brown', role: 'Backend Developer', avatar: 'EB' }
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

  const handleReviewerSelect = (reviewerId) => {
    setSelected(reviewerId);
    setIsOpen(false);
  };

  const getSelectedReviewer = () => {
    return reviewers.find(r => r.id === selected);
  };

  const getDisplayText = () => {
    const reviewer = getSelectedReviewer();
    return reviewer ? reviewer.name : 'Select a reviewer...';
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-nokia-gray-700">
        Reviewer
      </label>
      
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 border border-nokia-gray-300 rounded-lg bg-white hover:bg-nokia-gray-50 focus:outline-none focus:ring-2 focus:ring-nokia-blue-500 focus:border-transparent transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            {selected && (
              <div className="w-8 h-8 bg-nokia-blue-100 text-nokia-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
                {getSelectedReviewer()?.avatar}
              </div>
            )}
            <span className={`${selected ? 'text-nokia-gray-900' : 'text-nokia-gray-500'}`}>
              {getDisplayText()}
            </span>
          </div>
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
            <div className="py-1">
              {reviewers.map((reviewer) => (
                <button
                  key={reviewer.id}
                  type="button"
                  onClick={() => handleReviewerSelect(reviewer.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 hover:bg-nokia-gray-50 text-left ${
                    selected === reviewer.id ? 'bg-nokia-blue-50' : ''
                  }`}
                >
                  <div className="w-8 h-8 bg-nokia-blue-100 text-nokia-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
                    {reviewer.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-nokia-gray-900">
                      {reviewer.name}
                    </div>
                    <div className="text-xs text-nokia-gray-500">
                      {reviewer.role}
                    </div>
                  </div>
                  {selected === reviewer.id && (
                    <svg className="w-5 h-5 text-nokia-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {selected && (
        <div className="flex items-center space-x-2 mt-2 p-2 bg-nokia-blue-50 rounded-lg">
          <div className="w-6 h-6 bg-nokia-blue-100 text-nokia-blue-700 rounded-full flex items-center justify-center text-xs font-medium">
            {getSelectedReviewer()?.avatar}
          </div>
          <div>
            <div className="text-sm font-medium text-nokia-gray-900">
              {getSelectedReviewer()?.name}
            </div>
            <div className="text-xs text-nokia-gray-600">
              {getSelectedReviewer()?.role}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewerDropdown; 