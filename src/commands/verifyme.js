const { SlashCommandBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verifyme')
    .setDescription('Verify the user!')
    .addStringOption((option) => option.setName('email').setDescription('The email to verify you with').setRequired(true)),
  //.addStringOption((option) => option.setName('Email').setDescription('Email for Verification!').setRequired(true)),
  // .addNumberOption((option) => option.setName('Country Code').setDescription("Example: '91' for INDIA").setRequired(true))
  // .addNumberOption((option) => option.setName('Phone Number').setDescription('10-digit mobile number').setRequired(true)),
  async execute(interaction) {},
};
