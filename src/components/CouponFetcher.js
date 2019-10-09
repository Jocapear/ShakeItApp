import React from 'react';
import { string, number, object } from 'prop-types';
import Coupon from './Coupon';

const CouponFetcher = () => {
  return (
    <div>
      <div class="massive ui olive animated fade button" tabindex="0">
        <div class="visible content">Shake it!</div>
        <div class="hidden content"> Get a promo</div>
      </div>
      <Coupon></Coupon>
      
    </div>
  );
};

CouponFetcher.defaultProps = {
  
};

export default CouponFetcher;