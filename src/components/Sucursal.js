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
            </tr>
          </thead>
          <tbody>
          {cupones.map(cupon =>
            <tr key={cupon.ID}>
              <td>{cupon.Promo}</td>
              <td>{cupon.Cantidad}</td>
            </tr>
          )}
          </tbody>
        </table>


      </div>
    );
  }
}
/*
<div className="card float-left" key={cupon.ID}>
  {cupon.Promo}
</div>)}*/

export default Show;
