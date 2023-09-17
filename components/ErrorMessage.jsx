import React, { useEffect, useState } from 'react';

const ErrorMessage = ({ error, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000); // Auto-hide after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition-opacity ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md">
        <p className="font-semibold">Error</p>
        <p>{error}</p>
        <button
          onClick={() => {
            setVisible(false);
            onClose();
          }}
          className="mt-2 bg-white text-red-500 hover:bg-red-400 hover:text-white py-1 px-3 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
