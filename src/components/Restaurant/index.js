import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import { Link, Redirect } from 'react-router-dom';
import { Container, Header, Divider } from 'semantic-ui-react';
import RestaurantTable from './RestaurantTable';
import * as ROLES from '../../constants/roles';

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantes: [],
      key: this.props.match.params.id,
      nombre: '',
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
                if (snapshot.val().Type == ROLES.ADMIN) {
                  this.setState({
                    visible: 1,
                  });
                } else if (snapshot.val().Type == ROLES.CLIENT || snapshot.val().Type == ROLES.RESTAURANT ) {
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
    if (this.state.visible == 0) {
      return (
          <Container text>
          </Container>
      );
    } else if (this.state.visible == 1) {
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
    } else if (this.state.visible == 3) {
      return <Redirect to={{ pathname: '/register' }} />;
    } else {
      return <Redirect to={{ pathname: '/' }} />;
    }
  }

}

export default Restaurant;
