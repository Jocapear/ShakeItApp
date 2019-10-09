import React from 'react';
import './App.css';
import Coupon from './components/Coupon';
import { Menu } from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
      <Menu secondary={true} pointing={true}>
        <p>Shake it!</p>
      </Menu>
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
    </div>
  );
}

export default App;
