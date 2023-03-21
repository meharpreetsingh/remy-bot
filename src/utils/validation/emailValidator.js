const { validate } = require('deep-email-validator');

module.exports = async (email) => {
  let res = await validate({
    email: email,
    validateRegex: true,
    validateMx: true,
    validateTypo: true,
    validateDisposable: true,
    validateSMTP: true,
  });
  return res.valid;
};
