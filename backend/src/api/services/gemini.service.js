const axios = require('axios');
const config = require('../../config');

const generateSummary = async (transcript, promt) =>{
    const apiKey = config.GEMINI_API_KEY;

    if(!apiKey){
        throw new Error('GEMINI_API_KEY is not set in the environment variables.');
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-preview-0514:generateContent?key=${apiKey}`;
    const fullPrompt = `${prompt}:\n\n---\n\n${transcript}`;

    const payload = {
        contents:[{
            parts:[{text :fullPrompt}]
        }]
    };

    try{
        const response = await axios.post(apiUrl, payload);
        return response.data.condidates[0].content.parts[0].text.trim();
    } catch (error) {
        console.error('Error from Gemini API:', error.response ? error.response.data : error.message);
        throw new Error('Failed to generate summary from AI service.');
    }
};

module.exports = {
  generateSummary,
};
