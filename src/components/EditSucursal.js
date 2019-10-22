import React, { Component } from 'react';
import firebase from 'firebase';

class EditSucursal extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase
      .database()
      .ref()
      .child(
        '/Restaurantes/' +
          this.props.match.params.res +
          '/Sucursales/' +
          this.props.match.params.suc
      );
    this.state = {
      Nombre: '',
      Latitud: '',
      Longitud: '',
    };
  }

  componentDidMount() {
    const ref1 = firebase
      .database()
      .ref()
      .child(
        '/Restaurantes/' +
          this.props.match.params.res +
          '/Sucursales/' +
          this.props.match.params.suc +
          '/Nombre/'
      );
    ref1.on('value', snapshot => {
      this.setState({
        Nombre: snapshot.val(),
      });
    });

    const ref = firebase
      .database()
      .ref()
      .child(
        '/Restaurantes/' +
          this.props.match.params.res +
          '/Sucursales/' +
          this.props.match.params.suc +
          '/Latitud/'
      );
    ref.on('value', snapshot => {
      this.setState({
        Latitud: snapshot.val(),
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
          '/Longitud/'
      );
    ref2.on('value', snapshot => {
      this.setState({
        Longitud: snapshot.val(),
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
    const path = '/show/' + this.props.match.params.res + '/';
    this.ref
      .update({
        Nombre: this.state.Nombre,
        Latitud: this.state.Latitud,
        Longitud: this.state.Longitud,
      })
      .then(couponRef => {
        this.props.history.push(path);
      })
      .catch(error => {
        console.error('Error adding coupont', error);
      });
  };

  render() {
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
          <div className="form-group">
            <label htmlFor="Latitud">Latitud:</label>
            <input
              type="number"
              className="form-control"
              name="Latitud"
              onChange={this.onChange}
              value={this.state.Latitud}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Longitud">Longitud:</label>
            <input
              type="number"
              className="form-control"
              name="Longitud"
              onChange={this.onChange}
              value={this.state.Longitud}
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

export default EditSucursal;
