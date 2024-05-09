const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    type: { type: String },
    minutes: { type: Number },
    quality: { type: String },
    footprint: { type: Number }
}, {
    timestamps: true
});


module.exports = mongoose.model('mapping', schema);