const { getDb } = require('./db');

// get DB
const db = getDb();

// get array of all guilds on database
const getAllGuilds = async () => {
  let guilds = [];
  await db
    .collection('guilds')
    .find()
    .sort({ guildId: 1 })
    .forEach((guild) => guilds.push(guild));
  return guilds;
};
// getAllGuilds().then((guilds) => console.log(guilds));

// Get guild based on the guild id
const getGuild = async (guildId) => {
  let guild = await db.collection('guilds').findOne({ guildId: guildId });
  return guild;
};
// getGuild('357846342678085632').then((guild) => console.log(guild));

const addGuild = async (guildObj) => {
  return await db.collection('guilds').insertOne(guildObj);
};

// get user by id
const getUser = async (userId) => {
  const user = await db.collection('users').findOne({ userId: userId });
  return user;
};
// getUser('357846342678085632').then((user) => console.log(user));
// getUser('893059321322151946').then((user) => console.log(user));

const addUser = async (userObj) => {
  return await db.collection('users').insertOne(userObj);
};

const addUserData = async (...userData) => {
  return await db
    .collection('users')
    .updateOne(
      { userId: userData.userId },
      { $set: { firstname: userData.firstname, lastname: userData.lastname, countrycode: userData.countrycode } }
    );
};

const addCodetoUser = async (userId, code) => {
  return await db.collection('users').updateOne({ userId: userId }, { $set: { verificationCode: code } });
};

const setVerified = async (userId) => {
  await db.collection('users').updateOne({ userId: userId }, { $set: { isVerified: true } });
};

const setVerifiedRole = async (guildId, verifiedRoleId) => {
  // console.log(`[dbOperations] guildId: ${guildId} | role: ${verifiedRoleId}`);
  const res = await db.collection('guilds').updateOne({ guildId: guildId }, { $set: { verifiedRole: verifiedRoleId } });
};

module.exports = {
  getAllGuilds,
  getGuild,
  addGuild,
  getUser,
  addUser,
  addUserData,
  addCodetoUser,
  setVerified,
  setVerifiedRole,
};
