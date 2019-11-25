import React, { Component } from 'react';
import firebase from 'firebase';
import { Container, Form } from 'semantic-ui-react';

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
      .then(() => {
        this.props.history.push('/restaurant');
      })
      .catch(error => {
        console.error('Error adding coupont', error);
      });
  };

  render() {
    return (
      <Container text>
        <Form onSubmit={this.onSubmit}>
          <Form.Input
            type="text"
            label="Nombre:"
            name="Nombre"
            onChange={this.onChange}
            placeholder="Nombre"
            value={this.state.Nombre}
          />
          <Form.Button type="submit">Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default EditRestaurante;
