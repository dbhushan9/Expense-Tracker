const express = require('express');
const router = express.Router();

//@route POST api/wallet/test
//@description test wallet api
//@access Public
router.post('/test', (req, res) => res.json({ msg: 'Wallet API' }));

module.exports = router;
