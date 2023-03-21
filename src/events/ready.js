const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    client.user.setPresence({
      status: client.botconfig.Presence.status, // You can show online, idle, and dnd
      activity: {
        name: client.botconfig.Presence.name,
        type: client.botconfig.Presence.type,
      },
    });
  },
};
