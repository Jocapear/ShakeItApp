import React, { Component } from 'react';
import firebase from 'firebase';
import { Container, Form } from 'semantic-ui-react';

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
      .then(() => {
        this.props.history.push(path);
      })
      .catch(error => {
        console.error('Error adding coupont', error);
      });
  };

  render() {
    const { Nombre, Latitud, Longitud } = this.state;
    return (
      <Container text>
        <Form onSubmit={this.onSubmit}>
          <Form.Input
            type="text"
            name="Nombre"
            label="Nombre:"
            onChange={this.onChange}
            placeholder="Nombre"
            value={Nombre}
          />
          <Form.Input
            type="number"
            name="Latitud"
            label="Latitud:"
            onChange={this.onChange}
            value={Latitud}
          />
          <Form.Input
            type="number"
            name="Longitud"
            label="Longitud:"
            onChange={this.onChange}
            value={Longitud}
          />
          <Form.Button type="submit">Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default EditSucursal;
