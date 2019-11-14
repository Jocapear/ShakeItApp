import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from 'semantic-ui-react';

import FirebaseContext from './Firebase/context.js';
import * as ROUTES from '../constants/routes';
import * as ROLES from '../constants/roles';

const Navigation = () => (
  <FirebaseContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </FirebaseContext.Consumer>
);
const NavigationAuth = ({ authUser }) => (
  <Menu secondary={true} pointing={true} defaultActiveIndex={0}>
    {authUser.Type.includes(ROLES.ADMIN) && (
      <MenuItem>
        <Link to={ROUTES.RESTAURANTS}>Restaurants</Link>
      </MenuItem>
    )}
    {authUser.Type.includes(ROLES.ADMIN) && (
      <MenuItem>
        <Link to={ROUTES.ADD_RESTAURANT}>Agregar restaurante</Link>
      </MenuItem>
    )}
    {authUser.Type.includes(ROLES.ADMIN) && (
      <MenuItem>
        <Link to={ROUTES.EDIT_RESTAURANT}>Editar sucursal</Link>
      </MenuItem>
    )}
    {(authUser.Type.includes(ROLES.ADMIN) ||
      authUser.Type.includes(ROLES.RESTAURANT)) && (
      <MenuItem>
        <Link to={ROUTES.SHOW}>Sucursales</Link>
      </MenuItem>
    )}
    {(authUser.Type.includes(ROLES.ADMIN) ||
      authUser.Type.includes(ROLES.RESTAURANT)) && (
      <MenuItem>
        <Link to={ROUTES.SUCURSAL}>Coupons</Link>
      </MenuItem>
    )}
    {(authUser.Type.includes(ROLES.ADMIN) ||
      authUser.Type.includes(ROLES.RESTAURANT)) && (
      <MenuItem>
        <Link to={ROUTES.ADD_COUPON}>Agregar cupon</Link>
      </MenuItem>
    )}
    {(authUser.Type.includes(ROLES.ADMIN) ||
      authUser.Type.includes(ROLES.RESTAURANT)) && (
      <MenuItem>
        <Link to={ROUTES.ADD_SUCURSAL}>Agregar sucursal</Link>
      </MenuItem>
    )}
    {(authUser.Type.includes(ROLES.ADMIN) ||
      authUser.Type.includes(ROLES.RESTAURANT)) && (
      <MenuItem>
        <Link to={ROUTES.EDIT_COUPON}>Editar cupon</Link>
      </MenuItem>
    )}
    {(authUser.Type.includes(ROLES.ADMIN) ||
      authUser.Type.includes(ROLES.RESTAURANT)) && (
      <MenuItem>
        <Link to={ROUTES.EDIT_SUCURSAL}>Editar sucursal</Link>
      </MenuItem>
    )}
  </Menu>
);

const NavigationNonAuth = () => (
  <Menu secondary={true} pointing={true} defaultActiveIndex={0}>
    <MenuItem>
      <Link to={ROUTES.REGISTER}>Register</Link>
    </MenuItem>
    <MenuItem>
      <Link to={ROUTES.LOGIN}>Log in</Link>
    </MenuItem>
  </Menu>
);

export default Navigation;
