import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import routes from './routes.js';
import './styles.css';

import protectedRoutes from './protectedRoutes';
import firebase from 'firebase';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

import ProtectedRouteHoc from './ProtectedRouteHoc';
import { AuthContextProvider } from './AuthContext';

firebase.initializeApp(firebaseConfig);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [isLoadingAuth, setLoadingAuth] = useState(true)
  const [user, setUser] = useState(null)
  
  function readSession() {
    const userJSONStr = window.sessionStorage.getItem(
			`firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
    );

		if (userJSONStr) {
      setLoggedIn(true)
      setUser(JSON.parse(userJSONStr))
    }
  }

  useEffect(() => {
    readSession()
    setLoadingAuth(false)
  }, [])

  return (
    <AuthContextProvider value={{ isLoggedIn, setLoggedIn, isLoadingAuth, user, setUser }}>
      <div className="App">
        <Router>
          <Switch>
            {protectedRoutes.map(route => (
              <ProtectedRouteHoc
                key={route.path}
                path={route.path}
                component={route.main}
                exact={route.exact}
                public={route.public}
              />
            ))}
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </Switch>
        </Router>
      </div>
    </AuthContextProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);