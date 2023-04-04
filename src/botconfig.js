module.exports = {
  token: process.env.DISCORD_TOKEN || '', // Discord Bot Token
  clientId: process.env.CLIENT_ID || '',
  // Presence of Bot on Discord
  Presence: {
    status: 'online', // You can show online, idle, and dnd
    name: 'Remy', // The message shown
    type: 'Chilling', // PLAYING, WATCHING, LISTENING, STREAMING
  },

  // Server Setup
  server: {
    domain: process.env.SERVER_DOMAIN || 'localhost',
    port: process.env.SERVER_PORT || 5000,
    verificationRoute: process.env.SERVER_VERIFY_ROUTE || 'userVerification',
  },

  // MongoDB
  mongoDb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    dbname: process.env.MONGODB_NAME || 'remy-discord',
  },

  // Email / SMTP Configuration
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    security: process.env.SMTP_SECURITY || 'STARTTLS',
    user: process.env.SMTP_USERNAME || 'enrique.emard@ethereal.email',
    pass: process.env.SMTP_PASSWORD || 'vScFepe2f7uujckwCS',
  },
};
