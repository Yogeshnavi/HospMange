// // server.js or index.js
// const express = require('express');
// const mongoose = require('mongoose');
// const authRoutes = require('./routes/authRoutes');
// const bookingRoutes = require('./routes/bookingRoutes'); // Adjusted import
// const adminRoutes = require('./routes/adminRoutes');
// const { auth } = require('./middleware/auth');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/bookings', auth, bookingRoutes); // Adjusted use
// app.use('/api/admin', auth, adminRoutes);

// // Connect to MongoDB and start the server
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error('Failed to connect to MongoDB', err);
//   });


// index.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); 
const adminRoutes = require('./routes/adminRoutes');
const { auth } = require('./middleware/auth');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', auth, bookingRoutes); 
app.use('/api/admin', auth, adminRoutes);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
