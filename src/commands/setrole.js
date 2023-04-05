const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setrole')
    .setDescription('Add Verified role to add to verified users!')
    // Adding options
    .addRoleOption((option) =>
      option.setName('verified-role').setDescription('Role to add to the verified users').setRequired(true)
    )
    .addBooleanOption((option) =>
      option.setName('override').setDescription('Check if you want to override the previous verified role.')
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(client, interaction) {
    // Send defer reply
    await interaction.deferReply({ ephemeral: true });

    // get role id from the interaction
    const newVerifiedRole = interaction.options.getRole('verified-role');
    const isOverride = interaction.options.getBoolean('override');

    // console.log(`[setrole] roleID: ${newVerifiedRole} | override: ${isOverride}`);

    // Check if the guild already exists
    const dbGuild = await client.database.getGuild(interaction.guildId);
    if (!dbGuild) {
      const newGuild = {
        guildId: interaction.guild.id,
        guildName: interaction.guild.name,
        changeNewUserName: false,
      };
      await client.database.addGuild(newGuild);
      await client.database.setVerifiedRole(interaction.guild.id, newVerifiedRole.id);
      interaction.editReply({ content: `Server Verified Role: ${newVerifiedRole}` });
    }
    if (dbGuild) {
      // Check if the guild already have a role assigned
      if (!dbGuild.verifiedRole || isOverride) {
        await client.database.setVerifiedRole(dbGuild.guildId, newVerifiedRole.id);
        interaction.editReply({ content: `Server Verified Role: ${newVerifiedRole}` });
      } else {
        interaction.editReply({ content: `To change new role set 'override' parameter to true` });
      }
    }
  },
};
