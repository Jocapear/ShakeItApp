import React, { Component } from 'react';
import firebase from 'firebase';

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
    };
  }

  componentDidMount() {
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
            <label htmlFor="Promo">Promoción:</label>
            <textarea
              className="form-control"
              name="Promo"
              onChange={this.onChange}
              placeholder="Promo"
              cols="40"
              rows="2"
              value={this.state.Promo}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Cantidad">Cantidad:</label>
            <input
              type="number"
              className="form-control"
              name="Cantidad"
              onChange={this.onChange}
              defaultValue={this.state.Cantidad}
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

export default EditCoupon;
