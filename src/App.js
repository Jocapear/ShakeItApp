import React from 'react';
import './App.css';
import CouponFetcher from './components/CouponFetcher';
import { Menu } from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
      <Menu secondary={true} pointing={true}>
        <p>Shake it!</p>
      </Menu>
      <CouponFetcher></CouponFetcher>
      <br></br>
    </div>
  );
}

export default App;
