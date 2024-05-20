const express = require('express');
const router = express.Router();
const Basket = require('../models/basket');

// Create a new basket
router.post('/', async (req, res) => {
    const { user_id } = req.body;
    try {
        const newBasket = new Basket({ user_id });
        await newBasket.save();
        res.status(201).json(newBasket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all baskets
router.get('/', async (req, res) => {
    try {
        const baskets = await Basket.find().populate('user_id');
        res.json(baskets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single basket by ID
router.get('/:id', async (req, res) => {
    try {
        const basket = await Basket.findById(req.params.id).populate('user_id');
        if (!basket) {
            return res.status(404).json({ message: 'Basket not found' });
        }
        res.json(basket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a basket by ID
router.put('/:id', async (req, res) => {
    try {
        const basket = await Basket.findById(req.params.id);
        if (!basket) {
            return res.status(404).json({ message: 'Basket not found' });
        }
        basket.updated_at = Date.now();
        await basket.save();
        res.json(basket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a basket by ID
router.delete('/:id', async (req, res) => {
    try {
        const basket = await Basket.findById(req.params.id);
        if (!basket) {
            return res.status(404).json({ message: 'Basket not found' });
        }
        await basket.remove();
        res.json({ message: 'Basket deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
