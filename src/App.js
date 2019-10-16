import React from 'react';
import './App.css';
import Header from './components/Header';
import Coupon from './components/Coupon';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <p>Shake it!</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get a promo code
        </a>
        <Coupon />
        <br></br>
      </header>
    </div>
  );
}

export default App;
