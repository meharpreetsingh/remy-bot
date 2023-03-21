const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('To verify yourself!')
    // Adding options
    .addStringOption((option) => option.setName('firstname').setDescription('Your First Name').setRequired(true))
    .addStringOption((option) => option.setName('lastname').setDescription('Your Last Name').setRequired(true))
    .addStringOption((option) => option.setName('email').setDescription('Your Email').setRequired(true))
    .addIntegerOption((option) => option.setName('countrycode').setDescription("Example: '91' for INDIA").setRequired(true))
    .addStringOption((option) => option.setName('phone').setDescription('10-digit mobile number').setRequired(true)),

  async execute(client, interaction) {
    // Send defer reply
    await interaction.deferReply();

    // Get data from Interaction
    const firstname = interaction.options.getString('firstname');
    const lastname = interaction.options.getString('lastname');
    const email = interaction.options.getString('email');
    const countrycode = interaction.options.getInteger('countrycode');
    const phone = interaction.options.getString('phone');

    // Checking if the data is correct

    // If the data is correct
    await interaction.editReply({ content: 'Verification in progress!', ephemeral: true });
  },
};
