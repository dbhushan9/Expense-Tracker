const express = require('express');
const router = express.Router();

//@route POST api/transaction/test
//@desc test transacion api
//@access Public
router.post('/test', (req, res) => res.json({ msg: 'Transaction API' }));

module.exports = router;
