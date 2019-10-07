import React, {Component} from 'react';
import firebase from 'firebase';
//import config from '../firebaseConfig';

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
      console.log(newState);
      snapshot.forEach(function(child) {
        // var item = child.val();
        // item.key = child.key;
        newState.push(child.val());
      });
      console.log(newState);
      this.setState({
        restaurantes: newState
      });
    });

  }

  render(){
   console.log(this.state);
    const {restaurantes} = this.state;
    return(
      <div className = 'App-header'>
        <section id="restaurantes">
        <div>
          <h1>Restaurantes</h1>
          <h3>{restaurantes.map(restaurante =>
              <div className="card float-left" key={restaurante.ID}>
                {restaurante.Nombre}
              </div>)}</h3>
        </div>
        </section>
      </div>
    );
  }

}

export default restaurant;
