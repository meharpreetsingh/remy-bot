const { SlashCommandBuilder } = require('discord.js');

const isEmailValid = require('../utils/validation/emailValidator');
const isNameValid = require('../utils/validation/nameValidator');
const isPhoneValid = require('../utils/validation/phoneValidator');

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
    let firstname = interaction.options
      .getString('firstname')
      .replace(/[^A-Z]/gi, '')
      .toLowerCase();
    let lastname = interaction.options
      .getString('lastname')
      .replace(/[^A-Z]/gi, '')
      .toLowerCase();
    const email = interaction.options.getString('email').trim();
    const countrycode = interaction.options.getInteger('countrycode');
    let phone = interaction.options.getString('phone').trim();

    // Checking if the data is correct
    const [validEmail, validName, validPhone] = [
      await isEmailValid(email),
      isNameValid(firstname, lastname),
      isPhoneValid(countrycode, phone),
    ];
    if (validName) {
      // Capitalize first name
      firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
      lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1);
    }
    if (validPhone) {
      // Clean phone number
      phone = phone.replace(/[^0-9]/gi, '');
    }

    if (validEmail && validName && validPhone) {
      // If the data is correct
      await interaction.editReply({ content: 'Verification in progress!', ephemeral: true });
    } else {
      await interaction.editReply({ content: `Please enter correct details! Try Again!`, ephemeral: true });
    }
  },
};
