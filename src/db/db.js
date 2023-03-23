require('dotenv').config(); // Delete when using for server, its already done in bot

const { MongoClient } = require('mongodb');
const botconfig = require('../botconfig');

if (!botconfig.mongoDb.uri || !botconfig.mongoDb.dbname) console.log(`[db] Define MongoDB URI`);
const uri = botconfig.mongoDb.uri;
const dbname = botconfig.mongoDb.dbname;

module.exports = {
  getDb: () => {
    try {
      const client = new MongoClient(uri);
      return client.db(dbname);
    } catch (err) {
      console.log(`[db] ${err}`);
    }
  },
};
