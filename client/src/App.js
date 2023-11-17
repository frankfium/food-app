// App.js
import React from 'react';
import Header from './Header';
import RestaurantPicker from './RestaurantPicker';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <RestaurantPicker />
    </div>
  );
}

export default App;