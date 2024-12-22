const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
//const cookieParser = require('cookies-parser')


const app = express();
app.use(bodyParser.json())
//app.use(cookieParser())
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/Phubstorage', {
}).then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log('Failed to connect to the database', err);
});

// Importing routes
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/articles');
const commentRoutes = require('./routes/comments');

// Using routes
app.use('./api/auth', authRoutes);
app.use('./api/articles', articleRoutes);
app.use('./api/comments', commentRoutes);

// Simulate a 500 error
app.get('/error', (req, res) => {
    throw new Error('This is a simulated server error');
});

app.get('/', (req, res) => {
    res.sendFile('./views/home.html', { root: __dirname });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3001, () => {
    console.log('Server is running');
});