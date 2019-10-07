import Login from './components/Login';
import Join from './components/Join';
import restaurant from './components/Restaurant';


const routes = [
  { name: 'Root', path: '/', exact: true, main: Login },
  { name: 'Join', path: '/join', exact: true, main: Join },
  { name: 'Login', path: '/login', exact: true, main: Login },
  { name: 'Restaurants', path: '/restaurant', exact: true, main: restaurant },
];

export default routes;
