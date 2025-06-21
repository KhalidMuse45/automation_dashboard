import React, { useState, useEffect } from 'react';

const FilePathInput = ({ onChange, value = '' }) => {
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Unix path validation regex
  const unixPathRegex = /^(\/[^\/\0]+)*\/?$/;

  const validatePath = (path) => {
    if (!path) {
      setError('');
      setIsValid(false);
      return false;
    }
    
    if (!unixPathRegex.test(path)) {
      setError('Please enter a valid Unix file path (e.g., /home/user/file.txt)');
      setIsValid(false);
      return false;
    }
    
    setError('');
    setIsValid(true);
    return true;
  };

  useEffect(() => {
    validatePath(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    const isValidPath = validatePath(newValue);
    onChange(newValue, isValidPath);
  };

  return (
    <div className="space-y-2">
      <label htmlFor="filePath" className="block text-sm font-medium text-nokia-gray-700">
        File Path
      </label>
      <input
        id="filePath"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="/home/user/..."
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
          Valid file path
        </p>
      )}
    </div>
  );
};

export default FilePathInput; 