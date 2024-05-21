const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const userRoutes = require('./routes/users');
const basketRoutes = require('./routes/baskets');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(bodyParser.json());

// Custom Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    res.on('finish', () => {
        console.log(`Status: ${res.statusCode}`);
    });
    next();
});

// Alternatively, use morgan for more detailed logging
app.use(morgan('dev')); // Or 'dev'

// Static folder
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/users', userRoutes);
app.use('/baskets', basketRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

module.exports = app;
