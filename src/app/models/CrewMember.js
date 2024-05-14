const mongoose = require('mongoose');

const crewMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  startDate: { type: Date, required: true },
  documentExpiryDate: { type: Date, required: true },
  status: { type: String, required: true }
});

module.exports = mongoose.model('CrewMember', crewMemberSchema);