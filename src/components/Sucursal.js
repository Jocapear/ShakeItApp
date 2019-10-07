import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import Header from './Header.js'

class Show extends Component{
  constructor(props){
    super(props);
    this.state = {
      cupones: [],
      restaurante: '',
      sucursal: ''
    };
  }

  componentDidMount(){
    const restRef = firebase.database().ref().child('/Restaurantes/' + this.props.match.params.res + '/Nombre/');
    restRef.on('value', snapshot => {
      this.setState({
        restaurante: snapshot.val()
      });
    });

    const sucRef = firebase.database().ref().child('/Restaurantes/' + this.props.match.params.res + '/Sucursales/' + this.props.match.params.id + '/Nombre/');
    sucRef.on('value', snapshot => {
      this.setState({
        sucursal: snapshot.val()
      });
    });

    const ref = firebase.database().ref().child('/Restaurantes/' + this.props.match.params.res + '/Sucursales/' + this.props.match.params.id + '/Cupones/');
    ref.on('value', snapshot => {
      var newState = [];
      snapshot.forEach(function(child) {
        newState.push(child.val());
      });
      console.log(newState);
      this.setState({
        cupones: newState
      });
    });

  }

  delete(id){
    firebase.database().ref().child('/Restaurantes/' + this.props.match.params.res + '/Sucursales/' + this.props.match.params.id + '/Cupones/' + id).remove().then(() => {
      console.log("Coupon successfully deleted!");
      //this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing coupon: ", error);
    });
  }

  render(){
    const {cupones} = this.state;
    return(

      <div className='App-header'>
        <h1>{this.state.restaurante}</h1>
        <h2>{this.state.sucursal}</h2>
        <h2>Cupones:</h2>
        <table>
          <thead>
            <tr>
              <th> Cupón </th>
              <th> Cantidad </th>
              <th> Delete </th>
            </tr>
          </thead>
          <tbody>
          {cupones.map(cupon =>

              <tr key={cupon.ID}>
                <td>{cupon.Promo}</td>
                <td>{cupon.Cantidad}</td>
                <td> <button onClick={this.delete.bind(this, cupon.ID)} class="btn btn-danger">Delete</button> </td>
              </tr>

          )}
          </tbody>
        </table>


      </div>
    );
  }
}

export default Show;
