const express = require('express');
const passport = require('passport');

const Wallet = require('../../models/Wallet');
const validateWalletInput = require('../../validation/wallet');

const router = express.Router();

//@route  POST api/wallet/test
//@desc   test wallet api
//@access Public
router.post('/test', (req, res) => res.json({ msg: 'Wallet API' }));

//@route  POST api/wallet/create
//@desc   create wallet
//@access Private
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateWalletInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    console.log(req.user.id);
    Wallet.findOne({ user: req.user.id, name: req.body.name }).then(wallet => {
      if (wallet) {
        errors.wallet = 'wallet with same name already present';
        return res.status(400).json(errors);
      } else {
        //create wallet
        const newWallet = new Wallet({
          user: req.user.id,
          name: req.body.name,
          type: req.body.type,
          balance: req.body.balance
        });
        newWallet
          .save()
          .then(wallet => res.json(wallet))
          .catch(err => console.log(err));
      }
    });
  }
);

module.exports = router;
