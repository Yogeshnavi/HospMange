// const jwt = require('jsonwebtoken');

// // Use the secret key from environment variables
// const secretKey = process.env.JWT_SECRET;

// // Function to create a token
// function createToken(payload) {
//     return jwt.sign(payload, secretKey, { expiresIn: '1h' });
// }

// // Middleware to verify token
// function auth(req, res, next) {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '');
//         const decoded = jwt.verify(token, secretKey);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(401).send({ error: 'Please authenticate.' });
//     }
// }

// module.exports = { createToken, auth };



// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model

const secretKey = process.env.JWT_SECRET;

function createToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

async function auth(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).send({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

module.exports = { createToken, auth };
