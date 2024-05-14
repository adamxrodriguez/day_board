import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const DashboardTable = ({ selectedCategory }) => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/items?category=${encodeURIComponent(selectedCategory)}`);
        setItems(response.data);
        console.log(`Items fetched for category: ${selectedCategory}`);
      } catch (error) {
        console.error('Error fetching data:', error.message, error.stack);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('document', selectedFile);

    try {
      await axios.post('/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowModal(false);
      alert('Document uploaded successfully');
      console.log('Document uploaded successfully.');
    } catch (error) {
      console.error('Failed to upload document:', error.message, error.stack);
      alert('Failed to upload document');
    }
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Update</th>
            <th>Item</th>
            <th>Due Date</th>
            <th>Days Until Due</th>
            <th>Category</th>
            <th>Take Action</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.update}</td>
              <td>{item.name}</td>
              <td>{new Date(item.dueDate).toLocaleDateString()}</td>
              <td>{item.daysUntilDue}</td>
              <td>{item.category}</td>
              <td>
                <button>Edit</button>
              </td>
              <td>
                <button>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setShowModal(true)}>Upload Document</Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.File label="Select file to upload" custom onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Upload
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DashboardTable;