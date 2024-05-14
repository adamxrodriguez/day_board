const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('./middleware/authMiddleware');
const Item = require('../models/Item'); // Ensure this path matches the actual location of your Item model

// Endpoint for fetching items based on category
router.get('/items', isAuthenticated, async (req, res) => {
  try {
    const { category } = req.query;
    const query = category === 'All' ? {} : { category };
    const items = await Item.find(query);
    res.json(items);
    console.log(`Items fetched for category: ${category}`);
  } catch (error) {
    console.error('Error fetching items:', error.message, error.stack);
    res.status(500).send('Error fetching items');
  }
});

module.exports = router;