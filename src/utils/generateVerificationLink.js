const botconfig = require('../botconfig');

module.exports = (userId) => {
  let link = `https://${botconfig.server.domain}:${port}//${botconfig.server.verificationRoute}?userID=${userId}&${}`;

  return link;
};
