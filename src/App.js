import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Coupon from './components/Coupon';

function App() {
  const[hasCoupon,setHasCoupon] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <p>Shake it!</p>
        
        {hasCoupon ? <Coupon /> : (
          <button onClick={()=>{
            setHasCoupon(true)
          }}>
            Get a promo code
          </button>
        )}
        <br></br>
      </header>
    </div>
  );
}

export default App;
