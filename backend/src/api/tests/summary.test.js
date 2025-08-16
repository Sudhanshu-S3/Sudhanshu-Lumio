const request = require('supertest');
const app = require('../../app.js');


describe('Summary API', () => {

    test('GET / should return 200 and a welcome message', async() => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('AI Summarizer Backend is running!');
    });

    test('POST /api/summary/generate should return 200 and a placeholder message', async()=>{
        const response = await request(app)
        .post('/api/summary/generate')
        .send({
            transcript: "This is a test transcipt.",
            promt: "Summarize this."
        });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Summary routes have working correctly.');

    });
});