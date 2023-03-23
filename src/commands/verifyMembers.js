const { SlashCommandBuilder, PermissionFlagsBits, Collection } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verifymembers')
    .setDescription('To verify all members in your guild!')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
    .setDMPermission(false),
  async execute(client, interaction) {
    // Send defer reply
    await interaction.deferReply();

    // For each member present in the guild
    let guildMembers = new Collection();
    await interaction.guild.members
      .fetch()
      .then((members) => {
        guildMembers = members;
      })
      .catch((err) => console.log(`[verifyMembers] ${err}`));

    guildMembers.forEach((guildMember) => {
      if (!guildMember.user.bot) {
        console.log(
          `[verifyMembers] ${guildMember.user.id}: ${guildMember.user.username}#${guildMember.user.discriminator}`
        );
      }
    });

    // If already exists in the database

    // If not already exist in the database

    // Send proper reply
    await interaction.editReply({ content: `[verifyMember] in progress`, ephemeral: true });
  },
};
