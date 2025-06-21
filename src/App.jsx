import React, { useState, useEffect } from 'react';
import FilePathInput from './components/FilePathInput';
import DevIDInput from './components/DevIDInput';
import SuiteSelector from './components/SuiteSelector';
import BranchSelector from './components/BranchSelector';
import ReviewerDropdown from './components/ReviewerDropdown';
import ControlButtons from './components/ControlButtons';
import StatusPanel from './components/StatusPanel';

const App = () => {
  // Form state
  const [filePath, setFilePath] = useState('');
  const [filePathValid, setFilePathValid] = useState(false);
  const [devId, setDevId] = useState('');
  const [devIdMode, setDevIdMode] = useState('devId');
  const [devIdValid, setDevIdValid] = useState(false);
  const [selectedSuites, setSelectedSuites] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedReviewer, setSelectedReviewer] = useState('');

  // Status state
  const [compileStatus, setCompileStatus] = useState('waiting');
  const [testResults, setTestResults] = useState([]);
  const [reviewStatus, setReviewStatus] = useState('not_submitted');
  const [logs, setLogs] = useState([]);

  // Mock data for demonstration
  const mockTestResults = [
    { suite: 'FunTest', testCase: 'User Authentication', status: 'pass', execTime: '1.2s' },
    { suite: 'FunTest', testCase: 'Data Validation', status: 'pass', execTime: '0.8s' },
    { suite: 'ExpressTest', testCase: 'API Response', status: 'pass', execTime: '0.5s' },
    { suite: 'ExpressTest', testCase: 'Error Handling', status: 'fail', execTime: '0.3s' },
    { suite: 'FullSuite', testCase: 'Integration Test', status: 'pass', execTime: '2.1s' },
    { suite: 'FullSuite', testCase: 'Performance Test', status: 'pass', execTime: '5.7s' }
  ];

  const mockLogs = [
    { timestamp: '10:30:15', level: 'info', message: 'Starting test execution...' },
    { timestamp: '10:30:16', level: 'info', message: 'Compiling source code...' },
    { timestamp: '10:30:18', level: 'info', message: 'Compilation successful' },
    { timestamp: '10:30:20', level: 'info', message: 'Running FunTest suite...' },
    { timestamp: '10:30:22', level: 'info', message: 'FunTest completed - 2/2 passed' },
    { timestamp: '10:30:25', level: 'info', message: 'Running ExpressTest suite...' },
    { timestamp: '10:30:27', level: 'warning', message: 'Test case "Error Handling" failed' },
    { timestamp: '10:30:30', level: 'info', message: 'ExpressTest completed - 1/2 passed' },
    { timestamp: '10:30:35', level: 'info', message: 'Running FullSuite...' },
    { timestamp: '10:30:42', level: 'info', message: 'FullSuite completed - 2/2 passed' },
    { timestamp: '10:30:45', level: 'error', message: 'Overall test execution failed due to ExpressTest failures' }
  ];

  // Computed properties for button states
  const canRunTests = filePathValid && devIdValid && selectedSuites.length > 0;
  const canSubmitReview = canRunTests && compileStatus === 'pass' && testResults.length > 0;
  const canStartAutomation = canSubmitReview && reviewStatus === 'approved';
  const hasFailedTests = testResults.some(result => result.status === 'fail');

  // Event handlers
  const handleRunTests = () => {
    console.log('Running tests with:', {
      filePath,
      devId,
      devIdMode,
      selectedSuites,
      selectedBranches
    });

    // Simulate test execution
    setCompileStatus('compiling');
    setLogs([]);
    
    setTimeout(() => {
      setCompileStatus('pass');
      setTestResults(mockTestResults);
      setLogs(mockLogs);
    }, 3000);
  };

  const handleSubmitReview = () => {
    console.log('Submitting review to:', selectedReviewer);
    setReviewStatus('pending');
    
    // Simulate review process
    setTimeout(() => {
      setReviewStatus('approved');
    }, 2000);
  };

  const handleStartAutomation = () => {
    console.log('Starting automation process');
    // Add automation logic here
  };

  const handleRerunFailedTests = () => {
    console.log('Rerunning failed tests');
    // Add rerun logic here
  };

  return (
    <div className="min-h-screen bg-nokia-gray-50 font-inter">
      {/* Header */}
      <header className="bg-white shadow-soft border-b border-nokia-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-nokia-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-nokia-gray-900">
                Nokia Automation Dashboard
              </h1>
            </div>
            <div className="text-sm text-nokia-gray-500">
              Internal Developer Tools
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-nokia-gray-900 mb-6">Configuration</h2>
              
              <div className="space-y-6">
                <FilePathInput
                  value={filePath}
                  onChange={(value, isValid) => {
                    setFilePath(value);
                    setFilePathValid(isValid);
                  }}
                />

                <DevIDInput
                  value={devId}
                  mode={devIdMode}
                  onChange={(value, mode, isValid) => {
                    setDevId(value);
                    setDevIdMode(mode);
                    setDevIdValid(isValid);
                  }}
                />

                <SuiteSelector
                  selectedSuites={selectedSuites}
                  onChange={setSelectedSuites}
                />

                <BranchSelector
                  selectedBranches={selectedBranches}
                  onChange={setSelectedBranches}
                />

                <ReviewerDropdown
                  selectedReviewer={selectedReviewer}
                  onChange={setSelectedReviewer}
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="card p-6">
              <ControlButtons
                canRunTests={canRunTests}
                canSubmitReview={canSubmitReview}
                canStartAutomation={canStartAutomation}
                hasFailedTests={hasFailedTests}
                onRunTests={handleRunTests}
                onSubmitReview={handleSubmitReview}
                onStartAutomation={handleStartAutomation}
                onRerunFailedTests={handleRerunFailedTests}
              />
            </div>
          </div>

          {/* Right Column - Status Panel */}
          <div className="lg:col-span-2">
            <StatusPanel
              compileStatus={compileStatus}
              testResults={testResults}
              reviewStatus={reviewStatus}
              logs={logs}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App; 