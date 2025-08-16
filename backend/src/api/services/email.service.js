const nodemailer = require('nodemailer');

let transporterPromise;

async function getTransporter() {
  if (!transporterPromise) {
    transporterPromise = (async () => {
      const { EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_USER, EMAIL_PASS } = process.env;

      if (EMAIL_HOST && EMAIL_PORT && EMAIL_USER && EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          host: EMAIL_HOST,
          port: Number(EMAIL_PORT),
          secure: EMAIL_SECURE === 'true' || Number(EMAIL_PORT) === 465,
          auth: { user: EMAIL_USER, pass: EMAIL_PASS },
        });
        await transporter.verify();
        return transporter;
      }

      // Dev fallback: Ethereal (preview only, no real delivery)
      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
      return transporter;
    })();
  }
  return transporterPromise;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function sendSummaryEmail(to, summary) {
  const transporter = await getTransporter();
  const from = process.env.EMAIL_FROM || 'AI Summarizer <no-reply@example.com>';

  const info = await transporter.sendMail({
    from,
    to,
    subject: 'Your AI Summary',
    text: summary,
    html: `<pre style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif">${escapeHtml(summary)}</pre>`,
  });

  const previewUrl = nodemailer.getTestMessageUrl(info) || null;

  // Helpful log (no secrets)
  console.log('Email sent:', {
    messageId: info.messageId,
    host: transporter.options.host,
    port: transporter.options.port,
    secure: transporter.options.secure,
    to,
    previewUrl,
  });

  return {
    messageId: info.messageId,
    previewUrl,
    transportHost: transporter.options.host,
  };
}

module.exports = { sendSummaryEmail };