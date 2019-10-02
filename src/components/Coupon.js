import React from 'react';
import { string, number, object } from 'prop-types';
import StoreMap from './StoreMap';

const Coupon = ({ firebaseCoupon }) => {
  return (
    <div>
      <h1>{firebaseCoupon.code}</h1>
      <img
        src="https://randomqr.com/assets/images/randomqr-256.png"
        alt="COULD NOT LOAD COUPON"
        width="300"
        height="300"
      ></img>
      <h2>{firebaseCoupon.restaurant}</h2>
      <h2>{firebaseCoupon.description}</h2>
      <StoreMap
        latitude={firebaseCoupon.latitude}
        longitude={firebaseCoupon.longitude}
      ></StoreMap>
    </div>
  );
};

Coupon.propTypes = {
  firebaseCoupon: object,
  code: string,
  restaurant: string,
  description: string,
  latitude: number,
  longitude: number,
};

Coupon.defaultProps = {
  firebaseCoupon: {
    code: 'CUPONAPPLEBLEESXD',
    restaurant: "Appleblee's Real Center",
    description: '2x1 en Anvorguerza',
    latitude: 20.7326234,
    longitude: -103.4297673,
  },
};

export default Coupon;
