const express = require('express');
const router = express.Router();
const users = require('../models/user');

// Register
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send('Username and password required');

    if (users.find(u => u.username === username)) {
        return res.status(400).send('Username already exists');
    }

    users.push({ username, password });
    res.send('User registered successfully!');
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(400).send('Invalid username or password');

    res.send('Login successful!');
});

module.exports = router;
