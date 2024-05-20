const mongoose = require('mongoose');

const basketItemSchema = new mongoose.Schema({
    basket_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Basket', required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    count: { type: Number, required: true }
});

const BasketItem = mongoose.model('BasketItem', basketItemSchema);

module.exports = BasketItem;
