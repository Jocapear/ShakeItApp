import React from 'react';
import Navigation from './Navigation.js';
import withAuthentication from './Session/withAuthentication';

const Header = () => {
  return <Navigation />;
/*
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from 'semantic-ui-react';

const Header = () => {
  return (
    <Menu
      secondary={true}
      pointing={true}
      defaultActiveIndex={0}
      items={[
        <MenuItem key={'shake-it'}>
          <Link to="/shake">Shake It</Link>
        </MenuItem>,
        <MenuItem position="right" key={'logout'}>
          Logout
        </MenuItem>,
      ]}
    />
  );
*/
};

export default withAuthentication(Header);
