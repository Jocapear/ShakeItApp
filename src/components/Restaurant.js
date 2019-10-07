import React, {Component} from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class restaurant extends Component {
  constructor(props){
    super(props);
    this.state = {
      restaurantes: []
    };
  }

  componentDidMount(){
    const restRef = firebase.database().ref().child('/Restaurantes/');
    restRef.on('value', snapshot => {
      var newState = [];
      snapshot.forEach(function(child) {
        newState.push(child.val());
      });
      this.setState({
        restaurantes: newState
      });
    });

  }



  render(){
    const {restaurantes} = this.state;
    return(
      <div className = 'App-header'>
        <section id="restaurantes">
        <div>
          <h1>Restaurantes</h1>
          <h3>{restaurantes.map(restaurante =>
              <div className="card float-left" key={restaurante.ID}>
                <Link to={`/show/${restaurante.ID}`}> {restaurante.Nombre}</Link>
              </div>)}</h3>
        </div>
        </section>
      </div>
    );
  }

}

export default restaurant;
