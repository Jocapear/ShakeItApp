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

  delete(id){
    firebase.database().ref().child('/Restaurantes/' + this.props.match.params.id + '/Sucursales/' + id).remove().then(() => {
      console.log("Sucursal borrada!");
      //this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing coupon: ", error);
    });
  }



  render(){
    this.delete = this.delete.bind(this);
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
              <table>
                <thead>
                  <tr>
                    <th> Sucursal </th>
                    <th> Borrar </th>
                    <th> Editar </th>
                  </tr>
                </thead>
                <tbody>
                    {sucursales.map(sucursal =>
                      <tr key={sucursal.ID}>
                      <td> <Link to={`/sucursal/${this.state.key}/${sucursal.ID}`}>{sucursal.Nombre}</Link> </td>
                      <td> <button onClick= {() => {if(window.confirm('¿Quiéres borrar esta sucursal?')){this.delete(sucursal.ID)};}} className="btn" >Borrar</button> </td>

                      </tr>
                    )}
              </tbody>
              </table>
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
