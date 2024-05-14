const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  s3Key: { type: String, required: true } // Store the S3 key for the document
});

documentSchema.post('save', function(doc) {
  console.log(`New document ${doc.name} was uploaded successfully.`);
});

documentSchema.post('remove', function(doc) {
  console.log(`Document ${doc.name} was deleted successfully.`);
});

module.exports = mongoose.model('Document', documentSchema);