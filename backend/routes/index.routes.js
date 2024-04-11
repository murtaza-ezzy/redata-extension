const express = require('express');
const router = express.Router();

const user = require('./user.routes');
const tracking = require('./tracking.routes');

router.use('/user', user);
router.use('/tracking', tracking);

module.exports = router;
