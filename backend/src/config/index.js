require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3030,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};