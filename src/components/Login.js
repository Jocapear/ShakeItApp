import React, { useState } from 'react';
import firebase from 'firebase';
import { withRouter, Link, Redirect } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../AuthContext';

const Login = () => {
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
          .signInWithEmailAndPassword(email, password)
          .then(res => {
            if (res.user) {
              Auth.setLoggedIn(true);
              Auth.setUser(res.user);
            }
            history.push('/shake');
          })
          .catch(e => {
            setErrors(e.message);
          });
      });
  };

  const signInWithGoogle = () => {
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
        <h1>Login</h1>
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
            onClick={() => signInWithGoogle()}
            className="googleBtn"
            type="button"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="logo"
            />
            Login With Google
          </button>
          <button type="submit">Login</button>
          <p>Don't have an account?</p>
          <Link to="/">Join here.</Link>
          <span>{error}</span>
        </form>
      </header>
    </div>
  );
};

export default withRouter(Login);
