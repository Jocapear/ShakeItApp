import React, { useState } from 'react';
import { object } from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../App.css';

const Join = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState('');
  const Auth = useAuth();

  if (Auth.isLoadingAuth) {
    return <p>Loading...</p>;
  }

  if (Auth.isLoggedIn) {
    return <Redirect to={{ pathname: '/shake' }} />;
  }

  const handleForm = e => {
    e.preventDefault();

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(res => {
            console.log(res);
            history.push('/shake');
            if (res.user) {
              Auth.setLoggedIn(true);
              Auth.setUser(res.user);
            }
          })
          .catch(e => {
            setErrors(e.message);
          });
      });
  };

  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(res => {
            history.push('/shake');
            Auth.setLoggedIn(true);
            Auth.setUser(res.user);
          })
          .catch(e => setErrors(e.message));
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Join</h1>
        <form onSubmit={e => handleForm(e)}>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="email"
          />
          <input
            onChange={e => setPassword(e.target.value)}
            name="password"
            value={password}
            type="password"
            placeholder="password"
          />
          <hr />
          <button
            onClick={() => handleGoogleLogin()}
            className="googleBtn"
            type="button"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="logo"
            />
            Join With Google
          </button>

          <button type="submit">Sign up</button>
          <p>Already have an account?</p>
          <Link to="/">Log in here.</Link>

          <span>{error}</span>
        </form>
      </header>
    </div>
  );
};

Join.propTypes = {
  history: object,
};

export default withRouter(Join);
