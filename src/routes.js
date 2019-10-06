import Login from './components/Login';
import Join from './components/Join';
import Crud from './components/Crud';


const routes = [
  { name: 'Root', path: '/', exact: true, main: Login },
  { name: 'Join', path: '/join', exact: true, main: Join },
  { name: 'Login', path: '/login', exact: true, main: Login },
  { name: 'Crud', path: '/crud', exact: true, main: Crud },
];

export default routes;
