const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, // Seeds, Fertilizers, Grains, Equipments
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String }
});

module.exports = mongoose.model('Product', productSchema);
