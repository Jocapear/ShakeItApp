import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Container, Header, Divider } from 'semantic-ui-react';
import RestaurantTable from './Restaurant/RestaurantTable';

class Coupons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cupones: [],
      restaurante: '',
      sucursal: '',
    };
  }

  componentDidMount() {
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
        <Divider clearing />
        <RestaurantTable
          type="cupon"
          restaurants={cupones}
          removeRestaurant={this.delete}
          couponUse={this.use}
        />
      </Container>
    );
  }
}

export default Coupons;
