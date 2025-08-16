const emailService = require('../services/email.service');

const shareSummary = async (req, res) => {
  try {
    const { email, summary } = req.body;

    if (!email || !summary) {
      return res.status(400).json({ error: 'Email and summary are required.' });
    }
    
    // Basic email format validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    await emailService.sendSummaryEmail(email, summary);
    
    res.status(200).json({ message: `Summary successfully sent to ${email}` });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  shareSummary,
};
