import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, ListGroup } from 'react-bootstrap';

const MessageCenter = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/messages');
        setMessages(response.data);
        console.log('Messages fetched successfully.');
      } catch (error) {
        console.error('Failed to fetch messages:', error.message, error.stack);
      }
    };

    fetchMessages();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/messages', { message: newMessage });
      setNewMessage('');
      // Fetch messages again to update the list
      const response = await axios.get('/api/messages');
      setMessages(response.data);
      console.log('Message sent successfully.');
    } catch (error) {
      console.error('Failed to send message:', error.message, error.stack);
    }
  };

  return (
    <div className="message-center">
      <h3>Message Center</h3>
      <ListGroup>
        {messages.map((msg, index) => (
          <ListGroup.Item key={index}>{msg.message}</ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Send</Button>
      </Form>
    </div>
  );
};

export default MessageCenter;