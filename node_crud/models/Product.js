const mongoose = require('../db');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;