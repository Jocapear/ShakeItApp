import React, { Component } from 'react';
import firebase from 'firebase';
import { Container, Form } from 'semantic-ui-react';

class AddSucursal extends Component {
  constructor(props) {
    super(props);

    this.ref = firebase
      .database()
      .ref()
      .child('/Restaurantes/' + this.props.match.params.res + '/Sucursales/');

    this.state = {
      Latitud: '',
      Longitud: '',
      Nombre: '',
    };
  }

  onChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const path = '/show/' + this.props.match.params.res + '/';
    const { Latitud, Longitud, Nombre } = this.state;
    const newChildRef = this.ref.push({ Nombre: Nombre });

    this.ref
      .child(newChildRef.key)
      .update({
        ID: newChildRef.key,
        Latitud: Number(Latitud),
        Longitud: Number(Longitud),
      })
      .then(() => {
        this.props.history.push(path);
      })
      .catch(error => {
        console.error('Error adding sucursal', error);
      });
  };

  render() {
    const { Nombre, Latitud, Longitud } = this.state;
    return (
      <Container text>
        <Form onSubmit={this.onSubmit}>
          <Form.Group widths="equal">
            <Form.TextArea
              label="Nombre:"
              name="Nombre"
              onChange={this.onChange}
              placeholder="Nombre"
              cols="40"
              rows="2"
              fluid
              required
              value={Nombre}
            />
          </Form.Group>
          <Form.Group widths="2">
            <Form.Input
              type="number"
              label="Latitud"
              step="any"
              name="Latitud"
              onChange={this.onChange}
              placeholder="Latitud"
              required
              value={Latitud}
            />
            <Form.Input
              type="number"
              label="Latitud"
              step="any"
              name="Longitud"
              onChange={this.onChange}
              placeholder="Longitud"
              required
              value={Longitud}
            />
          </Form.Group>
          <Form.Button type="submit">Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default AddSucursal;
