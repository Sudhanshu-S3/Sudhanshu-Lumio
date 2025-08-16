import React from 'react';

function Header() {
  return (
    <header className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100 bg-gradient-to-br from-indigo-400 to-violet-400 bg-clip-text text-transparent">QuickBrief</h1>
      <p className="text-gray-400 mt-3 text-lg">Your AI-powered meeting summarizer.</p>
    </header>
  );
}

export default Header;
