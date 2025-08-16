const geminiService = require('../services/gemini.service');


exports.generateSummary = async (req, res) => {
  try {
    const { transcript, prompt } = req.body || {};
    if (!transcript || !prompt) {
      return res.status(400).json({ error: 'Transcript and prompt are required.' });
    }

    const summary = await geminiService.generateSummary(transcript, prompt);
    return res.status(200).json({ summary });
  } catch (err) {
    console.error('Error generating summary:', err);
    // Return the actual error message for easier debugging
    return res.status(500).json({ error: err.message || 'Failed to generate summary' });
  }
};