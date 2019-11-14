import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Container, Header, Divider } from 'semantic-ui-react';
import RestaurantTable from './RestaurantTable';

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantes: [],
      key: this.props.match.params.id,
      nombre: '',
    };
  }

  componentDidMount() {
    const restRef = firebase
      .database()
      .ref()
      .child('/Restaurantes/');

    restRef.on('value', snapshot => {
      let newState = [];
      snapshot.forEach(child => {
        newState.push(child.val());
      });

      this.setState({
        restaurantes: newState,
      });
    });
  }

  removeRestaurant = id =>
    firebase
      .database()
      .ref()
      .child('/Restaurantes/' + id)
      .remove()
      .then(() => {
        console.log('Restaurante borrado!');
      })
      .catch(error => {
        console.error('Error removing coupon: ', error);
      });

  render() {
    const { restaurantes } = this.state;
    return (
      <Container text>
        <Header size="huge">Restaurantes</Header>
        <Divider clearing />
        <Container>
          <RestaurantTable
            restaurants={restaurantes}
            removeRestaurant={this.removeRestaurant}
          />
        </Container>
        <Divider hidden />
        <Link to="/add">Crear restaurante</Link>
      </Container>
    );
  }
}

export default Restaurant;
