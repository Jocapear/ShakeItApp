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
import { getConsoleOutput } from '@jest/console';

const Login = ({ history }) => {
  const [state, actions] = useLoginState();
  const Auth = useAuth();

  if (Auth.isLoadingAuth) {
    return <Loader size="massive" />;
  }

  if (Auth.isLoggedIn) {
    return <Redirect to={{ pathname: '/shake' }} />;
  }

  const geoError = function(error) {
    console.log(error.code);
  };
  const geoSuccess = function(pos) {
    const crd = pos.coords;
    uploadMetadada(crd)
  };

  const uploadMetadada = async crd => {
    const podURL = JSON.parse(localStorage.getItem('authUser')).pod;
    const $rdf = require('rdflib');
    const last_latitude = crd.latitude;
    const last_longitude = crd.longitude;
    const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);
    await fetcher.load(podURL);
    const me = store.sym(podURL);
    store.add(me, FOAF('last_latitude'), new $rdf.Literal(last_latitude), me.doc())
    console.log("JOJOJO");
    const updater = new $rdf.UpdateManager(store);
    const updatePromise = new Promise((resolve) => {
      const deletions = [];
      const additions = [$rdf.st(me, FOAF('last_latitude'), new $rdf.Literal(last_latitude), me.doc()),
      $rdf.st(me, FOAF('last_longitude'), new $rdf.Literal(last_longitude), me.doc())];
      updater.update(deletions, additions, resolve);
      console.log(resolve);
    });
    await updatePromise;
    console.log("JEJEJE");
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
              let authUser = JSON.parse(localStorage.getItem('authUser'));
              if (res.user && res.user.pod != null){
                console.log("POD FOUND 2!");
                console.log(authUser.pod);
                navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
              }
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
            let authUser = JSON.parse(localStorage.getItem('authUser'));
            console.log(res.user);
            if (res.user && res.user.pod != null){
              console.log("POD FOUND 3!");
              console.log(authUser.pod);
              navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
            }
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
