import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log(`Category selected: ${category}`);
    // Depending on the project structure, you might need to pass selectedCategory to another component
    // For example, to filter the displayed items in a dashboard table component.
  };

  return (
    <div className="App">
      <Sidebar onCategorySelect={handleCategorySelect} />
      {/* Render other components here, passing selectedCategory as a prop if necessary */}
    </div>
  );
}

export default App;