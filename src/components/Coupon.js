import React from 'react';
import { string, number, object } from 'prop-types';
import StoreMap from './StoreMap';

const Coupon = ({ firebaseCoupon }) => {
  return (
    <div>
      <h1 className="ui center aligned header">{firebaseCoupon.code}</h1>
      <img
        src="https://randomqr.com/assets/images/randomqr-256.png"
        alt="COULD NOT LOAD COUPON"
        width="300"
        height="300"
      ></img>
      <h2 className="ui center aligned header">{firebaseCoupon.restaurant}</h2>
      <h2 className="ui center aligned header">{firebaseCoupon.description}</h2>
      <div class="ui two column centered grid">
        <div class="column"><StoreMap
          latitude={firebaseCoupon.latitude}
          longitude={firebaseCoupon.longitude}
        ></StoreMap></div>
        <div class="four column centered row">
          <div class="column"></div>
          <div class="column"></div>
        </div>
      </div>
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
