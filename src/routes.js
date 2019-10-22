import Login from './components/Login';
import Join from './components/Join';
import Restaurant from './components/Restaurant';
import Show from './components/Show';
import Sucursal from './components/Sucursal';
import AddCoupon from './components/AddCoupon';
import AddSucursal from './components/AddSucursal';
import AddRestaurant from './components/AddRestaurant';
import EditCoupon from './components/EditCoupon';
import EditSucursal from './components/EditSucursal';
import EditRestaurante from './components/EditRestaurante';
import Coupon from './components/Coupon';
import Register from './components/Register';

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
  {
    name: 'EditSucursal',
    path: '/edit/:res/:suc',
    exact: false,
    main: EditSucursal,
  },
  {
    name: 'EditRestaurante',
    path: '/edit/:res',
    exact: false,
    main: EditRestaurante,
  },
  { name: 'Coupon', path: '/coupon', exact: true, main: Coupon },
  { name: 'Register', path: '/register', exact: true, main: Register },
];

export default routes;
