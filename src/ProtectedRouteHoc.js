import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { any, object } from 'prop-types';
import { useAuth } from './AuthContext';
import { Loader } from 'semantic-ui-react';

const ProtectedRouteHoc = ({ component: Component, ...rest }) => {
  const Auth = useAuth();
  if (Auth.isLoadingAuth) {
    return <Loader size="massive" />;
  }
  if (Auth.isLoggedIn || rest.public) {
    return (
      <Route
        {...rest}
        render={props => {
          return <Component {...props}></Component>;
        }}
      />
    );
  }
  return <Redirect to={{ pathname: '/login' }} />;
};

ProtectedRouteHoc.propTypes = {
  component: any,
  rest: object,
  props: object,
};

export default withRouter(ProtectedRouteHoc);
