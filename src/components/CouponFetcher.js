import React,{ useState } from 'react';
import Coupon from './Coupon';

const CouponFetcher = () => {
  const[hasCoupon,setHasCoupon] = useState(false)
  return (
    <div>
      <p>Shake it!</p>
      {hasCoupon ? <Coupon /> : (
        <button onClick={()=>{
          setHasCoupon(true)
        }}>
          Get a promo code
        </button>
      )}
    </div>
  );
};

CouponFetcher.defaultProps = {};

export default CouponFetcher;
