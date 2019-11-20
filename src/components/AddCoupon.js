import React, { Component } from 'react';
import firebase from 'firebase';
import { Container, Form } from 'semantic-ui-react';

class AddCoupon extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase
      .database()
      .ref()
      .child(
        '/Restaurantes/' +
          this.props.match.params.res +
          '/Sucursales/' +
          this.props.match.params.id +
          '/Cupones/'
      );

    this.state = {
      Cantidad: '',
      Promo: '',
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
    const path =
      '/sucursal/' +
      this.props.match.params.res +
      '/' +
      this.props.match.params.id +
      '/';
    const { Cantidad, Promo } = this.state;
    var newChildRef = this.ref.push({ Cantidad });
    this.ref
      .child(newChildRef.key)
      .update({
        ID: newChildRef.key,
        Promo,
      })
      .then(() => {
        this.setState({
          Cantidad: '',
          Promo: '',
        });
        this.props.history.push(path);
      })
      .catch(error => {
        console.error('Error adding coupont', error);
      });
  };

  render() {
    const { Cantidad, Promo } = this.state;
    return (
      <Container text>
        <Form onSubmit={this.onSubmit}>
          <Form.TextArea
            name="Promo"
            label="Promoción:"
            onChange={this.onChange}
            placeholder="Promo"
            cols="40"
            rows="2"
            value={Promo}
          />
          <Form.Input
            type="number"
            name="Cantidad"
            label="Cantidad:"
            onChange={this.onChange}
            placeholder="Cantidad"
            value={Cantidad}
          />
          <Form.Button type="submit">Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default AddCoupon;
