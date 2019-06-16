const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const validateRegisterinput = require('../../validation/registration');
const validateLoginInput = require('../../validation/login');
const keys = require('../../config/keys');
const User = require('../../models/User');

const router = express.Router();

//@route api/user/test
//@desc test user api
//@access Public
router.post('/test', (req, res) => res.json({ msg: 'User API' }));

//@route api/user/register
//@desc register user
//@access Public
router.post('/register', (req, res) => {
  //validate
  const { errors, isValid } = validateRegisterinput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = 'username is taken';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route api/user/login
//@desc login user
//@access Public
router.post('/login', (req, res) => {
  //Validate
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username }).then(user => {
    if (user) {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            username: user.username,
            name: user.name
          };
          //sign payload
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 604800 },
            (er, token) => {
              return res.json({ success: 'true', token: 'Bearer ' + token });
            }
          );
        } else {
          errors.password = 'password is incorrect';
          return res.status(400).json(errors);
        }
      });
    } else {
      errors.username = 'username not found';
      return res.status(404).json(errors);
    }
  });
});

module.exports = router;
