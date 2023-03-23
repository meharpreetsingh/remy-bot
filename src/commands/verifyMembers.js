const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verifymembers')
    .setDescription('To verify all members in your guild!')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
  async execute(client, interaction) {},
};
