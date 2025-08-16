const nodemailer = require('nodemailer');
const config = require('../../config');


const transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    auth: {
        user: config.email.user,
        pass: config.email.pass,
    },
});

const sendSummaryEmail = async (to , summary) => {

    const mailOptions = {
        from :config.email.from,
        to: to,
        subject: 'Your Meeting Summary from MeetingGist',
        text: 'Here is your requested meeting summary:\n\n${summary}',
        html: '<p> Here is your required meeting Summary: </p><pre>${summary}</pre>',

    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch(error){
            console.error('Error sending email:', error);
            throw new Error('Failed to send email.');
    }

};


module.exports = {
    sendSummaryEmail,
}