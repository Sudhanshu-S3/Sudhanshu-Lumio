import React from 'react';

function MessageBox({ message }) {
  if (!message.text) return null;

  const getMessageColor = () => {
    switch (message.type) {
      case 'success': return 'text-emerald-400';
      case 'error': return 'text-rose-400';
      default: return 'text-slate-300';
    }
  };

  return (
    <p className={`text-center font-medium ${getMessageColor()}`}>
      {message.text}
    </p>
  );
}

export default MessageBox;