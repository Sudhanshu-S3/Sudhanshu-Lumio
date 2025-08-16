const request = require('supertest');
const app = require('../../app');
const emailService = require('../services/email.service');

// Mock the emailService
jest.mock('../services/email.service');

describe('Share API', () => {
  describe('POST /api/v1/share', () => {
    test('should return 200 and a success message when email is sent', async () => {
      emailService.sendSummaryEmail.mockResolvedValue({ messageId: 'test-id' });

      const response = await request(app)
        .post('/api/share')
        .send({
          email: 'test@example.com',
          summary: 'This is a test summary.'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Summary successfully sent to test@example.com');
    });

    test('should return 400 if email or summary is missing', async () => {
      const response = await request(app)
        .post('/api/share')
        .send({ summary: 'Missing email.' });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Email and summary are required.');
    });

    test('should return 500 if the email service fails', async () => {
      emailService.sendSummaryEmail.mockRejectedValue(new Error('SMTP server down'));

      const response = await request(app)
        .post('/api/share')
        .send({
          email: 'test@example.com',
          summary: 'This is a test summary.'
        });

      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe('SMTP server down');
    });
  });
});
