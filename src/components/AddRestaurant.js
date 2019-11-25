import React, { Component } from 'react';
import firebase from 'firebase';
import { Container, Form } from 'semantic-ui-react';

class AddRestaurant extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase
      .database()
      .ref()
      .child('/Restaurantes/');

    this.state = {
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
    var newChildRef = this.ref.push();
    this.ref
      .child(newChildRef.key)
      .update({
        ID: newChildRef.key,
        Nombre: this.state.Nombre,
      })
      .then(() => {
        this.setState({
          Nombre: '',
        });
        this.props.history.push('/restaurant');
      })
      .catch(error => {
        console.error('Error adding restaurant', error);
      });
  };

  render() {
    const { Nombre } = this.state;
    return (
      <Container text>
        <Form onSubmit={this.onSubmit}>
          <Form.TextArea
            name="Nombre"
            label="Nombre:"
            onChange={this.onChange}
            placeholder="Nombre"
            cols="40"
            rows="2"
            value={Nombre}
          />
          <Form.Button type="submit">Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default AddRestaurant;
