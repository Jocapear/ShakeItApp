import React from 'react';
import routes from '../routes';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Header = () => {
  const { isLoggedIn } = useAuth();
  return (
    <ul className="nav">
      {routes.map((route, i) => (
        <li key={i}>
          <Link to={route.path}>{route.name}</Link>
        </li>
      ))}
      {isLoggedIn && (
        <li>
          <Link to="/shake">Shake It</Link>
        </li>
      )}
    </ul>
  );
};

export default Header;
