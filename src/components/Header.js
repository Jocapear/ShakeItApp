import Navigation from './Navigation.js';
import withAuthentication from './Session/withAuthentication';

const Header = withAuthentication(Navigation);

export default Header;
