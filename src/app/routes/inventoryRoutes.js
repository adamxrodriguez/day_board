const express = require('express');
const InventoryItem = require('../models/InventoryItem');
const { isAuthenticated } = require('./middleware/authMiddleware');
const router = express.Router();

// Add an inventory item
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const inventoryItem = await InventoryItem.create(req.body);
    console.log(`Inventory item ${inventoryItem.itemName} added successfully.`);
    res.status(201).json(inventoryItem);
  } catch (error) {
    console.error('Error adding inventory item:', error.message, error.stack);
    res.status(400).json({ error: error.message });
  }
});

// List all inventory items
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const inventoryItems = await InventoryItem.find();
    console.log('Retrieved all inventory items successfully.');
    res.json(inventoryItems);
  } catch (error) {
    console.error('Error fetching inventory items:', error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
});

// Update an inventory item
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const updatedInventoryItem = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(`Inventory item ${updatedInventoryItem.itemName} updated successfully.`);
    res.json(updatedInventoryItem);
  } catch (error) {
    console.error('Error updating inventory item:', error.message, error.stack);
    res.status(400).json({ error: error.message });
  }
});

// Delete an inventory item
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    await InventoryItem.findByIdAndDelete(req.params.id);
    console.log(`Inventory item with ID ${req.params.id} deleted successfully.`);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting inventory item:', error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;