const express = require('express');
const router = express.Router();
const tracking = require('../controllers/tracking.controller');
const { auth } = require('../middleware/auth.middleware');

router.post('/', auth, tracking.add);
router.get('/', auth, tracking.get);

module.exports = router;