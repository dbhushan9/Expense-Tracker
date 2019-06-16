const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateRegisterInput = data => {
  let errors = {};
  data.name = isEmpty(data.name) ? '' : data.name;
  data.username = isEmpty(data.username) ? '' : data.username;
  data.password = isEmpty(data.password) ? '' : data.password;
  data.password2 = isEmpty(data.password2) ? '' : data.password2;

  if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = 'Name must be between 2 and 20 characters';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (!Validator.isLength(data.username, { min: 2, max: 10 })) {
    errors.username = 'Username must be between 2 and 10 characters';
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username Field is Required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password Field is Required';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be atleast 6 characters';
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password is Required';
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }
  return { errors, isValid: isEmpty(errors) };
};

module.exports = validateRegisterInput;
