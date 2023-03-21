const { Events } = require('discord.js');

module.exports = {
  name: Events.GuildCreate,
  async execute(client, guild) {
    console.log(`[guildCreate] ${guild}`);

    // Registering Commands for new guild
    // require('../utils/registerGuildSpecificSlashCommands')(client, guild);
  },
};
