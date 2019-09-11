import React from 'react';
import App from './App';

const protectedRoutes = [
	{
		name: 'shake',
		exact: true,
		path: '/shake',
		main: props => <App {...props} />,
		public: false,
	},
];

export default protectedRoutes;