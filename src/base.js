import Rebase from 're-base';
import firebase from 'firegase';
import firebaseConfig from './firebaseConfig';

const app = firebase.initializeApp(firebaseConfig)
const base = Rebase.createClass(app.database())

export {base}
