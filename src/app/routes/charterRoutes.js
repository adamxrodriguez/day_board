const express = require('express');
const Charter = require('../models/Charter');
const { isAuthenticated } = require('./middleware/authMiddleware');

const router = express.Router();

router.post('/', isAuthenticated, async (req, res) => {
  try {
    const charter = await Charter.create(req.body);
    console.log('Charter created:', charter);
    res.status(201).json(charter);
  } catch (error) {
    console.error('Error creating charter:', error.message, error.stack);
    res.status(400).json({ message: 'Failed to create charter', error: error.message });
  }
});

router.get('/', isAuthenticated, async (req, res) => {
  try {
    const charters = await Charter.find();
    console.log('Charters retrieved:', charters.length);
    res.json(charters);
  } catch (error) {
    console.error('Error retrieving charters:', error.message, error.stack);
    res.status(500).json({ message: 'Failed to retrieve charters', error: error.message });
  }
});

router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const charter = await Charter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(`Charter updated: ${req.params.id}`, charter);
    res.json(charter);
  } catch (error) {
    console.error(`Error updating charter: ${req.params.id}:`, error.message, error.stack);
    res.status(400).json({ message: 'Failed to update charter', error: error.message });
  }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    await Charter.findByIdAndDelete(req.params.id);
    console.log(`Charter deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting charter: ${req.params.id}:`, error.message, error.stack);
    res.status(500).json({ message: 'Failed to delete charter', error: error.message });
  }
});

module.exports = router;