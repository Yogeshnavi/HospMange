// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true }, // Add this field
    isAdmin: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
