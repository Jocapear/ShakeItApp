import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantes: [],
    };
  }

  componentDidMount() {
    const restRef = firebase
      .database()
      .ref()
      .child('/Restaurantes/');
    restRef.on('value', snapshot => {
      var newState = [];
      snapshot.forEach(function(child) {
        newState.push(child.val());
      });
      this.setState({
        restaurantes: newState,
      });
    });
  }

  delete(id) {
    firebase
      .database()
      .ref()
      .child('/Restaurantes/' + id)
      .remove()
      .then(() => {
        console.log('Restaurante borrado!');
        //this.props.history.push("/")
      })
      .catch(error => {
        console.error('Error removing coupon: ', error);
      });
  }

  render() {
    this.delete = this.delete.bind(this);
    const { restaurantes } = this.state;
    return (
      <div>
        <div className="Back-link">
          <Link to="/shake">Regresar</Link>
          <div className="App-header">
            <section id="restaurantes">
              <div>
                <h1>Restaurantes</h1>
                <table>
                  <thead>
                    <tr>
                      <th> Restaurant </th>
                      <th> Borrar </th>
                      <th> Editar </th>
                    </tr>
                  </thead>
                  <tbody>
                    {restaurantes.map(restaurante => (
                      <tr key={restaurante.ID}>
                        <td>
                          <Link to={`/show/${restaurante.ID}`}>
                            {' '}
                            {restaurante.Nombre}
                          </Link>
                        </td>
                        <td>
                          {' '}
                          <button
                            onClick={() => {
                              if (
                                window.confirm('¿Quiéres borrar esta sucursal?')
                              ) {
                                this.delete(restaurante.ID);
                              }
                            }}
                            className="btn"
                          >
                            Borrar
                          </button>{' '}
                        </td>
                        <td>
                          {' '}
                          <Link to={`/edit/${restaurante.ID}`}> Editar </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <p></p>
            <Link to="/add">Crear restaurante</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default restaurant;
