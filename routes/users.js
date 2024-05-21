const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Basket = require('../models/basket');
const generateToken = require('../utils/token');

// Signup route
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();

        // Create a basket for the new user
        const newBasket = new Basket({ user_id: newUser._id });
        await newBasket.save();

        const token = generateToken(newUser);
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
