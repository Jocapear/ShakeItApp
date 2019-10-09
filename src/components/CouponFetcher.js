import React from 'react';
import Coupon from './Coupon';

const CouponFetcher = () => {
  return (
    <div>
      <div className="massive ui olive animated fade button" tabIndex="0">
        <div className="visible content">Shake it!</div>
        <div className="hidden content"> Get a promo</div>
      </div>
      <Coupon></Coupon>
    </div>
  );
};

CouponFetcher.defaultProps = {};

export default CouponFetcher;
