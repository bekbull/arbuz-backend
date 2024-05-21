require('dotenv').config(); // Load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');
const basketRoutes = require('./routes/baskets');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/baskets', basketRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

module.exports = app;
