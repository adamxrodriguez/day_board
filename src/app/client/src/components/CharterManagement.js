import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharterManagement = () => {
  const [charters, setCharters] = useState([]);
  const [charterName, setCharterName] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [duration, setDuration] = useState('');
  const [clientName, setClientName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchCharters();
  }, []);

  const fetchCharters = async () => {
    try {
      const response = await axios.get('/charters');
      setCharters(response.data);
      console.log('Charters fetched successfully.');
    } catch (error) {
      console.error('Failed to fetch charters:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCharter = { charterName, bookingDate, duration, clientDetails: { name: clientName, contactNumber }, price };
    try {
      await axios.post('/charters', newCharter);
      fetchCharters(); // Refresh the list
      setCharterName('');
      setBookingDate('');
      setDuration('');
      setClientName('');
      setContactNumber('');
      setPrice('');
      console.log('Charter added successfully.');
    } catch (error) {
      console.error('Failed to add charter:', error);
    }
  };

  return (
    <div>
      <h2>Charter Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={charterName} onChange={(e) => setCharterName(e.target.value)} placeholder="Charter Name" required />
        <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} required />
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (days)" required />
        <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client Name" required />
        <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder="Contact Number" required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
        <button type="submit">Add Charter</button>
      </form>
      <ul>
        {charters.map((charter) => (
          <li key={charter._id}>
            {charter.charterName} - {new Date(charter.bookingDate).toLocaleDateString()} - Duration: {charter.duration} days - Client: {charter.clientDetails.name} - Contact: {charter.clientDetails.contactNumber} - Price: {charter.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharterManagement;