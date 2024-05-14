const express = require('express');
const MaintenanceTask = require('../models/MaintenanceTask');
const { isAuthenticated } = require('./middleware/authMiddleware');
const { sendEmail } = require('../utils/emailService');
const router = express.Router();

// CRUD operations for Maintenance Tasks
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const task = await MaintenanceTask.create(req.body);
    console.log('Maintenance task created:', task);
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating maintenance task:', error.message, error.stack);
    res.status(400).json({ message: "Failed to create maintenance task", error: error.message });
  }
});

router.get('/', isAuthenticated, async (req, res) => {
  try {
    const tasks = await MaintenanceTask.find();
    console.log('Maintenance tasks retrieved:', tasks.length);
    res.json(tasks);
  } catch (error) {
    console.error('Error retrieving maintenance tasks:', error.message, error.stack);
    res.status(500).json({ message: "Failed to retrieve maintenance tasks", error: error.message });
  }
});

router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const updatedTask = await MaintenanceTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(`Maintenance task updated: ${req.params.id}`, updatedTask);
    res.json(updatedTask);
  } catch (error) {
    console.error(`Error updating maintenance task: ${req.params.id}:`, error.message, error.stack);
    res.status(400).json({ message: "Failed to update maintenance task", error: error.message });
  }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    await MaintenanceTask.findByIdAndDelete(req.params.id);
    console.log(`Maintenance task deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting maintenance task: ${req.params.id}:`, error.message, error.stack);
    res.status(500).json({ message: "Failed to delete maintenance task", error: error.message });
  }
});

module.exports = router;