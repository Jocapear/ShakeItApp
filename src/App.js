import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './Navigation.js';
import SignUp from './pages/SignUp.js';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navigation />

          <hr />

          <Route path={'/sign-up'} component={SignUp} />
        </div>
      </Router>
    </div>
  );
}

export default App;
