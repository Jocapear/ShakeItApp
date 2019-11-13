import React, { Component } from 'react';
import firebase from 'firebase';

class AddRestaurant extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase
      .database()
      .ref()
      .child('/Restaurantes/');
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      Nombre: '',
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
    const { Nombre } = this.state.Nombre;
    return (
      <div className="App-header">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="Nombre">Nombre:</label>
            <textarea
              className="form-control"
              name="Nombre"
              onChange={this.onChange}
              placeholder="Nombre"
              cols="40"
              rows="2"
              defaultValue={Nombre}
            />
          </div>
          <button type="submit" className="btn-success">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddRestaurant;
