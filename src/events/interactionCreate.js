const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(client, interaction) {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.channel.type == 'dm')
      await interaction.reply({ content: `Can't invoke commands here.`, ephemeral: true });

    // Get command from client
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error(`No command matching '${interaction.commandName}' was found.`);
      return;
    }
    try {
      // Execute the command
      await command.execute(client, interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  },
};
