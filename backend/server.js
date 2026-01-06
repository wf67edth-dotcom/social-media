const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
// Set DB_URL in Render environment variables
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/socialmedia';

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// API routes
app.use('/auth', authRoutes);
app.use('/post', postRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../docs')));

// Catch-all route to serve index.html for frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../docs/index.html'));
});

// Listen on Render port or local 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
