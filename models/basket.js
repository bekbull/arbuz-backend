const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Basket = mongoose.model('Basket', basketSchema);

module.exports = Basket;
