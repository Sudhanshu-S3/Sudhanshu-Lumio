import React from 'react';

function SummaryDisplay({ summary, setSummary, recipientEmail, setRecipientEmail, onShare }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-100 mb-1">3. Your Summary</h2>
      <p className="text-gray-400 text-sm">Review and edit the generated summary below.</p>
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Your generated summary will appear here..."
        className="mt-4 w-full h-64 p-3 bg-surface border border-edge rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm text-gray-100 placeholder-gray-500"
      />
      <div className="mt-6 pt-6 border-t border-edge">
        <h3 className="text-lg font-bold text-gray-100 mb-3">Share via Email</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder="Recipient's email address"
            className="flex-grow p-3 bg-surface border border-edge rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm text-gray-100 placeholder-gray-500"
          />
          <button
            onClick={onShare}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-md transition-colors shadow-sm"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default SummaryDisplay;