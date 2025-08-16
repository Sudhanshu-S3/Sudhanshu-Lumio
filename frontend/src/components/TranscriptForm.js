import React from 'react';

function TranscriptForm({ transcript, setTranscript, prompt, setPrompt }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setTranscript(e.target.result);
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-100 mb-1">1. Provide Transcript</h2>
        <p className="text-gray-400 text-sm">Upload a .txt file or paste the content below.</p>
        <div className="mt-4">
          <label htmlFor="file-upload" className="group relative flex justify-center w-full h-32 px-6 pt-5 pb-6 border-2 border-edge border-dashed rounded-md cursor-pointer hover:border-indigo-500 transition-colors">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 group-hover:text-indigo-400 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-400"><p className="pl-1">Click to upload or drag and drop</p></div>
              <p className="text-xs text-gray-500">TXT files up to 10MB</p>
            </div>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".txt" onChange={handleFileChange} />
          </label>
        </div>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Or paste your meeting transcript here..."
          className="mt-4 w-full h-40 p-3 bg-surface border border-edge rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm text-gray-100 placeholder-gray-500"
        />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-100 mb-1">2. Set Instruction</h2>
        <p className="text-gray-400 text-sm">Tell the AI how to structure the summary.</p>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Summarize in bullet points for executives'"
          className="mt-4 w-full p-3 bg-surface border border-edge rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm text-gray-100 placeholder-gray-500"
        />
      </div>
    </div>
  );
}

export default TranscriptForm;
