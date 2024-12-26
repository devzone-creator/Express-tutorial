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

/*
GitHub Copilot
Sure, let's break down the server.js file into a more detailed format, explaining each part of the code:

1. Importing Required Modules

const express = require('express');
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt')
//const jwt = require('jsonwebtoken')
//const bodyparser = require('body')

express: A web framework for Node.js, used to build web applications and APIs.
mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js, used to interact with MongoDB databases.
bcrypt: A library to hash passwords (commented out).
jsonwebtoken: A library to create and verify JSON Web Tokens (commented out).
bodyparser: A middleware to parse incoming request bodies (commented out).

2. Creating an Express Application
const app = express();
app: An instance of an Express application.

3. Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/Phubstorage', {
}).then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log('Failed to connect to the database', err);
});
mongoose.connect: Connects to a MongoDB database named Phubstorage running on localhost at port 27017.
then: Executes the callback if the connection is successful, logging a success message.
catch: Executes the callback if the connection fails, logging an error message.

4. Starting the Server
app.listen(3001, () => {
    console.log('Server is running');
});
app.listen: Starts the server on port 3001.
callback: Logs a message indicating that the server is running.

5. Serving Static Files
app.use(express.static('public'));
express.static: Serves static files from the public directory.

6. Simulating a 500 Error
app.get('/error', (req, res) => {
    throw new Error('This is a simulated server error');
});
app.get('/error'): Defines a route that throws an error when accessed.
throw new Error: Throws an error to simulate a server error.

7. Serving the Home Page
app.get('/', (req, res) => {
    res.sendFile('./views/home.html', { root: __dirname });
});
app.get('/'): Defines a route for the root URL (/).
res.sendFile: Sends the home.html file located in the views directory as the response.

Summary
Modules: Import necessary modules for the application.
Express App: Create an instance of an Express application.
MongoDB Connection: Connect to a MongoDB database using Mongoose.
Server: Start the server on port 3001.
Static Files: Serve static files from the public directory.
Error Simulation: Define a route to simulate a 500 server error.
Home Page: Define a route to serve the home page.

const express = require('express');
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt')
//const jwt = require('jsonwebtoken')
//const bodyparser = require('body')

const app = express();

mongoose.connect('mongodb://localhost:27017/Phubstorage', {
}).then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log('Failed to connect to the database', err);
});

app.listen(3001, () => {
    console.log('Server is running');
});

app.use(express.static('public'));

// Simulate a 500 error
app.get('/error', (req, res) => {
    throw new Error('This is a simulated server error');
});

app.get('/', (req, res) => {
    res.sendFile('./views/home.html', { root: __dirname });
});*/