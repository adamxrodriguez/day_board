const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  totalAmount: { type: Number, required: true },
  spentAmount: { type: Number, required: true },
  remainingAmount: { type: Number, required: true },
  categories: [{ type: String }]
});

module.exports = mongoose.model('Budget', budgetSchema);