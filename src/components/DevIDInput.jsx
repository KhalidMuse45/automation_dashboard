import React, { useState, useEffect } from 'react';

const DevIDInput = ({ onChange, value = '', mode = 'devId' }) => {
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode);

  // Validation regex patterns
  const devIdRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  const ipPortRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):([1-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;

  const validateInput = (input, mode) => {
    if (!input) {
      setError('');
      setIsValid(false);
      return false;
    }

    let isValidInput = false;
    if (mode === 'devId') {
      isValidInput = devIdRegex.test(input);
      if (!isValidInput) {
        setError('Dev ID must be 3-20 characters, alphanumeric with hyphens and underscores');
      }
    } else {
      isValidInput = ipPortRegex.test(input);
      if (!isValidInput) {
        setError('Please enter a valid IP address and port (e.g., 192.168.1.100:8080)');
      }
    }

    setError(isValidInput ? '' : setError);
    setIsValid(isValidInput);
    return isValidInput;
  };

  useEffect(() => {
    validateInput(value, currentMode);
  }, [value, currentMode]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    const isValidInput = validateInput(newValue, currentMode);
    onChange(newValue, currentMode, isValidInput);
  };

  const handleModeToggle = () => {
    const newMode = currentMode === 'devId' ? 'ipPort' : 'devId';
    setCurrentMode(newMode);
    setError('');
    setIsValid(false);
    onChange(value, newMode, false);
  };

  const getPlaceholder = () => {
    return currentMode === 'devId' ? 'dev-123' : '192.168.1.100:8080';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor="devIdInput" className="block text-sm font-medium text-nokia-gray-700">
          {currentMode === 'devId' ? 'Dev ID' : 'IP:Port'}
        </label>
        <button
          type="button"
          onClick={handleModeToggle}
          className="flex items-center text-sm text-nokia-blue-600 hover:text-nokia-blue-700 font-medium"
        >
          <span className="mr-2">Switch to {currentMode === 'devId' ? 'IP:Port' : 'Dev ID'}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </button>
      </div>
      
      <input
        id="devIdInput"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={getPlaceholder()}
        className={`input-field ${error ? 'border-red-300 focus:ring-red-500' : ''} ${isValid ? 'border-green-300' : ''}`}
      />
      
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {isValid && !error && (
        <p className="text-sm text-green-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Valid {currentMode === 'devId' ? 'Dev ID' : 'IP:Port'}
        </p>
      )}
    </div>
  );
};

export default DevIDInput; 