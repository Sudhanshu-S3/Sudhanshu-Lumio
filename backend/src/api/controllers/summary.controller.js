const geminiService = require('../services/gemini.service');


const generateSummary = async (req, res) => {
    try {
        const { transcript , prompt } = req.body;

        if(!transcript || !prompt){
            return res.status(400).json({error: 'Transcript and prompt are required.'});
        }

        const summary = await geminiService.generateSummary(transcript, prompt);

        res.status(200).json({ summary });
    } catch (error){

        res.status(500).json({error: error.message});
    }

};

module.exports = {
    generateSummary,
};