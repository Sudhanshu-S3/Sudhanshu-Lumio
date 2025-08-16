import React, { useState } from 'react';
import Header from './components/Header';
import TranscriptForm from './components/TranscriptForm';
import ActionButton from './components/ActionButton';
import MessageBox from './components/MessageBox';
import SummaryDisplay from './components/SummaryDisplay';
import Footer from './components/Footer';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || ''; // leave empty to use dev proxy

export default function App() {

  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState('Summarize in bullet points for executives');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: 'info' });

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });

  };

  const handleGenerateSummary = async () => {

    if (!transcript.trim()) {
      showMessage('Please upload or paste a transcript first.', 'error');
      return;
    }

    setIsLoading(true);
    showMessage('');

    try {

      const response = await fetch(`${API_BASE_URL}/api/summary/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript, prompt }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'An unknown error occurred.');
      setSummary(data.summary);


    } catch (error) {


      console.error('Failed to generate summary:', error);
      showMessage(`Error: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }

  };

  const handleShare = async () => {

    if (!summary.trim() || !recipientEmail.trim()) {

      showMessage('Please generate a summary and enter a recipient email.', 'error');
      return;

    }

    if (!/\S+@\S+\.\S+/.test(recipientEmail)) {

      showMessage('Please enter a valid email address.', 'error');
      return;

    }
    showMessage(`Sharing summary with ${recipientEmail}...`, 'info');


    try {

      const response = await fetch(`${API_BASE_URL}/api/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: recipientEmail, summary }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to share summary.');
      showMessage(data.message, 'success');
      setRecipientEmail('');


    } catch (error) {

      console.error('Failed to share summary:', error);
      showMessage(`Error: ${error.message}`, 'error');

    }
  };

  return (
    
    <div className="min-h-screen bg-matte text-gray-100">
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
        <Header />
        
        <div className="card p-6 md:p-8 space-y-8 max-w-3xl mx-auto">
          <TranscriptForm
            transcript={transcript}
            setTranscript={setTranscript}
            prompt={prompt}
            setPrompt={setPrompt}
          />
          <ActionButton
            isLoading={isLoading}
            onClick={handleGenerateSummary}
          />
          <MessageBox message={message} />
          
          {summary && (
            <div className="mt-8 pt-8 border-t border-edge">
              <SummaryDisplay
                summary={summary}
                setSummary={setSummary}
                recipientEmail={recipientEmail}
                setRecipientEmail={setRecipientEmail}
                onShare={handleShare}
              />
            </div>
          )}
        </div>
        
        <Footer />
      </div>
    </div>
  );
}
