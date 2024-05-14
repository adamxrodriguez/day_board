const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, required: true, enum: ['income', 'expense'] },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
  description: { type: String, required: false }
});

transactionSchema.pre('save', function(next) {
  console.log(`Saving transaction of type ${this.type} and amount ${this.amount}`);
  next();
});

transactionSchema.post('save', function(doc, next) {
  console.log(`Transaction ${doc._id} saved`);
  next();
});

transactionSchema.post('remove', function(doc) {
  console.log(`Transaction ${doc._id} removed`);
});

transactionSchema.post('find', function(docs) {
  console.log(`Found ${docs.length} transactions`);
});

transactionSchema.post('findOneAndUpdate', function(doc) {
  console.log(`Transaction ${doc._id} updated`);
});

transactionSchema.post('findOneAndDelete', function(doc) {
  console.log(`Transaction ${doc._id} deleted`);
});

transactionSchema.post('findOne', function(doc) {
  if (!doc) {
    console.log('Transaction not found');
  } else {
    console.log(`Transaction ${doc._id} found`);
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);