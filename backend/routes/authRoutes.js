// const express = require('express');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// const router = express.Router();

// const bcrypt = require('bcrypt');

// // Register a new user
// // router.post('/signup', async (req, res) => {
// //     const { name, email, password, username } = req.body;

// //     try {
// //         const userExists = await User.findOne({ email });
// //         if (userExists) {
// //             return res.status(400).json({ error: 'User already exists with this email' });
// //         }

// //         const usernameExists = await User.findOne({ username });
// //         if (usernameExists) {
// //             return res.status(400).json({ error: 'Username already taken' });
// //         }

// //         const hashedPassword = await bcrypt.hash(password, 10);
// //         const newUser = new User({ name, email, password: hashedPassword, username });
// //         const result = await newUser.save();
// //         const resultObj = result.toObject();
// //         delete resultObj.password;

// //         const token = jwt.sign({ id: result._id, username: result.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
// //         res.json({ ...resultObj, token });
// //     } catch (error) {
// //         console.error('Server error during signup:', error);
// //         res.status(500).json({ error: 'Internal server error', details: error.message });
// //     }
// // });



// router.post('/api/auth/signup', async (req, res) => {
//     const { name, email, password, username } = req.body;

//     if (!name || !email || !password || !username) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     try {
//         // Your logic to create a new user
//         const newUser = { name, email, password, username }; // Example
//         res.status(201).json(newUser);
//     } catch (error) {
//         console.error('Signup error:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Login route
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(400).json({ error: 'Invalid email or password' });
//         }

//         const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         const userObj = user.toObject();
//         delete userObj.password;

//         res.json({ ...userObj, token });
//     } catch (error) {
//         console.error('Server error during login:', error);
//         res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// });

// module.exports = router;





// routes/authRoutes.js
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        const newUser = new User({ name, email, password, username });
        const result = await newUser.save();
        const resultObj = result.toObject();
        delete resultObj.password;

        const token = jwt.sign({ id: result._id, username: result.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ ...resultObj, token });
    } catch (error) {
        console.error('Server error during signup:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const userObj = user.toObject();
        delete userObj.password;

        res.json({ ...userObj, token });
    } catch (error) {
        console.error('Server error during login:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;
