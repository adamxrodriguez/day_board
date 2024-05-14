import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PurchaseOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [itemDescription, setItemDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [supplier, setSupplier] = useState('');
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/purchase-orders');
      setOrders(response.data);
      console.log('Purchase orders fetched successfully.');
    } catch (error) {
      console.error('Error fetching purchase orders:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const orderData = { itemDescription, quantity, price, supplier, orderStatus };
    try {
      await axios.post('/purchase-orders', orderData);
      fetchOrders(); // Refresh the list
      setItemDescription('');
      setQuantity('');
      setPrice('');
      setSupplier('');
      setOrderStatus('');
      console.log('Purchase order added successfully.');
    } catch (error) {
      console.error('Failed to add purchase order:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/purchase-orders/${id}`);
      fetchOrders(); // Refresh the list
      console.log('Purchase order deleted successfully.');
    } catch (error) {
      console.error('Failed to delete purchase order:', error);
    }
  };

  return (
    <div>
      <h2>Purchase Order Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} placeholder="Item Description" required />
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
        <input type="text" value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder="Supplier" required />
        <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} required>
          <option value="">Select Status</option>
          <option value="Ordered">Ordered</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button type="submit">Add Order</button>
      </form>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.itemDescription} - Quantity: {order.quantity} - Price: {order.price} - Supplier: {order.supplier} - Status: {order.orderStatus}
            <button onClick={() => handleDelete(order._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseOrderManagement;