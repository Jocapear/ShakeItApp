import React, { Component } from 'react';
import { string, number, object } from 'prop-types';
import StoreMap from './StoreMap';
import firebase from 'firebase';
import { Container } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import * as ROLES from '../constants/roles';
var QRCode = require('qrcode.react');

class Coupon extends Component {
  constructor() {
    super();
    this.state = { 
      couponData: null,
      visible: 0,
    };
  }

  async componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user != null) {
        if (user.uid != null) {
          firebase
            .database()
            .ref(`/Users/${user.uid}/`)
            .on("value", snapshot => {
              if (snapshot && snapshot.exists()) {
                if (snapshot.val().Type == ROLES.ADMIN || snapshot.val().Type == ROLES.RESTAURANT || snapshot.val().Type == ROLES.CLIENT) {
                  this.setState({
                    visible: 1,
                  });
                } else {
                  this.setState({
                    visible: 3,
                  });
                }
              } else {
                this.setState({
                  visible: 2,
                });
              }
            })
        }
      } else {
        this.setState({
          visible: 2,
        });
      }
    }.bind(this));
    const couponData = await this.getCoupon();
    this.setState({ couponData });
  }

  render() {
    const { couponData } = this.state;
    if (!couponData) {
      return null;
    }
    if (this.state.visible == 0) {
      return (
          <Container text>
          </Container>
      );
    } else if (this.state.visible == 1) {
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
          <QRCode value={couponData.code} size="400"></QRCode>
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
    } else if (this.state.visible == 3) {
      return <Redirect to={{ pathname: '/register' }} />;
    } else {
      return <Redirect to={{ pathname: '/' }} />;
    }
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
        const randomIndex = Math.floor(Math.random() * coupons.length);
        const randomCoupon = coupons[randomIndex];
        randomCoupon.latitude = Number(randomCoupon.latitude);
        randomCoupon.longitude = Number(randomCoupon.longitude);
        console.log('selected coupon is:', randomCoupon);
        resolve(randomCoupon);
      }, 750);
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
