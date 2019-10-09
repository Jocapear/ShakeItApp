import React from 'react';
import './App.css';
import Header from './components/Header';
import CouponFetcher from './components/CouponFetcher';

function App() {
  return (
    <div className="App">
      <Header />
      <CouponFetcher />
      <br></br>
    </div>
  );
}

export default App;
