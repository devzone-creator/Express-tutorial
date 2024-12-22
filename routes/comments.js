const express = require('express');
const Comment = require('../models/Comment');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

// Create comment
router.post('/', authenticateJWT, async (req, res) => {
    try {
        const comment = new Comment({
            content: req.body.content,
            author: req.user.userId,
            article: req.body.articleId
        });
        await comment.save();
        res.status(201).send('Comment created');
    } catch (err) {
        res.status(400).send('Error creating comment');
    }
});

// Get comments for an article
router.get('/:articleId', async (req, res) => {
    try {
        const comments = await Comment.find({ article: req.params.articleId }).populate('author', 'username');
        res.json(comments);
    } catch (err) {
        res.status(400).send('Error fetching comments');
    }
});

module.exports = router;