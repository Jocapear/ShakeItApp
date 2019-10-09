import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from '../../firebaseConfig.js';

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp({ firebaseConfig });
    }

    this.db = app.database();
    /*
    restaurante = uid => this.db.ref(`restaurantes/${uid}`);

    restaurantes = () => this.db.ref('restaurantes');*/
  }
}

export default Firebase;
