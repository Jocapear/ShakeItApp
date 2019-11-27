import React from 'react';
import './App.css';
import CouponFetcher from './components/CouponFetcher';

const uploadMetadada = async crd => {
  let authUser = JSON.parse(localStorage.getItem('authUser'));
  console.log(authUser)
  if (authUser && authUser.pod != null){
    console.log("POD FOUND!");
    console.log(authUser.pod);
    const podURL = JSON.parse(localStorage.getItem('authUser')).pod;
    const $rdf = require('rdflib');
    const last_latitude = crd.latitude;
    const last_longitude = crd.longitude;
    const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);
    await fetcher.load(podURL);
    const me = store.sym(podURL);
    console.log("UPDATING VALUES");
    const updater = new $rdf.UpdateManager(store);
    const updatePromise = new Promise((resolve) => {
      const deletions = [];
      const metadata = [last_latitude, last_longitude];
      const additions = metadata.map(data => $rdf.st(me, FOAF('metadata'), new $rdf.Literal(data), me.doc()));
      //const additions = [$rdf.st(me, FOAF('last_latitude'), new $rdf.Literal(last_latitude), me.doc()),$rdf.st(me, FOAF('last_longitude'), new $rdf.Literal(last_longitude), me.doc())];
      updater.update(deletions, additions, resolve);
    });
    await updatePromise;
    console.log("FINISHED");
  }else{
    console.log("POD NOT FOUND");
  }
}

const geoError = function(error) {
  console.log(error.code);
};
const geoSuccess = function(pos) {
  const crd = pos.coords;
  uploadMetadada(crd)
};

function App() {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  return (
    <div className="App">
      <CouponFetcher />
      <br></br>
    </div>
  );
}

export default App;
