import React, { Component } from 'react';
import firebase from 'firebase';

class EditRestaurante extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase
      .database()
      .ref()
      .child('/Restaurantes/' + this.props.match.params.res);
    this.state = {
      Nombre: '',
    };
  }

  componentDidMount() {
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
  }
}

export default EditRestaurante;
