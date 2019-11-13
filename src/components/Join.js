import React, { useState } from 'react';
import { object } from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import {
  Loader,
  Container,
  Header,
  Form,
  Icon,
  Divider,
} from 'semantic-ui-react';

const Join = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState('');
  const Auth = useAuth();

  if (Auth.isLoadingAuth) {
    return <Loader size="massive" />;
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
            history.push('/register');
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
            history.push('/register');
            Auth.setLoggedIn(true);
            Auth.setUser(res.user);
          })
          .catch(e => setErrors(e.message));
      });
  };

  return (
    <Container text>
      <Header>Join</Header>
      <Form onSubmit={e => handleForm(e)}>
        <Form.Input
          label="Email"
          type="email"
          placeholder="email"
          required
          fluid
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Form.Input
          label="Password"
          type="password"
          placeholder="password"
          required
          fluid
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Form.Button type="submit">Sign up</Form.Button>
        <span stype={{ color: 'red' }}>{error}</span>

        <Divider hidden />

        <Form.Button onClick={handleGoogleLogin} color="blue">
          <Icon name="google" />
          Join With Google
        </Form.Button>

        <Divider horizontal>Or</Divider>
        <p>
          <strong>Already have an account?</strong>
        </p>
        <Link to="/">Log in here.</Link>
      </Form>
    </Container>
  );
};

Join.propTypes = {
  history: object,
};

export default withRouter(Join);
