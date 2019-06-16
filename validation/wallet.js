const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateWalletInput = data => {
  let errors = {};

  data.name = isEmpty(data.name) ? '' : data.name;
  data.type = isEmpty(data.type) ? '' : data.type;
  data.balance = isEmpty(data.balance) ? 0 : data.balance;

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Wallet name is required';
  }
  if (Validator.isEmpty(data.type)) {
    errors.type = 'Wallet Type is required';
  }
  if (data.balance < 0) {
    errors.balance = 'Balance cannot be negative';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateWalletInput;
