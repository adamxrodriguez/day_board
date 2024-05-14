const express = require('express');
const PurchaseOrder = require('../models/PurchaseOrder');
const { isAuthenticated } = require('./middleware/authMiddleware');
const router = express.Router();

// CRUD operations for Purchase Orders
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const order = await PurchaseOrder.create(req.body);
    console.log(`Purchase order created: ${order}`);
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating purchase order:', error.message, error.stack);
    res.status(400).json({ message: 'Failed to create purchase order', error: error.message });
  }
});

router.get('/', isAuthenticated, async (req, res) => {
  try {
    const orders = await PurchaseOrder.find();
    console.log(`Retrieved ${orders.length} purchase orders.`);
    res.json(orders);
  } catch (error) {
    console.error('Error retrieving purchase orders:', error.message, error.stack);
    res.status(500).json({ message: 'Failed to retrieve purchase orders', error: error.message });
  }
});

router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const updatedOrder = await PurchaseOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(`Purchase order updated: ${updatedOrder}`);
    res.json(updatedOrder);
  } catch (error) {
    console.error(`Error updating purchase order: ${req.params.id}:`, error.message, error.stack);
    res.status(400).json({ message: 'Failed to update purchase order', error: error.message });
  }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    await PurchaseOrder.findByIdAndDelete(req.params.id);
    console.log(`Purchase order deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting purchase order: ${req.params.id}:`, error.message, error.stack);
    res.status(500).json({ message: 'Failed to delete purchase order', error: error.message });
  }
});

module.exports = router;