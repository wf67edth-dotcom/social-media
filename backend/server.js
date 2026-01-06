const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); // if you use MongoDB
const cors = require('cors');

// Import your routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
// Make sure to set DB_URL in Render Environment Variables
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/socialmedia';
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to DB'))
.catch(err => console.error('DB connection error:', err));

// API Routes
app.use('/auth', authRoutes);
app.use('/post', postRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../docs')));

// Catch-all route to serve index.html for frontend routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../docs/index.html'));
});

// Listen on Render port or 5000 locally
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
