import Login from './components/Login';
import Join from './components/Join';
import Coupon from './components/Coupon';

const routes = [
  { name: 'Root', path: '/', exact: true, main: Login },
  { name: 'Join', path: '/join', exact: true, main: Join },
  { name: 'Login', path: '/login', exact: true, main: Login },
  { name: 'Coupon', path: '/coupon', exact: true, main: Coupon },
];

export default routes;
