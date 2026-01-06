const express = require('express');
const path = require('path');
const app = express();

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Import routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Use dynamic port for deployment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
