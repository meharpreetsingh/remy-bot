const express = require('express');
const botconfig = require('../botconfig');
const dbOperations = require('../db/dbOperations');

const server = express();
const port = botconfig.server.port;

server.get('/userVerification', async (req, res) => {
  let userId = req.query.userID;
  let code = req.query.code;

  if (!userId || !code) {
    res.status(404).send(`[server] Link is Incomplete!`);
    return;
  }

  // check if the user is already verified
  const userDb = await dbOperations.getUser(userId);
  if (!userDb) {
    res.status(404).send(`[server] User not found!`);
    return;
  }
  if (userDb && userDb.isVerified) {
    res.status(200).send(`[server] User already verified!`);
    return;
  }

  // check if the user doesn't exists
  if (!userDb) {
    res.status(404).send(`[server] User not found!!`);
    return;
  }

  // Check if the url is correct
  if (code == userDb.verificationCode) {
    dbOperations.setVerified(userId);
    res.status(200).send(`<h3>[server] User Verification Complete</h3>`);
  } else {
    res.status(404).send(`[server] User verification failed! Try Again!`);
  }
});

server.listen(port, () => {
  console.log(`[server] Listening to ${port}...`);
});

module.exports = server;
