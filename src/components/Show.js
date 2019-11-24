import React, { Component } from 'react';
import firebase from 'firebase';
import { Link, Redirect } from 'react-router-dom';
import { Container, Header, Divider } from 'semantic-ui-react';
import RestaurantTable from './Restaurant/RestaurantTable';
import * as ROLES from '../constants/roles';

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sucursales: [],
      key: this.props.match.params.id,
      nombre: '',
      visible: 0
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
                } else if (snapshot.val().Type == ROLES.CLIENT) {
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
        const { sucursales } = this.state;
        const idx = sucursales.findIndex(succ => succ.ID === id);
        if (idx !== -1) {
          sucursales.splice(idx, 1);
          this.setState({ sucursales });
        }
      })
      .catch(error => {
        console.error('Error removing coupon: ', error);
      });
  };

  render() {
    const { sucursales, key, nombre } = this.state;
    if (this.state.visible == 0) {
      return (
          <Container text>
          </Container>
      );
    } else if (this.state.visible == 1) {
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
    } else if (this.state.visible == 3) {
      return <Redirect to={{ pathname: '/register' }} />;
    } else {
      return <Redirect to={{ pathname: '/' }} />;
    }
  }
}

export default Show;
