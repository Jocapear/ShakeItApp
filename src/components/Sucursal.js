import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cupones: [],
      restaurante: '',
      sucursal: '',
    };
  }

  componentDidMount() {
    const restRef = firebase
      .database()
      .ref()
      .child('/Restaurantes/' + this.props.match.params.res + '/Nombre/');
    restRef.on('value', snapshot => {
      this.setState({
        restaurante: snapshot.val(),
      });
    });

    const sucRef = firebase
      .database()
      .ref()
      .child(
        '/Restaurantes/' +
          this.props.match.params.res +
          '/Sucursales/' +
          this.props.match.params.id +
          '/Nombre/'
      );
    sucRef.on('value', snapshot => {
      this.setState({
        sucursal: snapshot.val(),
      });
    });

    const ref = firebase
      .database()
      .ref()
      .child(
        '/Restaurantes/' +
          this.props.match.params.res +
          '/Sucursales/' +
          this.props.match.params.id +
          '/Cupones/'
      );
    ref.on('value', snapshot => {
      var newState = [];
      snapshot.forEach(function(child) {
        newState.push(child.val());
      });
      this.setState({
        cupones: newState,
      });
    });
  }

  delete(id) {
    firebase
      .database()
      .ref()
      .child(
        '/Restaurantes/' +
          this.props.match.params.res +
          '/Sucursales/' +
          this.props.match.params.id +
          '/Cupones/' +
          id
      )
      .remove()
      .then(() => {
        console.log('Coupon successfully deleted!');
        //this.props.history.push("/")
      })
      .catch(error => {
        console.error('Error removing coupon: ', error);
      });
  }

  use(id, cantidad) {
    const ref = firebase
      .database()
      .ref()
      .child(
        '/Restaurantes/' +
          this.props.match.params.res +
          '/Sucursales/' +
          this.props.match.params.id +
          '/Cupones/' +
          id
      );
    ref
      .update({
        Cantidad: cantidad - 1,
      })
      .then(() => {
        console.log('Coupon successfully used!');
      })
      .catch(error => {
        console.error('Error removing coupon: ', error);
      });
  }

  render() {
    this.delete = this.delete.bind(this);
    const { cupones } = this.state;
    return (
      <div className="Back-link">
        <Link to={`/show/${this.props.match.params.res}`}>Regresar</Link>
        <div className="App-header">
          <h1>{this.state.restaurante}</h1>
          <h2>{this.state.sucursal}</h2>
          <h2>Cupones:</h2>
          <Link
            to={`/add/${this.props.match.params.res}/${this.props.match.params.id}`}
          >
            Crear Cupón
          </Link>
          <table>
            <thead>
              <tr>
                <th> Cupón </th>
                <th> Cantidad </th>
                <th> Usar </th>
                <th> Borrar </th>
                <th> Editar </th>
              </tr>
            </thead>
            <tbody>
              {cupones.map(cupon => (
                <tr key={cupon.ID}>
                  <td>{cupon.Promo}</td>
                  <td>{cupon.Cantidad}</td>
                  <td>
                    {' '}
                    <button
                      onClick={this.use.bind(this, cupon.ID, cupon.Cantidad)}
                      className="btn"
                    >
                      Usar
                    </button>{' '}
                  </td>
                  <td>
                    {' '}
                    <button
                      onClick={() => {
                        if (window.confirm('¿Quiéres borrar esta sucursal?')) {
                          this.delete(cupon.ID);
                        }
                      }}
                      className="btn"
                    >
                      Borrar
                    </button>{' '}
                  </td>
                  <td>
                    {' '}
                    <Link
                      to={`/edit/${this.props.match.params.res}/${this.props.match.params.id}/${cupon.ID}`}
                    >
                      {' '}
                      Editar{' '}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Show;
