import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from '../../firebaseConfig.js';

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp({ firebaseConfig });
    }

    this.auth = app.auth();
    this.db = app.database();
    /*
    restaurante = uid => this.db.ref(`restaurantes/${uid}`);

    restaurantes = () => this.db.ref('restaurantes');*/
  }

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  user = uid => this.db.ref(`Users/${uid}`);
}

export default Firebase;
