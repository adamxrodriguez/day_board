const express = require('express');
const multer = require('multer');
const { isAuthenticated } = require('./middleware/authMiddleware');
const Document = require('../models/Document');
const { uploadFile, getFile } = require('../utils/awsS3');
const router = express.Router();

// Configure multer for memory storage and file size limit
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  storage: multer.memoryStorage(),
});

router.post('/documents', isAuthenticated, upload.single('document'), async (req, res) => {
  if (!req.file) {
    console.log("No file received for upload.");
    return res.status(400).send("No file received.");
  }
  try {
    const { originalname, mimetype, size, buffer } = req.file;
    const uploadResponse = await uploadFile(buffer, originalname, mimetype).catch(err => {
      console.error("Error uploading file to AWS S3:", err.message, err.stack);
      throw err;
    });
    const document = await Document.create({
      name: originalname,
      type: mimetype,
      size: size,
      ownerId: req.session.userId,
      s3Key: uploadResponse.Key
    });
    console.log(`Document uploaded successfully: ${document.name}`);
    res.status(201).json(document);
  } catch (error) {
    console.error("Error creating document in database:", error.message, error.stack);
    res.status(500).json({ error: "Error uploading document. Please try again." });
  }
});

router.get('/documents', isAuthenticated, async (req, res) => {
  try {
    const documents = await Document.find({ ownerId: req.session.userId });
    console.log(`Retrieved documents for user ${req.session.userId}`);
    res.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error.message, error.stack);
    res.status(500).json({ error: "Error fetching documents. Please try again." });
  }
});

router.get('/documents/:id', isAuthenticated, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document || document.ownerId.toString() !== req.session.userId) {
      console.log(`Document not found or access denied for document ID: ${req.params.id}`);
      return res.status(404).send('Document not found or access denied');
    }
    const fileStream = getFile(document.s3Key);
    console.log(`Streaming document: ${document.name}`);
    fileStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving document from AWS S3:", error.message, error.stack);
    res.status(500).json({ error: "Error downloading document. Please try again." });
  }
});

router.delete('/documents/:id', isAuthenticated, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document || document.ownerId.toString() !== req.session.userId) {
      console.log(`Document not found or access denied for deletion, document ID: ${req.params.id}`);
      return res.status(404).send('Document not found or access denied');
    }
    await Document.deleteOne({ _id: req.params.id });
    console.log(`Document deleted successfully: ${document.name}`);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting document:", error.message, error.stack);
    res.status(500).json({ error: "Error deleting document. Please try again." });
  }
});

module.exports = router;