import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import { Container, Form } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import * as ROLES from '../constants/roles';

class AddRestaurant extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase
      .database()
      .ref()
      .child('/Restaurantes/');

    this.state = {
      Nombre: '',
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
                } else if (snapshot.val().Type == ROLES.CLIENT || snapshot.val().Type == ROLES.RESTAURANT) {
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
    var newChildRef = this.ref.push();
    this.ref
      .child(newChildRef.key)
      .update({
        ID: newChildRef.key,
        Nombre: this.state.Nombre,
      })
      .then(() => {
        this.setState({
          Nombre: '',
        });
        this.props.history.push('/restaurant');
      })
      .catch(error => {
        console.error('Error adding restaurant', error);
      });
  };

  render() {
    const { Nombre } = this.state;

    if (this.state.visible == 0) {
      return <Container text />;
    } else if (this.state.visible == 1) {
      return (
        <Container text>
          <Form onSubmit={this.onSubmit}>
            <Form.TextArea
              name="Nombre"
              label="Nombre:"
              onChange={this.onChange}
              placeholder="Nombre"
              cols="40"
              rows="2"
              value={Nombre}
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

export default AddRestaurant;
