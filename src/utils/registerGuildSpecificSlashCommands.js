const { REST, Routes } = require('discord.js');
const { clientId, token } = require('../botconfig');
const fs = require('fs');
const path = require('path');

module.exports = (client, guildId) => {
  const commands = [];
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(__dirname, '..', 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
  }

  // Construct and prepare an instance of the REST module
  const rest = new REST({ version: '10' }).setToken(token);

  // and deploy your commands!
  (async () => {
    try {
      // Get Guild Name from Guild id

      console.log(`[${guildId}] ${commands.length} registering (/) commands.`);

      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

      console.log(`[${guildId}] Successfully registered ${data.length} (/) commands.`);
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  })();
};
