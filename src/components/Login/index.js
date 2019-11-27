import React from 'react';
import firebase from 'firebase';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import useLoginState from './loginState';

import {
  Loader,
  Container,
  Header,
  Form,
  Icon,
  Divider,
} from 'semantic-ui-react';
//import { getConsoleOutput } from '@jest/console';

const Login = ({ history }) => {
  const [state, actions] = useLoginState();
  const Auth = useAuth();

  if (Auth.isLoadingAuth) {
    return <Loader size="massive" />;
  }

  if (Auth.isLoggedIn) {
    return <Redirect to={{ pathname: '/shake' }} />;
  }

  const login = async e => {
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
            Auth.setLoggedIn(true);
            Auth.setUser(res.user);
            history.push('/shake');
          })
          .catch(({ message }) => {
            actions.setError(message);
          });
      });
  };

  return (
    <Container text>
      <Header>Login</Header>
      <Form onSubmit={e => login(e)}>
        <Form.Input
          label="Email"
          type="email"
          placeholder="email"
          required
          fluid
          value={state.email}
          onChange={({ target }) => {
            actions.setEmail(target.value);
          }}
        />
        <Form.Input
          label="Password"
          type="password"
          placeholder="password"
          required
          fluid
          value={state.password}
          onChange={({ target }) => {
            actions.setPassword(target.value);
          }}
        />
        <Form.Button type="submit">Login</Form.Button>
        <span stype={{ color: 'red' }}>{state.error}</span>
        <Divider hidden />
        <Form.Button color="blue" onClick={signInWithGoogle}>
          <Icon name="google" />
          Login With Google
        </Form.Button>
        <Divider horizontal>Or</Divider>
        <p>
          <strong>Don't have an account?</strong>
        </p>
        <Link to="/join">Join here.</Link>
      </Form>
    </Container>
  );
};

export default withRouter(Login);
