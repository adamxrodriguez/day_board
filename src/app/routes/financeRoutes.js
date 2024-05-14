const express = require('express');
const { isAuthenticated } = require('./middleware/authMiddleware');
const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');

const router = express.Router();

// Create a new transaction
router.post('/transactions', isAuthenticated, async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    console.log('Transaction created:', transaction);
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error.message, error.stack);
    res.status(400).json({ message: 'Failed to create transaction', error: error.message });
  }
});

// Get all transactions
router.get('/transactions', isAuthenticated, async (req, res) => {
  try {
    const transactions = await Transaction.find();
    console.log('Transactions retrieved:', transactions.length);
    res.json(transactions);
  } catch (error) {
    console.error('Error retrieving transactions:', error.message, error.stack);
    res.status(500).json({ message: 'Failed to retrieve transactions', error: error.message });
  }
});

// Update a transaction
router.put('/transactions/:id', isAuthenticated, async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(`Transaction updated: ${req.params.id}`, transaction);
    res.json(transaction);
  } catch (error) {
    console.error(`Error updating transaction: ${req.params.id}:`, error.message, error.stack);
    res.status(400).json({ message: 'Failed to update transaction', error: error.message });
  }
});

// Delete a transaction
router.delete('/transactions/:id', isAuthenticated, async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    console.log(`Transaction deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting transaction: ${req.params.id}:`, error.message, error.stack);
    res.status(500).json({ message: 'Failed to delete transaction', error: error.message });
  }
});

// Create a new budget
router.post('/budgets', isAuthenticated, async (req, res) => {
  try {
    const budget = new Budget(req.body);
    await budget.save();
    console.log('Budget created:', budget);
    res.status(201).json(budget);
  } catch (error) {
    console.error('Error creating budget:', error.message, error.stack);
    res.status(400).json({ message: 'Failed to create budget', error: error.message });
  }
});

// Get all budgets
router.get('/budgets', isAuthenticated, async (req, res) => {
  try {
    const budgets = await Budget.find();
    console.log('Budgets retrieved:', budgets.length);
    res.json(budgets);
  } catch (error) {
    console.error('Error retrieving budgets:', error.message, error.stack);
    res.status(500).json({ message: 'Failed to retrieve budgets', error: error.message });
  }
});

// Update a budget
router.put('/budgets/:id', isAuthenticated, async (req, res) => {
  try {
    const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(`Budget updated: ${req.params.id}`, budget);
    res.json(budget);
  } catch (error) {
    console.error(`Error updating budget: ${req.params.id}:`, error.message, error.stack);
    res.status(400).json({ message: 'Failed to update budget', error: error.message });
  }
});

// Delete a budget
router.delete('/budgets/:id', isAuthenticated, async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    console.log(`Budget deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting budget: ${req.params.id}:`, error.message, error.stack);
    res.status(500).json({ message: 'Failed to delete budget', error: error.message });
  }
});

module.exports = router;