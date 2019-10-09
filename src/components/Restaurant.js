import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Container, Header, Table, Button } from 'semantic-ui-react';

class Restaurant extends Component {
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
      let newState = [];
      snapshot.forEach(child => {
        newState.push(child.val());
      });
      this.setState({
        restaurantes: newState,
      });
    });
  }

  delete = id => {
    firebase
      .database()
      .ref()
      .child('/Restaurantes/' + id)
      .remove()
      .then(() => {
        console.log('Restaurante borrado!');
      })
      .catch(error => {
        console.error('Error removing coupon: ', error);
      });
  };

  render() {
    const { restaurantes } = this.state;
    return (
      <Container>
        <section>
          <div>
            <Header size="huge">Restaurantes</Header>
            <Table collapsing celled basic="very" size="large">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Restaurant</Table.HeaderCell>
                  <Table.HeaderCell>Borrar</Table.HeaderCell>
                  <Table.HeaderCell>Editar</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {restaurantes.map(restaurante => (
                  <Table.Row key={restaurante.ID}>
                    <Table.Cell key={`link-${restaurante.ID}`}>
                      <Link to={`/show/${restaurante.ID}`}>
                        {restaurante.Nombre}
                      </Link>
                    </Table.Cell>
                    <Table.Cell key={`delete-${restaurante.ID}`}>
                      <Button
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
                      </Button>
                    </Table.Cell>
                    <Table.Cell key={`delete-${restaurante.ID}`}>
                      <Button
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
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </section>
        <p></p>
        <Link to="/add">Crear restaurante</Link>
      </Container>
    );
  }
}

export default Restaurant;
