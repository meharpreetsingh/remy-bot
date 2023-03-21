const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  async execute(client, message) {
    if (message.interaction.commandName) return;
    client.log(`[messageCreate] ${message.channel} - ${message.author.username}: ${message.content} `);
    // console.log(message);
  },
};
