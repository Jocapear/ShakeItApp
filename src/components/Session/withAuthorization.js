import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import FirebaseContext from '../Firebase/context.js';
import { withFirebase } from '../Firebase/context.js';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  class Firebase extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.LOGIN);
          }
        },
        () => this.props.history.push(ROUTES.LOGIN)
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <FirebaseContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </FirebaseContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization);
};

export default withAuthorization;
