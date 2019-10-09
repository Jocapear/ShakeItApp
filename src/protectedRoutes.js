import React from 'react';
import App from './App';

const Main = props => <App {...props} />;

const protectedRoutes = [
  {
    name: 'shake',
    exact: true,
    path: '/shake',
    main: Main,
    public: false,
  },
];

export default protectedRoutes;
