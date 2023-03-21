const { Events } = require('discord.js');

module.exports = {
  name: Events.GuildDelete,
  async execute(client, guild) {
    console.log(`[guildDelete] ${guild}`);
  },
};
