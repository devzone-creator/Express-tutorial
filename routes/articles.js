const express = require('express');
const Article = require('../models/Article');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

// Create article
router.post('/', authenticateJWT, async (req, res) => {
    try {
        const article = new Article({
            title: req.body.title,
            content: req.body.content,
            author: req.user.userId
        });
        await article.save();
        res.status(201).send('Article created');
    } catch (err) {
        res.status(400).send('Error creating article');
    }
});

// Get all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find().populate('author', 'username');
        res.json(articles);
    } catch (err) {
        res.status(400).send('Error fetching articles');
    }
});

module.exports = router;