const express = require('express');
const router = express.Router();
const Basket = require('../models/basket');
const BasketItem = require('../models/basketItem');
const Product = require('../models/product');
const auth = require('../middlewares/auth');

// Protect all basket routes with the auth middleware
router.use(auth);

// Get all items in the user's basket
router.get('/', async (req, res) => {
    try {
        const basket = await Basket.findOne({ user_id: req.user.id }).populate('user_id');
        if (!basket) {
            return res.status(404).json({ message: 'Basket not found' });
        }
        const items = await BasketItem.find({ basket_id: basket._id }).populate('product_id');
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add an item to the basket
router.post('/add', async (req, res) => {
    const { product_id, count } = req.body;
    try {
        const basket = await Basket.findOne({ user_id: req.user.id });
        if (!basket) {
            return res.status(404).json({ message: 'Basket not found' });
        }

        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existingItem = await BasketItem.findOne({ basket_id: basket._id, product_id: product._id });
        if (existingItem) {
            existingItem.count += count;
            await existingItem.save();
            res.status(200).json(existingItem);
        } else {
            const newBasketItem = new BasketItem({
                basket_id: basket._id,
                product_id: product._id,
                count
            });
            await newBasketItem.save();
            res.status(201).json(newBasketItem);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Increase item count in the basket
router.post('/increase', async (req, res) => {
    const { product_id } = req.body;
    try {
        const basket = await Basket.findOne({ user_id: req.user.id });
        if (!basket) {
            return res.status(404).json({ message: 'Basket not found' });
        }

        const basketItem = await BasketItem.findOne({ basket_id: basket._id, product_id });
        if (!basketItem) {
            return res.status(404).json({ message: 'Basket item not found' });
        }

        basketItem.count += 1;
        await basketItem.save();
        res.status(200).json(basketItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Decrease item count in the basket
router.post('/decrease', async (req, res) => {
    const { product_id } = req.body;
    try {
        const basket = await Basket.findOne({ user_id: req.user.id });
        if (!basket) {
            return res.status(404).json({ message: 'Basket not found' });
        }

        const basketItem = await BasketItem.findOne({ basket_id: basket._id, product_id });
        if (!basketItem) {
            return res.status(404).json({ message: 'Basket item not found' });
        }

        if (basketItem.count > 1) {
            basketItem.count -= 1;
            await basketItem.save();
            res.status(200).json(basketItem);
        } else {
            await basketItem.remove();
            res.status(200).json({ message: 'Basket item removed' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an item from the basket
router.delete('/delete/:id', async (req, res) => {
    try {
        const basketItem = await BasketItem.findById(req.params.id);
        if (!basketItem) {
            return res.status(404).json({ message: 'Basket item not found' });
        }
        await basketItem.remove();
        res.json({ message: 'Basket item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
