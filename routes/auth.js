const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        });
        await user.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(400).send('Error registering user');
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ userId: user._id }, 'd5534afc04d482cf2bcb864af45033ee7f31ae6aa10f1f3ce18c886500ca30e2e7b3d76ecc9d2bffdc6be59042b69c70ae2a7e2b24306d1762c39331efeccf33e199038d222a1fa4af0c86dcb349cd585c1cf8e8912a210f6b87c2763a9560ab218e0cd5a0be8f28dd249c4ca3650ce696de91a657fa045edc6588b8218196a61d691e56f6a5a69a9a56c2987cf31addf99cd08292bfe318bd4875f1bd6e1381d99fa551143fe0dd0318881cc43a0d12e0c70acebc7aebad13ca9d98b5e68c7251aefc6fc83f91087d71c795aa2f75f3c3967a980ac887f55aaee70033aa50998f0512b82920c17af0b27cfa24a0df406cb50d609d4fd3fffb073439135bde01');
        res.cookie('token', token, {httpOnly: true})
        res.json({ token });
    } catch (err) {
        res.status(400).send('Error logging in');
    }
});

module.exports = router;

/*GitHub Copilot
Sure! The articles.js file defines the routes for handling article-related operations in your Express application. Here's a detailed explanation of what each part of the file does:

Importing Required Modules
express: The Express framework for building web applications.
Article: The Mongoose model for articles, which interacts with the articles collection in MongoDB.
authenticateJWT: Middleware function to authenticate JSON Web Tokens (JWT) for protected routes.
Creating a Router
router: An instance of an Express router, used to define route handlers.
Route to Create an Article
router.post('/'): Defines a POST route at the root path (/) for creating a new article.
authenticateJWT: Middleware to ensure the user is authenticated before allowing them to create an article.
async (req, res): Asynchronous route handler function.
new Article({...}): Creates a new article instance with the title, content, and author (extracted from the authenticated user's ID).
await article.save(): Saves the new article to the MongoDB database.
res.status(201).send('Article created'): Sends a success response with status code 201 (Created).
catch (err): Catches any errors and sends a 400 (Bad Request) response with an error message.
Route to Get All Articles
router.get('/'): Defines a GET route at the root path (/) for fetching all articles.
async (req, res): Asynchronous route handler function.
await Article.find().populate('author', 'username'): Fetches all articles from the MongoDB database and populates the author field with the username of the author.
res.json(articles): Sends the fetched articles as a JSON response.
catch (err): Catches any errors and sends a 400 (Bad Request) response with an error message.
Exporting the Router
module.exports = router: Exports the router so it can be used in other parts of the application.
Summary
POST /api/articles: Creates a new article. Requires authentication.
GET /api/articles: Fetches all articles, including the author's username.
This file sets up the necessary routes to handle creating and fetching articles in your application, ensuring that only authenticated users can create articles.
*/