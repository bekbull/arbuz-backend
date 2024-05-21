const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');
const auth = require('../middlewares/auth');

// Add a new product
router.post('/', async (req, res) => {
    const { imageUrl, title, price, unit, discount, category_id, count, description } = req.body;
    try {
        const category = await Category.findById(category_id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const newProduct = new Product({ imageUrl, title, price, unit, discount, category_id, count, description });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.remove();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('category_id');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
