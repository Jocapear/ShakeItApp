import React, { Component } from 'react';
import firebase from 'firebase';

class EditCoupon extends Component{
  constructor (props){
    super(props);
    this.state = {
      Cantidad: '',
      Promo: ''
    }
  }

  componentDidMount(){
    const ref = firebase.database().ref().child('/Restaurantes/' + this.props.match.params.res + '/Sucursales/' + this.props.match.params.suc + '/Cupones/');

  }

  onChange = (e) =>  {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    this.ref.update({
      Cantidad: this.state.Cantidad,
      Promo: this.ref.Promo
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const path = '/sucursal/' + this.props.match.params.res + '/' + this.props.match.params.id + '/';
    const { Cantidad, Promo} = this.state;
    var newChildRef = this.ref.push({Cantidad: Cantidad});
    this.ref.child(newChildRef.key).update({
      ID: newChildRef.key,
      Promo: Promo
    }).then((couponRef) => {
      this.setState({
        Cantidad: '',
        Promo: ''
      });
      this.props.history.push(path);
    })
    .catch((error) => {
      console.error("Error adding coupont", error);
    });

  }

  render(){
    const {Cantidad, Promo} = this.state;
    console.log(this.ref.child(this.props.match.params.id).Cantidad);

    return(
      <div className="App-header">
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
             <label htmlFor="Promo">Promoción:</label>
             <textarea className="form-control" name="Promo" onChange={this.onChange} placeholder="Promo" cols="40" rows="2" value={this.state.Promo} />
           </div>
           <div className="form-group">
             <label htmlFor="Cantidad">Cantidad:</label>
             <input type="number" className="form-control" name="Cantidad" onChange={this.onChange} defaultValue={Cantidad} />
           </div>
           <button type="submit" className="btn-success">Submit</button>
        </form>
      </div>
    )
  }
}

export default EditCoupon;
