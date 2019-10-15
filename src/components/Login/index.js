import React from 'react';
import firebase from 'firebase';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import useLoginState from './loginState';

const Login = ({ history }) => {
  const [state, actions] = useLoginState();
  const Auth = useAuth();

  if (Auth.isLoadingAuth) {
    return <p>Loading...</p>;
  }

  if (Auth.isLoggedIn) {
    return <Redirect to={{ pathname: '/shake' }} />;
  }

  const login = e => {
    e.preventDefault();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(state.email, state.password)
          .then(res => {
            if (res.user) {
              Auth.setLoggedIn(true);
              Auth.setUser(res.user);
            }
            history.push('/shake');
          })
          .catch(({ message }) => {
            actions.setError(message);
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
          .catch(({ message }) => {
            actions.setError(message);
          });
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login</h1>
        <form onSubmit={e => login(e)}>
          <input
            name="email"
            type="email"
            placeholder="email"
            value={state.email}
            onChange={({ target }) => {
              actions.setEmail(target.value);
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            value={state.password}
            onChange={({ target }) => {
              actions.setPassword(target.value);
            }}
          />
          <hr />
          <button
            onClick={signInWithGoogle}
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
          <span>{state.error}</span>
        </form>
      </header>
    </div>
  );
};

export default withRouter(Login);
