require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3030,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    email: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        from: process.env.EMAIL_FROM,
    }
};