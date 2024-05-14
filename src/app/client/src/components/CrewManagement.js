import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrewManagement = () => {
  const [crewMembers, setCrewMembers] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [startDate, setStartDate] = useState('');
  const [documentExpiryDate, setDocumentExpiryDate] = useState('');
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCrewMembers();
  }, []);

  const fetchCrewMembers = async () => {
    try {
      const response = await axios.get('/crew');
      setCrewMembers(response.data);
      console.log('Crew members fetched successfully.');
    } catch (error) {
      console.error('Failed to fetch crew members:', error.message, error.stack);
      alert('Failed to fetch crew members');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      role,
      startDate,
      documentExpiryDate,
      status,
    };

    try {
      if (editingId) {
        await axios.put(`/crew/${editingId}`, data);
        console.log(`Crew member ${name} updated successfully.`);
      } else {
        await axios.post('/crew', data);
        console.log(`Crew member ${name} added successfully.`);
      }
      setName('');
      setRole('');
      setStartDate('');
      setDocumentExpiryDate('');
      setStatus('');
      setEditingId(null);
      fetchCrewMembers();
    } catch (error) {
      console.error('Error submitting crew member form:', error.message, error.stack);
      alert('Error submitting form');
    }
  };

  const handleEdit = (member) => {
    setEditingId(member._id);
    setName(member.name);
    setRole(member.role);
    setStartDate(member.startDate.substring(0, 10));
    setDocumentExpiryDate(member.documentExpiryDate.substring(0, 10));
    setStatus(member.status);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/crew/${id}`);
      fetchCrewMembers();
      console.log(`Crew member deleted successfully.`);
    } catch (error) {
      console.error('Failed to delete crew member:', error.message, error.stack);
      alert('Failed to delete crew member');
    }
  };

  return (
    <div>
      <h2>Crew Management</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" required />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        <input type="date" value={documentExpiryDate} onChange={(e) => setDocumentExpiryDate(e.target.value)} required />
        <input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" required />
        <button type="submit">{editingId ? 'Update Crew Member' : 'Add Crew Member'}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Start Date</th>
            <th>Document Expiry Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {crewMembers.map((member) => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>{new Date(member.startDate).toLocaleDateString()}</td>
              <td>{new Date(member.documentExpiryDate).toLocaleDateString()}</td>
              <td>{member.status}</td>
              <td>
                <button onClick={() => handleEdit(member)}>Edit</button>
                <button onClick={() => handleDelete(member._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrewManagement;