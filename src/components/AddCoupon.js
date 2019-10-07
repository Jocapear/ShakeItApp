import React, { Component } from 'react';
import firebase from 'firebase';

class AddCoupon extends Component{
  constructor (props){
    super(props);
    this.ref = firebase.database().ref().child('/Restaurantes/' + this.props.match.params.res + '/Sucursales/' + this.props.match.params.id + '/Cupones/');
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      Cantidad: '',
      ID: Date.now(),
      Promo: ''

    }
  }

  onChange = (e) =>  {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { Cantidad, ID, Promo} = this.state;
    var newChildRef = this.ref.push({Cantidad: Cantidad});
    this.ref.child(newChildRef.key).update({
      ID: newChildRef.key,
      Promo: Promo
    }).then((couponRef) => {
      this.setState({
        Cantidad: '',
        ID: '',
        Promo: ''
      });
    /*this.ref.push({
      Cantidad,
      this.ref.name(),
      Promo
    }).then((couponRef) => {
      this.setState({
        Cantidad: '',
        ID: '',
        Promo: ''
      });*/
      this.props.history.push("/restaurant/");
    })
    .catch((error) => {
      console.error("Error adding coupont", error);
    });

  }

  render(){
    const {Promo} = this.state.Promo;
    return(
      <div className="App-header">
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
             <label htmlFor="Promo">Promoción:</label>
             <textarea className="form-control" name="Promo" onChange={this.onChange} placeholder="Promo" cols="40" rows="2" defaultValue={Promo} />
           </div>
           <div className="form-group">
             <label htmlFor="Cantidad">Cantidad:</label>
             <input type="number" className="form-control" name="Cantidad" onChange={this.onChange} placeholder="Cantidad" />
           </div>
           <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    )
  }
}

export default AddCoupon;
