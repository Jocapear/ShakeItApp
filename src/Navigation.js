import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={'/sign-up'}>Sign Up</Link>
      </li>
    </ul>
  </div>
);
export default Navigation;
