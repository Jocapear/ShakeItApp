import React, { Component } from 'react';
import firebase from 'firebase';
import { Container, Form } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import * as ROLES from '../constants/roles';

class EditRestaurante extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase
      .database()
      .ref()
      .child('/Restaurantes/' + this.props.match.params.res);
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
    const ref1 = firebase
      .database()
      .ref()
      .child('/Restaurantes/' + this.props.match.params.res + '/Nombre/');
    ref1.on('value', snapshot => {
      this.setState({
        Nombre: snapshot.val(),
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
    this.ref
      .update({
        Nombre: this.state.Nombre,
      })
      .then(couponRef => {
        this.props.history.push('/restaurant');
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
        <div className="App-header">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="Nombre">Nombre:</label>
              <input
                type="text"
                className="form-control"
                name="Nombre"
                onChange={this.onChange}
                placeholder="Nombre"
                value={this.state.Nombre}
              />
            </div>
            <button type="submit" className="btn-success">
              Submit
            </button>
          </form>
        </div>
      );
    } else if (this.state.visible == 3) {
      return <Redirect to={{ pathname: '/register' }} />;
    } else {
      return <Redirect to={{ pathname: '/' }} />;
    }
  }
}

export default EditRestaurante;
