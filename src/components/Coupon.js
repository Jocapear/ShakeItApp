import React, { Component } from 'react';
import { string, number, object } from 'prop-types';
import StoreMap from './StoreMap';
import firebase from 'firebase';

class Coupon extends Component {
  constructor() {
    super();
    this.state = { couponData: null };
  }

  async componentDidMount() {
    const couponData = await this.getCoupon();
    this.setState({ couponData });
  }

  render() {
    const { couponData } = this.state;
    if (!couponData) {
      return null;
    }

    return (
      /*
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
          <div className="ui two column centered grid">
            <div className="column">
              <StoreMap
                latitude={firebaseCoupon.latitude}
                longitude={firebaseCoupon.longitude}
              ></StoreMap>
            </div>
            <div className="four column centered row">
              <div className="column"></div>
              <div className="column"></div>
            </div>
          </div>
        </div>
      );
    */

      <div>
        <h1 className="ui center aligned header">{couponData.code}</h1>
        <img
          src="https://randomqr.com/assets/images/randomqr-256.png"
          alt="COULD NOT LOAD COUPON"
          width="300"
          height="300"
        ></img>
        <h2 className="ui center aligned header">
          {couponData.restaurant.Nombre}
        </h2>
        <h2 className="ui center aligned header">{couponData.branch.Nombre}</h2>
        <h2 className="ui center aligned header">{couponData.description}</h2>
        <StoreMap
          latitude={couponData.latitude}
          longitude={couponData.longitude}
        ></StoreMap>
      </div>
    );
  }

  getCoupon = () =>
    new Promise(resolve => {
      var coupons = [];
      var restaurants = firebase
        .database()
        .ref()
        .child('/Restaurantes/');
      restaurants.once('value', function(snapshot) {
        snapshot.forEach(function(restaurant) {
          var singleRestaurant = firebase
            .database()
            .ref()
            .child('/Restaurantes/' + restaurant.key + '/Sucursales/');
          singleRestaurant.once('value', function(snapshot) {
            snapshot.forEach(function(branch) {
              var singleSucursal = firebase
                .database()
                .ref()
                .child(
                  '/Restaurantes/' +
                    restaurant.key +
                    '/Sucursales/' +
                    branch.key +
                    '/Cupones/'
                );
              singleSucursal.once('value', function(snapshot) {
                snapshot.forEach(function(coupon) {
                  var path =
                    '/Restaurantes/' +
                    restaurant.key +
                    '/Sucursales/' +
                    branch.key +
                    '/Cupones/' +
                    coupon.key;
                  var restaurantData = restaurant.val();
                  var branchData = branch.val();
                  var couponData = coupon.val();
                  couponData.path = path;
                  var finalCoupon = {
                    code: coupon.key,
                    restaurant: restaurantData,
                    branch: branchData,
                    description: couponData.Promo,
                    latitude: branchData.Latitud,
                    longitude: branchData.Longitud,
                  };
                  coupons.push(finalCoupon);
                });
              });
            });
          });
        });
      });

      setTimeout(() => {
        const randomCoupon = coupons[Math.floor(Math.random() * coupons.length)];
        randomCoupon.latitude = Number(randomCoupon.latitude);
        randomCoupon.longitude = Number(randomCoupon.longitude);
        console.log(randomCoupon);
        resolve(randomCoupon);
      }, 500);
    });

  static propTypes = {
    firebaseCoupon: object,
    code: string,
    restaurant: string,
    description: string,
    latitude: number,
    longitude: number,
  };

  static defaultProps = {
    firebaseCoupon: {
      code: 'CUPONAPPLEBLEESXD',
      restaurant: "Appleblee's Real Center",
      description: '2x1 en Anvorguerza',
      latitude: 20.7326234,
      longitude: -103.4297673,
    },
  };
}

export default Coupon;
