// import Logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';

function Header({ loggedIn, resetErrorGlobal }) {
  function handleClick() {
    resetErrorGlobal();
  }
  return (
    <header className="header">
      <Logo />
      {loggedIn ? (
        <Navigation loggedIn={loggedIn} />)
        :
        <div className="header__links">
          <Link className="header__signup-link button" to='/signup'>Регистрация</Link>
          <Link className="header__signin-link" to='/signin'>
            <button className='header__signin-button button-without-color' onClick={handleClick}>Войти</button>
          </Link>
        </div>
      }

    </header>
  )
}

export default Header;