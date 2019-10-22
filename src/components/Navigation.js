import React from 'react';
import { Link } from 'react-router-dom';

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
  <ul className="nav">
    {authUser.Type.includes(ROLES.ADMIN) && (
      <li>
        <Link to={ROUTES.RESTAURANTS}>Restaurants</Link>
      </li>
    )}
    {authUser.Type.includes(ROLES.ADMIN) && (
      <li>
        <Link to={ROUTES.ADD_RESTAURANT}>Agregar restaurante</Link>
      </li>
    )}
    {authUser.Type.includes(ROLES.ADMIN) && (
      <li>
        <Link to={ROUTES.EDIT_RESTAURANT}>Editar sucursal</Link>
      </li>
    )}
    {(authUser.Type.includes(ROLES.ADMIN) ||
      authUser.Type.includes(ROLES.RESTAURANT)) && (
      <li>
        <Link to={ROUTES.SHOW}>Sucursales</Link>
      </li>
    )}
    {(authUser.Type.includes(ROLES.ADMIN) ||
      authUser.Type.includes(ROLES.RESTAURANT)) && (
      <li>
        <Link to={ROUTES.SUCURSAL}>Coupons</Link>
      </li>
    )}
    {(authUser.Type.includes(ROLES.ADMIN) ||
      authUser.Type.includes(ROLES.RESTAURANT)) && (
      <li>
        <Link to={ROUTES.ADD_COUPON}>Agregar cupon</Link>
      </li>
    )}
    {(authUser.Type.includes(ROLES.ADMIN) ||
      authUser.Type.includes(ROLES.RESTAURANT)) && (
      <li>
        <Link to={ROUTES.ADD_SUCURSAL}>Agregar sucursal</Link>
      </li>
    )}
    {(authUser.Type.includes(ROLES.ADMIN) ||
      authUser.Type.includes(ROLES.RESTAURANT)) && (
      <li>
        <Link to={ROUTES.EDIT_COUPON}>Editar cupon</Link>
      </li>
    )}
    {(authUser.Type.includes(ROLES.ADMIN) ||
      authUser.Type.includes(ROLES.RESTAURANT)) && (
      <li>
        <Link to={ROUTES.EDIT_SUCURSAL}>Editar sucursal</Link>
      </li>
    )}
    {(authUser.Type.includes(ROLES.ADMIN) ||
      authUser.Type.includes(ROLES.CLIENT)) && (
      <li>
        <Link to={ROUTES.COUPON}>Cupon</Link>
      </li>
    )}
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.REGISTER}>Register</Link>
    </li>
    <li>
      <Link to={ROUTES.LOGIN}>Log in</Link>
    </li>
  </ul>
);

export default Navigation;
