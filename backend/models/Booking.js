// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    animal: { type: String, required: true },
    username: { type: String, required: true } // Ensure this field is included
});

module.exports = mongoose.model('Booking', BookingSchema);
