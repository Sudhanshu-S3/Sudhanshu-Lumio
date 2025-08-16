const axios = require('axios');
const config = require('../../config');

/**
 * Minimal local summarizer for development.
 * Replace with real AI integration when API key/config is set.
 */
async function generateSummary(transcript, prompt) {
  if (!transcript || !prompt) {
    throw new Error('transcript and prompt are required');
  }

  // Simple heuristic summary so the app works in dev:
  const sentences = transcript
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean)
    .slice(0, 5);

  const wantsBullets = /bullet|point|list/i.test(prompt);
  const summary = wantsBullets
    ? sentences.map(s => `• ${s.trim()}`).join('\n')
    : sentences.join(' ');

  return summary || transcript.slice(0, 300);
}

module.exports = { generateSummary };
