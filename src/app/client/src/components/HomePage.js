import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  console.log('Rendering HomePage component');
  return (
    <div className="container mt-4 text-center">
      <h1>Welcome to Dayboard Hub!</h1>
      <Link to="/document-management" className="btn btn-primary mt-3">Document Management</Link>
    </div>
  );
};

export default HomePage;