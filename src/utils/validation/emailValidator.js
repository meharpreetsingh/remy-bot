const { validate } = require('deep-email-validator');

module.exports = async (email) => {
  let res = await validate({
    email: email,
    validateRegex: true,
    validateMx: true,
    validateTypo: true,
    validateDisposable: true,
    validateSMTP: false,
  });
  // console.log(`[emailValidator]`);
  // console.log(res);
  return res.valid;
};
