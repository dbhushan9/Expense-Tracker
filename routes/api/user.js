const express = require('express');

const router = express.Router();

//@route api/user/test
//@desc test user api
//@access Public
router.post('/test', (req, res) => res.json({ msg: 'User API' }));

module.exports = router;
