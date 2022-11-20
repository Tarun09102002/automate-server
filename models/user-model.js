const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    coordinates: { type: Array, required: false },
    startLocation: { type: Object, required: false },
    endLocation: { type: Object, required: false },
    active: { type: Boolean, required: false },
})

module.exports = mongoose.model('users', User);
