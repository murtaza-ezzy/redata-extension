const express = require('express');
const router = express.Router();
const mapping = require('../controllers/mapping.controller');
const { auth } = require('../middleware/auth.middleware');

router.post('/', auth, mapping.add);
router.get('/', auth, mapping.get);

module.exports = router;