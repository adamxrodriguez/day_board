import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const InventoryManagement = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reorderLevel, setReorderLevel] = useState('');
  const [supplierInfo, setSupplierInfo] = useState('');

  useEffect(() => {
    fetchInventoryItems();
    const socket = io(process.env.REACT_APP_SOCKET_IO_SERVER_URL); // Correctly specifying the server URL

    socket.on('reorderAlert', (data) => {
      alert(`Reorder Alert: ${data.message}`);
      console.log(`Reorder Alert: ${data.message}`);
    });

    return () => {
      socket.disconnect(); // Cleanup on unmount
      console.log('Socket disconnected');
    };
  }, []);

  const fetchInventoryItems = async () => {
    try {
      const response = await axios.get('/inventory');
      setInventoryItems(response.data);
      console.log('Inventory items fetched successfully.');
    } catch (error) {
      console.error('Failed to fetch inventory items:', error);
      alert('Failed to fetch inventory items');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const itemData = { itemName, quantity, reorderLevel, supplierInfo };
    try {
      await axios.post('/inventory', itemData);
      fetchInventoryItems(); // Refresh the list
      setItemName('');
      setQuantity('');
      setReorderLevel('');
      setSupplierInfo('');
      alert('Inventory item added successfully');
      console.log('Inventory item added successfully');
    } catch (error) {
      console.error('Failed to add inventory item:', error);
      alert('Failed to add inventory item');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/inventory/${id}`);
      fetchInventoryItems(); // Refresh the list
      alert('Inventory item deleted successfully');
      console.log('Inventory item deleted successfully');
    } catch (error) {
      console.error('Failed to delete inventory item:', error);
      alert('Failed to delete inventory item');
    }
  };

  return (
    <div>
      <h2>Inventory Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Item Name" required />
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required />
        <input type="number" value={reorderLevel} onChange={(e) => setReorderLevel(e.target.value)} placeholder="Reorder Level" required />
        <input type="text" value={supplierInfo} onChange={(e) => setSupplierInfo(e.target.value)} placeholder="Supplier Info" required />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {inventoryItems.map((item) => (
          <li key={item._id}>
            {item.itemName} - Quantity: {item.quantity} - Reorder Level: {item.reorderLevel}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryManagement;