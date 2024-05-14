const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  itemDescription: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  supplier: { type: String, required: true },
  orderStatus: { type: String, required: true, enum: ['Ordered', 'Delivered', 'Cancelled'] },
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);