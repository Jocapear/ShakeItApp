import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';

class Register extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase
      .database()
      .ref()
      .child('/Users/');
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      Type: '',
    };
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
      .child(firebase.auth().currentUser.uid)
      .update({
        ID: firebase.auth().currentUser.uid,
        Type: this.state.Type,
      })
      .then(couponRef => {
        this.setState({
          Type: '',
        });
        this.props.history.push('/shake');
      })
      .catch(error => {
        console.error('Error adding user', error);
      });
  };

  render() {
    const { Type } = this.state.Type;
    return (
      <div className="App-header">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="Nombre">Nombre:</label>
            <input
              list="types"
              name="Type"
              onChange={this.onChange}
              placeholder="Type"
              defaultValue={Type}
            />
            <datalist id="types">
              <option value="Restaurante" />
              <option value="Cliente" />
            </datalist>
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
