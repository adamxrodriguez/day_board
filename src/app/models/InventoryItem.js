const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  reorderLevel: { type: Number, required: true },
  supplierInfo: { type: String, required: true }
});

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);