module.exports = {
  token: process.env.DISCORD_TOKEN || '', // Discord Bot Token
  clientId: process.env.CLIENT_ID || '',
  // Presence of Bot on Discord
  Presence: {
    status: 'online', // You can show online, idle, and dnd
    name: 'Remy', // The message shown
    type: 'Chilling', // PLAYING, WATCHING, LISTENING, STREAMING
  },

  // MongoDB
  mongoDb: {
    uri: process.env.MONGODB_URI || '',
    dbname: process.env.MONGODB_NAME || '',
  },
};
