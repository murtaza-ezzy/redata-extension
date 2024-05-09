const express = require('express');
const router = express.Router();

const user = require('./user.routes');
const tracking = require('./tracking.routes');
const mapping = require('./mapping.routes');

router.use('/user', user);
router.use('/tracking', tracking);
router.use('/mapping', mapping);

module.exports = router;
