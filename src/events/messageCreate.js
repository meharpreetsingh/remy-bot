const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  async execute(client, message) {
    // console.log(message);

    // message.type: https://discord-api-types.dev/api/discord-api-types-v10/enum/MessageType
    if (message.author.bot || message.channel.type === 'dm' || ![0].includes(message.type)) return;

    client.log(`[messageCreate] ${message.channel} - ${message.author.username}: ${message.content} `);
  },
};
