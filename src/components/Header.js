import React from 'react';
import Navigation from './Navigation.js';
import withAuthentication from './Session/withAuthentication';

const Header = () => {
  return <Navigation />;
};

export default withAuthentication(Header);
