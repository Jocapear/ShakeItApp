import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class Show extends Component{
  constructor(props){
    super(props);
    this.state = {
      sucursales: [],
      key: this.props.match.params.id,
      nombre: ''
    };
  }

  componentDidMount(){
    const restRef = firebase.database().ref().child('/Restaurantes/' + this.props.match.params.id + '/Nombre/');
    restRef.on('value', snapshot => {
      this.setState({
        nombre: snapshot.val()
      });
    });

    const ref = firebase.database().ref().child('/Restaurantes/' + this.props.match.params.id + '/Sucursales/');
    ref.on('value', snapshot => {
      var newState = [];
      snapshot.forEach(function(child) {
        newState.push(child.val());
      });
      this.setState({
        sucursales: newState
      });
    });

  }



  render(){
    const {sucursales} = this.state;
    return(
      <div>
        <div className='Back-link'>
          <Link to= "/restaurant">Regresar</Link>
          <div className='App-header'>
            <section id="sucursales">
            <div>
              <h1>{this.state.nombre}</h1>
              <h2>Sucursales:</h2>
              {sucursales.map(sucursal =>
                <div className="card float-left" key={sucursal.ID}>
                <Link to={`/sucursal/${this.state.key}/${sucursal.ID}`}>{sucursal.Nombre}</Link>
                </div>
              )}
              </div>
            </section>
            <p></p>
          <Link to={`/add/${this.state.key}`}>Crear Sucursal</Link>
        </div>
        </div>
      </div>

    );
  }
}

export default Show;
