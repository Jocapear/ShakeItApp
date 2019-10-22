import React, { Component } from 'react';
import firebase from 'firebase';

class AddSucursal extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase
      .database()
      .ref()
      .child('/Restaurantes/' + this.props.match.params.res + '/Sucursales/');
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      Latitud: '',
      Longitud: '',
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
    const path = '/show/' + this.props.match.params.res + '/';
    const { Latitud, Longitud, Nombre } = this.state;
    var newChildRef = this.ref.push({ Nombre: Nombre });
    this.ref
      .child(newChildRef.key)
      .update({
        ID: newChildRef.key,
        Latitud: Latitud,
        Longitud: Longitud,
      })
      .then(couponRef => {
        this.setState({
          Latitud: '',
          Longitud: '',
          Nombre: '',
        });
        this.props.history.push(path);
      })
      .catch(error => {
        console.error('Error adding sucursal', error);
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
          <div className="form-group">
            <label htmlFor="Latitud">Latitud:</label>
            <input
              type="number"
              step="any"
              className="form-control"
              name="Latitud"
              onChange={this.onChange}
              placeholder="Latitud"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Longitud">Longitud:</label>
            <input
              type="number"
              step="any"
              className="form-control"
              name="Longitud"
              onChange={this.onChange}
              placeholder="Longitud"
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

export default AddSucursal;
