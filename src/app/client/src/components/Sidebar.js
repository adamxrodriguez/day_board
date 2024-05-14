import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Sidebar = ({ onCategorySelect }) => {
  const categories = [
    'Home', // Add 'Home' to the list of categories
    'All',
    'Forms',
    'Crew',
    'Equipment',
    'NCRs',
    'Documents',
    'Certificates',
    'Dashboard',
    'Billing',
    'Settings',
  ];

  return (
    <Nav defaultActiveKey="/home" className="flex-column"> {/* Change defaultActiveKey to "/home" */}
      {categories.map((category, index) => (
        <Nav.Link
          as={Link} // Use the 'as' prop to render Nav.Link as a React Router Link
          to={category === 'Home' ? '/home' : `/${category.toLowerCase()}`} // Update 'to' prop to navigate to '/home' for Home category
          key={index}
          onClick={() => onCategorySelect(category)}
          style={{ cursor: 'pointer' }}
        >
          {category}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Sidebar;