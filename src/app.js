require('dotenv').config();
const { Events } = require('discord.js');
const Remy = require('./structures/RemyBot');

const client = new Remy();

client.build();
