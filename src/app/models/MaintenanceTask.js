const mongoose = require('mongoose');

const maintenanceTaskSchema = new mongoose.Schema({
  taskDescription: { type: String, required: true },
  dueDate: { type: Date, required: true },
  assignedPersonnel: { type: String, required: true },
  status: { type: String, required: true, enum: ['Pending', 'In Progress', 'Completed'] },
});

maintenanceTaskSchema.pre('save', function(next) {
  console.log(`Saving maintenance task: ${this.taskDescription}`);
  next();
});

maintenanceTaskSchema.post('save', function(doc) {
  console.log(`Maintenance task saved: ${doc.taskDescription}`);
});

maintenanceTaskSchema.post('remove', function(doc) {
  console.log(`Maintenance task removed: ${doc.taskDescription}`);
});

module.exports = mongoose.model('MaintenanceTask', maintenanceTaskSchema);