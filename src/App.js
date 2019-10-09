import React from 'react';
import './App.css';
import Coupon from './components/Coupon';
import { Menu, MenuItem } from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
      <Menu
        secondary={true}
        pointing={true}
        defaultActiveIndex={0}
        items={[
          <MenuItem key={'shake-it'}>Shake it!</MenuItem>,
          <MenuItem position="right" key={'logout'}>
            Logout
          </MenuItem>,
        ]}
      />
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
