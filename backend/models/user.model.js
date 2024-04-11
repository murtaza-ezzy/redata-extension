const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
    occupation: { type: String, required: true, enum: ['student', 'other'] },
    studentId: { type: String, required: false },
}, {
    timestamps: true
});


module.exports = mongoose.model('user', schema);