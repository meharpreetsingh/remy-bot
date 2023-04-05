const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const Logger = require('./Logger');
const fs = require('fs');
const path = require('path');

class Remy extends Client {
  constructor(props) {
    // Intents required for the Discord Bot
    super({
      ...props,
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
      ],
    });

    this.commands = new Collection();

    // Configure the database
    this.database = require('../db/dbOperations');

    // Connecting to server
    this.server = require('../server/server');

    // Configure Logger.js with a log file
    this.logger = new Logger(path.join(__dirname, '..', 'logs.log'));

    // Bot Configuration
    try {
      //Config for testing
      this.botconfig = require('../botconfig');
    } catch {
      //Config for production
      this.log('botconfig not found.');
    }

    // Checking Bot Configuration
    if (this.botconfig.token === '') return new TypeError('The ./botconfig.js is not filled out.');

    // Loading Command and Events using class member functions
    this.loadEvents();
    this.loadCommands();
  }

  // Load Commands
  loadCommands() {
    const commandsPath = path.join(__dirname, '..', 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);

      const command = require(filePath);
      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if ('data' in command && 'execute' in command) {
        this.commands.set(command.data.name, command);
        this.log(`Command Loaded: ${command.data.name}`);
      } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
    }
  }

  // Load Events
  loadEvents() {
    const eventsPath = path.join(__dirname, '..', 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);
      if (event.once) {
        this.once(event.name, (...args) => event.execute(this, ...args));
      } else {
        this.on(event.name, (...args) => event.execute(this, ...args));
      }
      this.log(`Event Loaded: ${event.name}`);
    }
  }

  // Conigure log function for this class
  log(text) {
    this.logger.log(text);
  }

  // Starting the bot
  build() {
    this.login(this.botconfig.token);
  }

  // Registering Slash Commands for all guild
  registerSlashCommands() {
    this.guilds.cache.forEach((guild) => {
      require('../utils/registerGuildSpecificSlashCommands')(this, guild);
    });
  }

  // Register Global Commands
  registerGlobalCommands() {
    require('../utils/registerSlashCommands')();
  }
}

module.exports = Remy;
