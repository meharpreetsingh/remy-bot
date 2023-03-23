const { Events } = require('discord.js');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(client, member) {
    console.log(`[guildMemberAdd] ${member.guild.name}: ${member.user.username}#${member.user.discriminator}`);

    // Check if the user exists in the database
    const user = await client.database.getUser(member.user.id);
    if (user) {
      // 1. if user exists in the database
      if (user.isVerified) {
        // 1.1if user is verified
        // Modify the server profile based on the database details
        console.log(`[guildMemberAdd] 1.1 Member exists and is verified`);
      } else {
        // 1.2 if user is not verified
        console.log(`[guildMemberAdd] 1.1 Member exists but not verified`);
        // Update the guilds array to include the new guildid
        // 1.2.1 if guild is in guilds array of user
        // 1.2.2 if guild is not in guilds array of user
      }
    }
    if (!user) {
      // 2. if user doesn't exist in the database
      // console.log(`[guildMemberAdd] 2. Member doesn't exists`);

      const newUser = {
        userId: member.user.id,
        isVerified: false,
        guilds: [member.guild.id],
      };

      console.log(`[guildMemberAdd] User added at: ${(await client.database.addUser(newUser)).insertedId}`);
    }
  },
};
