import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import CouponFetcher from './components/CouponFetcher';

function App() {
  const[hasCoupon,setHasCoupon] = useState(false)
  return (
    <div className="App">
      <Header />
      <CouponFetcher />
      <br></br>
    </div>
  );
}

export default App;
