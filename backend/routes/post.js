const express = require('express');
const router = express.Router();
const posts = require('../models/post');

// Create a post
router.post('/', (req, res) => {
    const { username, content } = req.body;
    if (!username || !content) return res.status(400).send('Username and content required');

    posts.push({ username, content });
    res.send('Post created!');
});

// Get all posts
router.get('/', (req, res) => {
    res.json(posts);
});

module.exports = router;
