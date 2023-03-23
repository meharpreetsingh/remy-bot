const { Events } = require('discord.js');
const dbOperations = require('../db/dbOperations');

module.exports = {
  name: Events.GuildCreate,
  async execute(client, guild) {
    console.log(`[guildCreate] ${guild}: ${guild.id}`);

    // console.log(guild);

    const guildDB = await dbOperations.getGuild(guild.id);
    // 1. If Guild is in DB
    if (guildDB) {
      // console.log(`[guildCreate] Guild already in DB`);
    }

    // 2. If Guild is not in DB
    if (!guildDB) {
      // Add guild to database
      // console.log(`[guildCreate] Guild is not in DB`);
      const newGuild = {
        guildId: guild.id,
        guildName: guild.name,
        changeNewUserName: false,
        verifiedRole: '',
      };
      client.log(`[guildCreate, addGuild] Guild added at: ${(await dbOperations.addGuild(newGuild)).insertedId}`);
    }

    // Registering Commands for new guild
    // require('../utils/registerGuildSpecificSlashCommands')(client, guild);
  },
};
