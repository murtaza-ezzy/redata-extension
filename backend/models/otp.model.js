const mongoose = require('mongoose');
const constants = require('../config/constants');

const OtpSchema = mongoose.Schema({
    email: { type: String },
    otp: { type: Number },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});


module.exports = mongoose.model('otp', OtpSchema);