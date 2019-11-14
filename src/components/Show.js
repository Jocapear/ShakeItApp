import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Container, Header, Divider } from 'semantic-ui-react';
import RestaurantTable from './Restaurant/RestaurantTable';

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sucursales: [],
      key: this.props.match.params.id,
      nombre: '',
    };
  }

  componentDidMount() {
    const restRef = firebase
      .database()
      .ref()
      .child('/Restaurantes/' + this.props.match.params.id + '/Nombre/');

    restRef.on('value', snapshot => {
      this.setState({
        nombre: snapshot.val(),
      });
    });

    const ref = firebase
      .database()
      .ref()
      .child('/Restaurantes/' + this.props.match.params.id + '/Sucursales/');
    ref.on('value', snapshot => {
      let newState = [];
      snapshot.forEach(function(child) {
        newState.push(child.val());
      });

      this.setState({
        sucursales: newState,
      });
    });
  }

  delete = id => {
    firebase
      .database()
      .ref()
      .child(
        '/Restaurantes/' + this.props.match.params.id + '/Sucursales/' + id
      )
      .remove()
      .then(() => {
        console.log('Sucursal borrada!');
        //this.props.history.push("/")
      })
      .catch(error => {
        console.error('Error removing coupon: ', error);
      });
  };

  render() {
    const { sucursales, key, nombre } = this.state;
    return (
      <Container text>
        <Header size="huge">{nombre}</Header>
        <Header size="large">Sucursales:</Header>
        <Divider clearing />
        <RestaurantTable
          type="sucursal"
          restaurants={sucursales}
          removeRestaurant={this.delete}
        />
        <Divider hidden />
        <Link to={`/add/${key}`}>Crear Sucursal</Link>
      </Container>
    );
  }
}

export default Show;
