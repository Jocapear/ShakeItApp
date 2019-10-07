import Login from './components/Login';
import Join from './components/Join';
import Restaurant from './components/Restaurant';
import Show from './components/Show';
import Sucursal from './components/Sucursal';


const routes = [
  { name: 'Root', path: '/', exact: true, main: Login },
  { name: 'Join', path: '/join', exact: true, main: Join },
  { name: 'Login', path: '/login', exact: true, main: Login },
  { name: 'Restaurants', path: '/restaurant', exact: true, main: Restaurant },
  { name: 'Show', path: '/show/:id', exact: false, main: Show },
  { name: 'Sucursal', path: '/sucursal/:res/:id', exact: false, main: Sucursal },
];

export default routes;
