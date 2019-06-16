const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateLoginInput = data => {
  let errors = {};
  data.username = isEmpty(data.username) ? '' : data.username;
  data.password = isEmpty(data.password) ? '' : data.password;

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username Field is Required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password Field is Required';
  }
  return { errors, isValid: isEmpty(errors) };
};

module.exports = validateLoginInput;
