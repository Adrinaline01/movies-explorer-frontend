import LogoImage from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link className='logo-link' to='/'>
      <img className="logo" src={LogoImage} />
    </Link>
  )
}

export default Logo;