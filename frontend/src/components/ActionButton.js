import React from 'react';

/**
 * ActionButton component designed for a dark theme.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isLoading - Indicates if the button is in a loading state.
 * @param {Function} props.onClick - The function to call when the button is clicked.
 */
function ActionButton({ isLoading, onClick }) {
  return (
    <div className="text-center">
      {/* Dark theme with a violet accent and slate neutrals */}
      <button
        onClick={onClick}
        disabled={isLoading}
        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 disabled:bg-surface disabled:text-gray-500 
                   text-white font-bold py-3 px-10 rounded-lg text-lg transition-all duration-300 ease-in-out 
                   transform hover:scale-105 disabled:scale-100 shadow-md disabled:shadow-none focus:outline-none 
                   focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-matte border border-indigo-500/40"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            {/* SVG spinner for loading indication */}
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </div>
        ) : 'Generate Summary'}
      </button>
    </div>
  );
}

export default ActionButton;