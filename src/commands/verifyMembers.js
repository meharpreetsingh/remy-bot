const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, Collection } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verifymembers')
    .setDescription('To verify all members in your guild!')

    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
  async execute(client, interaction) {
    // Send defer reply
    await interaction.deferReply({ ephemeral: true });

    // For each member present in the guild
    let guildMembers = new Collection();
    await interaction.guild.members
      .fetch()
      .then((members) => {
        guildMembers = members;
      })
      .catch((err) => console.log(`[verifyMembers] ${err}`));

    guildMembers.forEach(async (guildMember) => {
      if (guildMember.user.bot) return;
      if (guildMember.permissions.has(PermissionsBitField.Flags.Administrator)) return;
      // get user from database
      const dbUser = await client.database.getUser(guildMember.user.id);
      // If user doesn't exists
      if (!dbUser) {
        console.log(`[verifyMembers] ${guildMember.user.username} doesn't exists in database`);
        const newUser = {
          userId: guildMember.user.id,
          isVerified: false,
          guilds: [guildMember.guild.id],
        };
        client.database.addUser(newUser);
      }
      if (dbUser && dbUser.isVerified) {
        guildMember.setNickname(`${dbUser.firstname} ${dbUser.lastname}`);
      }
      console.log(`[verifyMembers] ${guildMember.user.id}: ${guildMember.user.username}`);
    });

    // Send proper reply
    await interaction.editReply({ content: `[verifyMember] in progress`, ephemeral: true });
  },
};
