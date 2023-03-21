module.exports = {
  token: process.env.DISCORD_TOKEN || '', // Discord Bot Token
  clientId: process.env.CLIENT_ID || '',
  guildId: '1085633048353185883',
  // Presence of Bot on Discord
  Presence: {
    status: 'online', // You can show online, idle, and dnd
    name: 'Remy', // The message shown
    type: 'Chilling', // PLAYING, WATCHING, LISTENING, STREAMING
  },
};
