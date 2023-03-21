module.exports = (countryCode, phone) => {
  const res = {
    valid: true,
    validators: {
      regex: true,
      phoneLength: true,
    },
  };
  const cleanPhone = phone.replace(/[^0-9]/gi, '');
  if (cleanPhone.length !== 10) {
    res.valid = false;
    res.validators.phoneLength = false;
  }
  const regex = new RegExp(/^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}$/);
  if (regex.test(`+${countryCode}-${phone}`)) {
    res.valid = false;
    res.validators.regex = false;
  }
  return res.valid;
};
