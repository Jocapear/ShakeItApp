import React, { Component } from 'react';
import { string, number, object } from 'prop-types';
import StoreMap from './StoreMap';
import firebase from 'firebase';

class Coupon extends Component {
  constructor(){
    super()
    this.state = { couponData:null }
  }
  

  async componentDidMount(){
    console.log(this.state)
    const couponPromise = this.getCoupon()
    const couponData = await couponPromise
    this.setState({couponData})
    console.log(this.state)
  }

  render(){
    setTimeout(function(){
      
      return (
        <div>
        <h1>{this.state.couponData.code}</h1>
        <img
          src="https://randomqr.com/assets/images/randomqr-256.png"
          alt="COULD NOT LOAD COUPON"
          width="300"
          height="300"
        ></img>
        <h2>{this.state.couponData.restaurant}</h2>
        <h2>{this.state.couponData.branch}</h2>
        <h2>{this.state.couponData.description}</h2>
        <StoreMap
          latitude={this.state.couponData.latitude}
          longitude={this.state.couponData.longitude}
        ></StoreMap>
      </div>
      );
    }, 4000)
    return null
  };

  getCoupon = async ()=>{
    return new Promise(async (resolve, reject)=>{
      var coupons = [];
    var restaurants = await firebase.database().ref().child('/Restaurantes/');
    await restaurants.once("value", function(snapshot) {
      snapshot.forEach( function(restaurant) {
        var singleRestaurant =  firebase.database().ref().child('/Restaurantes/' + restaurant.key + '/Sucursales/')
        singleRestaurant.once("value", function(snapshot) {
          snapshot.forEach(function(branch) {
            var singleSucursal = firebase.database().ref().child('/Restaurantes/'+restaurant.key + '/Sucursales/' + branch.key + '/Cupones/');
            singleSucursal.once("value", function(snapshot){
              snapshot.forEach(function(coupon) {
                var path = '/Restaurantes/'+restaurant.key + '/Sucursales/' + branch.key + '/Cupones/' + coupon.key;
                var restaurantData = restaurant.val();
                var branchData = branch.val();
                var couponData = coupon.val();
                couponData.path = path
                var finalCoupon = {code:coupon.key,restaurant:restaurantData,branch:branchData,description:couponData.Promo, latitude:branchData.Latitud, longitude:branchData.Longitud};
                coupons.push(finalCoupon);
              })
            })
          })
        })
      });
    });
    var randomCoupon = coupons[Math.floor(Math.random()*coupons.length)];
    resolve(randomCoupon);
    })
    
  }

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
