const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  update: String,
  name: String,
  dueDate: Date,
  daysUntilDue: Number,
  category: { type: String, required: true },
  action: String,
  view: String
});

module.exports = mongoose.model('Item', itemSchema);