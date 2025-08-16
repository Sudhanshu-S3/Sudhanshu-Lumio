const emailService = require('../services/email.service');

exports.shareSummary = async (req, res) => {
  try {
    const { email, summary } = req.body || {};
    if (!email || !summary) {
      return res.status(400).json({ error: 'Email and summary are required.' });
    }

    const result = await emailService.sendSummaryEmail(email, summary);

    // In dev (Ethereal or Mailtrap sandbox), previewUrl helps you view the message
    const payload = { message: `Summary successfully sent to ${email}` };
    if (result.previewUrl) payload.previewUrl = result.previewUrl;
    if (result.transportHost) payload.transport = result.transportHost;

    return res.status(200).json(payload);
  } catch (err) {
    console.error('Error sending summary email:', err);
    return res.status(500).json({ error: err.message || 'Failed to send email.' });
  }
};
