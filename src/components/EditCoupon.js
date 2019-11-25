import React, { Component } from 'react';
import firebase from 'firebase';
import { Container, Form } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import * as ROLES from '../constants/roles';

class EditCoupon extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase
      .database()
      .ref()
      .child(
        '/Restaurantes/' +
          this.props.match.params.res +
          '/Sucursales/' +
          this.props.match.params.suc +
          '/Cupones/' +
          this.props.match.params.id
      );
    this.state = {
      Cantidad: '',
      Promo: '',
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
    const ref = firebase
      .database()
      .ref()
      .child(
        '/Restaurantes/' +
          this.props.match.params.res +
          '/Sucursales/' +
          this.props.match.params.suc +
          '/Cupones/' +
          this.props.match.params.id +
          '/Cantidad/'
      );
    ref.on('value', snapshot => {
      this.setState({
        Cantidad: snapshot.val(),
      });
    });

    const ref2 = firebase
      .database()
      .ref()
      .child(
        '/Restaurantes/' +
          this.props.match.params.res +
          '/Sucursales/' +
          this.props.match.params.suc +
          '/Cupones/' +
          this.props.match.params.id +
          '/Promo/'
      );
    ref2.on('value', snapshot => {
      this.setState({
        Promo: snapshot.val(),
      });
    });
  }

  onChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const path =
      '/sucursal/' +
      this.props.match.params.res +
      '/' +
      this.props.match.params.suc +
      '/';
    this.ref
      .update({
        Cantidad: this.state.Cantidad,
        Promo: this.state.Promo,
      })
      .then(() => {
        this.props.history.push(path);
      })
      .catch(error => {
        console.error('Error adding coupont', error);
      });
  };

  render() {
    if (this.state.visible == 0) {
      return (
          <Container text>
          </Container>
      );
    } else if (this.state.visible == 1) {
      return (
        <Container text>
          <Form onSubmit={this.onSubmit}>
            <Form.TextArea
              name="Promo"
              onChange={this.onChange}
              placeholder="Promo"
              label="Promoción:"
              cols="40"
              rows="2"
              value={this.state.Promo}
            />
            <Form.Input
              type="number"
              name="Cantidad"
              label="Cantidad:"
              onChange={this.onChange}
              value={this.state.Cantidad}
            />
            <Form.Button type="submit">Submit</Form.Button>
          </Form>
        </Container>
      );
    } else if (this.state.visible == 3) {
      return <Redirect to={{ pathname: '/register' }} />;
    } else {
      return <Redirect to={{ pathname: '/' }} />;
    }
  }
}

export default EditCoupon;
