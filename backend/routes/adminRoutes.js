// routes/authRoutes.js
const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Register a new user
router.post('/signup', async (req, res) => {
    const { name, email, password, username } = req.body;
    console.log('Signup request received:', req.body);

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists with this email" });
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ error: "Username already taken" });
        }

        const newUser = new User({ name, email, password, username });
        const result = await newUser.save();
        const resultObj = result.toObject();
        delete resultObj.password; // Remove password from response
        res.json(resultObj);
    } catch (error) {
        console.error('Server error during signup:', error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

module.exports = router;
