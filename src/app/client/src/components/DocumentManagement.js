import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('/documents');
      setDocuments(response.data);
      console.log('Documents fetched successfully.');
    } catch (error) {
      console.error('Failed to fetch documents:', error.message);
      alert('Failed to fetch documents');
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);

    try {
      await axios.post('/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchDocuments(); // Refresh the list of documents
      console.log('Document uploaded successfully.');
      alert('Document uploaded successfully');
    } catch (error) {
      console.error('Failed to upload document:', error.message);
      alert('Failed to upload document');
    }
  };

  const handleDownload = async (documentId) => {
    try {
      const response = await axios.get(`/documents/${documentId}`, { responseType: 'blob' });
      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); // Set the file name
      document.body.appendChild(link);
      link.click();
      console.log('Document downloaded successfully.');
    } catch (error) {
      console.error('Failed to download document:', error.message);
      alert('Failed to download document');
    }
  };

  const handleDelete = async (documentId) => {
    try {
      await axios.delete(`/documents/${documentId}`);
      fetchDocuments(); // Refresh the list of documents
      console.log('Document deleted successfully.');
      alert('Document deleted successfully');
    } catch (error) {
      console.error('Failed to delete document:', error.message);
      alert('Failed to delete document');
    }
  };

  return (
    <div>
      <h2>Document Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <ul>
        {documents.map((doc) => (
          <li key={doc._id}>
            {doc.name} - <button onClick={() => handleDownload(doc._id)}>Download</button> <button onClick={() => handleDelete(doc._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentManagement;