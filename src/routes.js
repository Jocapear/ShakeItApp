import Login from './components/Login';
import Join from './components/Join';
import Restaurant from './components/Restaurant';
import Show from './components/Show';
import Sucursal from './components/Sucursal';
import AddCoupon from './components/AddCoupon';
import AddSucursal from './components/AddSucursal';
import AddRestaurant from './components/AddRestaurant';
import EditCoupon from './components/EditCoupon';
import Coupon from './components/Coupon';

const routes = [
  { name: 'Root', path: '/', exact: true, main: Login },
  { name: 'Join', path: '/join', exact: true, main: Join },
  { name: 'Login', path: '/login', exact: true, main: Login },
  { name: 'Restaurants', path: '/restaurant', exact: true, main: Restaurant },
  { name: 'Show', path: '/show/:id', exact: false, main: Show },
  {
    name: 'Sucursal',
    path: '/sucursal/:res/:id',
    exact: false,
    main: Sucursal,
  },
  { name: 'AddCoupon', path: '/add/:res/:id', exact: false, main: AddCoupon },
  { name: 'AddSucursal', path: '/add/:res', exact: false, main: AddSucursal },
  { name: 'AddRestaurant', path: '/add', exact: true, main: AddRestaurant },
  {
    name: 'EditCoupon',
    path: '/edit/:res/:suc/:id',
    exact: false,
    main: EditCoupon,
  },
  { name: 'Coupon', path: '/coupon', exact: true, main: Coupon },
];

export default routes;
