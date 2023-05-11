const { SlashCommandBuilder } = require('discord.js');

const isEmailValid = require('../utils/validation/emailValidator');
const isNameValid = require('../utils/validation/nameValidator');
const isPhoneValid = require('../utils/validation/phoneValidator');

const { sendVerificationEmail } = require('../utils/sendMail');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('To verify yourself!')
    // Adding options
    .addStringOption((option) =>
      option.setName('firstname').setDescription('Your First Name').setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('lastname').setDescription('Your Last Name').setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('email').setDescription('Your Email').setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName('countrycode').setDescription("Example: '91' for INDIA").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('phone').setDescription('10-digit mobile number').setRequired(true)
    ),

  async execute(client, interaction) {
    // Send defer reply
    await interaction.deferReply({ ephemeral: true });

    // interaction data
    const userId = interaction.user.id;

    // Check if the user already verified
    const userDB = await client.database.getUser(userId);
    if (userDB && userDB.isVerified) {
      await interaction.editReply({
        content: `You are already verified by Remy!!`,
        ephemeral: true,
      });
      return;
    }

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
    } else console.log(`[verifyMe] Invalid Name`);
    if (validPhone) {
      // Clean phone number
      phone = phone.replace(/[^0-9]/gi, '');
    } else console.log(`[verifyMe] Invalid Phone Number`);
    if (!validEmail) console.log(`[verifyMe] Invalid Email`);

    // If user doesn't exist in database
    if (!userDB) {
      await client.database.addUser({
        userId,
        firstname,
        lastname,
        email,
        countrycode,
        phone,
        isVerified: false,
      });
    }

    if (validEmail && validName && validPhone) {
      // If the data is correct

      // Generate Unique Verification Link
      let uniqueCode = Math.floor(Math.random() * 10000);
      let link = `http://${client.botconfig.server.domain}:${client.botconfig.server.port}/${client.botconfig.server.verificationRoute}?userID=${userId}&code=${uniqueCode}`;

      //sendVerificationEmail

      sendVerificationEmail(email, link)
        .then()
        .catch((err) => {
          client.log(`[verifyMe] Email verification unsuccessful...`);
        });

      // Adding the code and userdata to database
      await client.database.addCodetoUser(userId, uniqueCode);
      await client.database.addUserData(userId, email, firstname, lastname, countrycode, phone);
      console.log(`[verifyMe] Unique Code added to user database.`);

      // Email sent and editing reply to let the user know
      await interaction.editReply({
        content: `An email has been sent to **${email}** with a link to verify your account. You must __verify your account__ to access the resources.`,
        ephemeral: true,
      });
    } else {
      await interaction.editReply({
        content: `Please enter correct details! Try Again!`,
        ephemeral: true,
      });
    }
  },
};
