import Logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({ isAuth }) {
  return (
    <header className="header">
      <img className="header__logo" src={Logo} />
      {isAuth ?
        <Navigation />
        :
        <div className="header__links">
          <Link className="header__signup-link button" to='/signup' target="_blank">Регистрация</Link>
          <Link className="header__signin-link" to='/signin' target="_blank">
            <button className='header__signin-button button'>Войти</button>
          </Link>
        </div>
      }

    </header>
  )
}

export default Header;