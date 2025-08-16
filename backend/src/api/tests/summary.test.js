const request = require('supertest');
const app = require('../../app.js');
const geminiService = require('../services/gemini.service');
jest.mock('../services/gemini.service');

describe('Summary API', () => {

    test('GET / should return 200 and a welcome message', async() => {

        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('AI Summarizer Backend is running!');

    });

    describe('POST /api/v1/summary/generate', () => {

    test('should return a 200 status and the generated summary on success', async () => {
      const mockSummary = 'This is a mocked summary.';

      geminiService.generateSummary.mockResolvedValue(mockSummary);

      const response = await request(app)
        .post('/api/summary/generate')
        .send({
          transcript: 'This is a test transcript.',
          prompt: 'Summarize this.'
        });
      
      expect(response.statusCode).toBe(200);
      expect(response.body.summary).toBe(mockSummary);

    });

    test('should return a 400 status if transcript or prompt is missing', async () => {

      const response = await request(app)
        .post('/api/summary/generate')
        .send({
          transcript: 'This is a test transcript.'
          // prompt is missing
        });
      
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Transcript and prompt are required.');

    });

    test('should return a 500 status if the service throws an error', async () => {
     
      geminiService.generateSummary.mockRejectedValue(new Error('AI service failed'));

      const response = await request(app)
        .post('/api/summary/generate')
        .send({
          transcript: 'This is a test transcript.',
          prompt: 'Summarize this.'
        });
        
      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe('AI service failed');
      
    });
  });
});