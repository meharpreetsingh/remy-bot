const nodemailer = require('nodemailer');
const botconfig = require('../botconfig');

const transporter = nodemailer.createTransport({
  host: botconfig.smtp.host,
  port: botconfig.smtp.port,
  auth: {
    user: botconfig.smtp.user,
    pass: botconfig.smtp.pass,
  },
});

module.exports = {
  sendVerificationEmail: async (email, verificationLink) => {
    var message = {
      from: `Remy <${botconfig.smtp.user}>`,
      to: email,
      subject: 'Account Verification Link | Remy Discord Bot',
      text: `Cick on this link to verify your account: ${verificationLink}`,
      html: `Cick on this link to verify your account: ${verificationLink}`,
    };

    transporter
      .sendMail(message)
      .then((info) => {
        console.log(`[sendMail] Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
      })
      .catch((err) => console.log(err));

    // Log Message ID
    // Preview only available when sending through an Ethereal account
  },
};
