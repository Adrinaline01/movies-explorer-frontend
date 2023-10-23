// import Logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';

function Header({ isAuth }) {
  return (
    <header className="header">
      <Logo />
      {isAuth ?
        <Navigation />
        :
        <div className="header__links">
          <Link className="header__signup-link button" to='/signup'>Регистрация</Link>
          <Link className="header__signin-link" to='/signin'>
            <button className='header__signin-button button-without-color'>Войти</button>
          </Link>
        </div>
      }

    </header>
  )
}

export default Header;