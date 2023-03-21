module.exports = (firstname, lastname) => {
  const res = {
    valid: true,
    validators: {
      length: true,
    },
  };
  // Clean String
  const cleanFirstname = firstname.replace(/[^A-Z]/gi, '').toLowerCase();
  const cleanLastname = lastname.replace(/[^A-Z]/gi, '').toLowerCase();

  // Check length
  if (cleanFirstname.length + cleanLastname.length > 30) {
    res.validators.length = false;
  }

  return res.valid;
};
