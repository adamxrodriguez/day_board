import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import DashboardTable from './components/DashboardTable';
import MessageCenter from './components/MessageCenter';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log(`Category selected: ${category}`);
  };

  return (
    <Router>
      <div className="App d-flex">
        <Sidebar onCategorySelect={handleCategorySelect} />
        <Switch>
          <Route path="/home" component={HomePage} />
          {/* Additional routes can be placed here */}
        </Switch>
        <DashboardTable selectedCategory={selectedCategory} />
        <MessageCenter />
      </div>
    </Router>
  );
}

export default App;