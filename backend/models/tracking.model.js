const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    url: { type: String },
    uid: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    time: { type: Number },
    captureDate: { type: Date }
}, {
    timestamps: true
});


module.exports = mongoose.model('tracking', schema);