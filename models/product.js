const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, required: true },
    discount: { type: Number, default: 0 },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
