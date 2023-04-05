const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verifyrole')
    .setDescription('Add Verified role to add to verified users!')
    // Adding options
    .addRoleOption((option) =>
      option.setName('verified-role').setDescription('Role to add to the verified users').setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(client, interaction) {
    // Send defer reply
    await interaction.deferReply({ ephemeral: true });

    // get guild id from the interaction
    console.log(interaction);

    // Email sent and editing reply to let the user know
    await interaction.editReply({
      content: `OK`,
      ephemeral: true,
    });
  },
};
