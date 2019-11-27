import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Container, Header, Divider } from 'semantic-ui-react';
import RestaurantTable from './Restaurant/RestaurantTable';
import { Redirect } from 'react-router-dom';
import * as ROLES from '../constants/roles';

class Coupons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cupones: [],
      restaurante: '',
      sucursal: '',
      visible: 0,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user != null) {
        if (user.uid != null) {
          firebase
            .database()
            .ref(`/Users/${user.uid}/`)
            .on("value", snapshot => {
              if (snapshot && snapshot.exists()) {
                if (snapshot.val().Type == ROLES.ADMIN || snapshot.val().Type == ROLES.RESTAURANT) {
                  this.setState({
                    visible: 1,
                  });
                } else if (snapshot.val().Type == ROLES.CLIENT ) {
                  this.setState({
                    visible: 2,
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
    const restRef = firebase
      .database()
      .ref()
      .child('/Restaurantes/' + this.props.match.params.res + '/Nombre/');
    restRef.on('value', snapshot => {
      this.setState({
        restaurante: snapshot.val(),
      });
    });

    const succRef = firebase
      .database()
      .ref()
      .child(
        '/Restaurantes/' +
          this.props.match.params.res +
          '/Sucursales/' +
          this.props.match.params.id +
          '/Nombre/'
      );
    succRef.on('value', snapshot => {
      this.setState({
        sucursal: snapshot.val(),
      });
    });

    const ref = firebase
      .database()
      .ref()
      .child(
        '/Restaurantes/' +
          this.props.match.params.res +
          '/Sucursales/' +
          this.props.match.params.id +
          '/Cupones/'
      );
    ref.on('value', snapshot => {
      var newState = [];
      snapshot.forEach(function(child) {
        newState.push(child.val());
      });
      this.setState({
        cupones: newState,
      });
    });
  }

  delete = id => {
    firebase
      .database()
      .ref()
      .child(
        '/Restaurantes/' +
          this.props.match.params.res +
          '/Sucursales/' +
          this.props.match.params.id +
          '/Cupones/' +
          id
      )
      .remove()
      .then(() => {
        console.log('Coupon successfully deleted!');
        //this.props.history.push("/")
      })
      .catch(error => {
        console.error('Error removing coupon: ', error);
      });
  };

  use = (id, cantidad) => {
    const ref = firebase
      .database()
      .ref()
      .child(
        '/Restaurantes/' +
          this.props.match.params.res +
          '/Sucursales/' +
          this.props.match.params.id +
          '/Cupones/' +
          id
      );
    ref
      .update({
        Cantidad: cantidad - 1,
      })
      .then(() => {
        console.log('Coupon successfully used!');
      })
      .catch(error => {
        console.error('Error removing coupon: ', error);
      });
  };

  render() {
    const { cupones, restaurante, sucursal } = this.state;

    if (this.state.visible == 0) {
      return (
          <Container text>
          </Container>
      );
    } else if (this.state.visible == 1) {
      return (
        <Container>
          <Header size="huge">{restaurante}</Header>
          <Header>{sucursal}</Header>
          <Header size="large">Cupones:</Header>
          <Link
            to={`/add/${this.props.match.params.res}/${this.props.match.params.id}`}
          >
            Crear Cupón
          </Link>
          <Divider hidden />
          <RestaurantTable
            type="cupon"
            restaurants={cupones}
            removeRestaurant={this.delete}
            couponUse={this.use}
          />
        </Container>
      );
    } else if (this.state.visible == 3) {
      return <Redirect to={{ pathname: '/register' }} />;
    } else {
      return <Redirect to={{ pathname: '/' }} />;
    }
  }
}

export default Coupons;
