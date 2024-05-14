const express = require('express');
const CrewMember = require('../models/CrewMember');
const { isAuthenticated } = require('./middleware/authMiddleware');

const router = express.Router();

// Add a crew member
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const crewMember = await CrewMember.create(req.body);
    console.log(`Crew member ${crewMember.name} added successfully.`);
    res.status(201).json(crewMember);
  } catch (error) {
    console.error('Error adding crew member:', error.message, error.stack);
    res.status(400).json({ error: error.message });
  }
});

// List all crew members
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const crewMembers = await CrewMember.find();
    console.log(`Retrieved all crew members successfully.`);
    res.json(crewMembers);
  } catch (error) {
    console.error('Error fetching crew members:', error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
});

// Update a crew member
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const updatedCrewMember = await CrewMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(`Crew member ${updatedCrewMember.name} updated successfully.`);
    res.json(updatedCrewMember);
  } catch (error) {
    console.error('Error updating crew member:', error.message, error.stack);
    res.status(400).json({ error: error.message });
  }
});

// Delete a crew member
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    await CrewMember.findByIdAndDelete(req.params.id);
    console.log(`Crew member with ID ${req.params.id} deleted successfully.`);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting crew member:', error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;