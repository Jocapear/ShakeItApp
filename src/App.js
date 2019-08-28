import React from 'react';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Shake it!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get a promo code
        </a>
        <Login />
      </header>
    </div>
  );
}

export default App;
