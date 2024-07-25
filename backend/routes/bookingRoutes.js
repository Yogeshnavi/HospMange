// // routes/bookingRoutes.js
// const express = require('express');
// const Booking = require('../models/Booking'); // Assuming you have a Booking model

// const router = express.Router();

// router.post('/bookings', async (req, res) => {
//     const data = req.body;
//     console.log('Booking request received:', data);

//     try {
//         const booking = new Booking(data);
//         const result = await booking.save();
//         res.json(result);
//     } catch (error) {
//         console.error('Server error during booking:', error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// module.exports = router;

// routes/bookings.js




// // routes/bookings.js
// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking');

// // Route to book an appointment
// router.post('/bookings', async (req, res) => {
//     const { name, date, time, animal } = req.body;

//     try {
//         const newBooking = new Booking({
//             name,
//             date,
//             time,
//             animal
//         });

//         const result = await newBooking.save();
//         res.status(201).json(result);
//     } catch (error) {
//         console.error('Error during booking:', error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// // Route to get bookings for a user
// router.get('/bookings/:username', async (req, res) => {
//     const { username } = req.params;

//     try {
//         const bookings = await Booking.find({ username });
//         res.status(200).json(bookings);
//     } catch (error) {
//         console.error('Error fetching bookings:', error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// module.exports = router;





const express = require('express');
const Booking = require('../models/Booking');

const router = express.Router();

// Route to book an appointment
router.post('/bookings', async (req, res) => {
    const { name, date, time, animal, username } = req.body;

    try {
        // Create a new booking
        const newBooking = new Booking({
            name,
            date,
            time,
            animal,
            username
        });

        // Save the booking to the database
        const result = await newBooking.save();
        res.status(201).json(result);
    } catch (error) {
        console.error('Error during booking:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route to get bookings for a user or all bookings if admin
router.get('/bookings', async (req, res) => {
    try {
        // For simplicity, no authentication check is performed here
        const bookings = await Booking.find();
        return res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
