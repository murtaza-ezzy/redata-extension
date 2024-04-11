const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const { auth } = require('../middleware/auth.middleware');

router.post('/auth', user.auth);
router.post('/create', user.create);
router.get('/profile', auth, user.getProfile);
router.post('/password-otp-send', auth, user.sendResetPasswordOtp);
router.post('/password-otp-verify', auth, user.verifyResetPasswordOtp);

module.exports = router;