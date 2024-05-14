import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaintenanceManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedPersonnel, setAssignedPersonnel] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/maintenance');
      setTasks(response.data);
      console.log('Maintenance tasks fetched successfully.');
    } catch (error) {
      console.error('Error fetching maintenance tasks:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const taskData = { taskDescription, dueDate, assignedPersonnel, status };
    try {
      await axios.post('/maintenance', taskData);
      fetchTasks(); // Refresh the list
      setTaskDescription('');
      setDueDate('');
      setAssignedPersonnel('');
      setStatus('');
      console.log('Maintenance task added successfully.');
    } catch (error) {
      console.error('Failed to add maintenance task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/maintenance/${id}`);
      fetchTasks(); // Refresh the list
      console.log('Maintenance task deleted successfully.');
    } catch (error) {
      console.error('Failed to delete maintenance task:', error);
    }
  };

  return (
    <div>
      <h2>Maintenance Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} placeholder="Task Description" required />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        <input type="text" value={assignedPersonnel} onChange={(e) => setAssignedPersonnel(e.target.value)} placeholder="Assigned Personnel" required />
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.taskDescription} - {new Date(task.dueDate).toLocaleDateString()} - {task.assignedPersonnel} - {task.status}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintenanceManagement;