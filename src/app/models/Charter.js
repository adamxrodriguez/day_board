const mongoose = require('mongoose');

const charterSchema = new mongoose.Schema({
  charterName: { type: String, required: true },
  bookingDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  clientDetails: {
    name: { type: String, required: true },
    contactNumber: { type: String, required: true }
  },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Charter', charterSchema);