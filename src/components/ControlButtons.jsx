import React from 'react';

const RunTestsButton = ({ disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-primary flex items-center space-x-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Run Tests</span>
    </button>
  );
};

const StartAutomationButton = ({ disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-primary flex items-center space-x-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <span>Start Automation</span>
    </button>
  );
};

const RerunFailedTestsButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn-secondary flex items-center space-x-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span>Rerun Failed Tests</span>
    </button>
  );
};

const ControlButtons = ({
  canRunTests,
  canStartAutomation,
  hasFailedTests,
  onRunTests,
  onStartAutomation,
  onRerunFailedTests
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-nokia-gray-900">Control Panel</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RunTestsButton
          disabled={!canRunTests}
          onClick={() => {
            console.log('Running tests...');
            onRunTests();
          }}
        />
        
        <StartAutomationButton
          disabled={!canStartAutomation}
          onClick={() => {
            console.log('Starting automation...');
            onStartAutomation();
          }}
        />
        
        {hasFailedTests && (
          <RerunFailedTestsButton
            onClick={() => {
              console.log('Rerunning failed tests...');
              onRerunFailedTests();
            }}
          />
        )}
      </div>
      
      <div className="text-sm text-nokia-gray-600 space-y-1">
        {!canRunTests && (
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-nokia-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            File path, Dev ID/IP, and test suite required to run tests
          </p>
        )}
        {canRunTests && !hasFailedTests && (
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-nokia-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Review will be auto-submitted after all tests pass
          </p>
        )}
        {!canStartAutomation && !hasFailedTests && (
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-nokia-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Review must be approved before starting automation
          </p>
        )}
      </div>
    </div>
  );
};

export default ControlButtons;
export { RunTestsButton, StartAutomationButton, RerunFailedTestsButton }; 