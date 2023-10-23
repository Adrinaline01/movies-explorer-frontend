import burger from '../../images/burger.svg';
import close from '../../images/button_close.svg';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  function handleOpenMenu() {
    setIsMenuOpened(!isMenuOpened);
  };
  return (
    <div className='navigation'>
      <button type='button' className='navigation__burger button' onClick={handleOpenMenu}>
        {isMenuOpened ?
          <img className='navigation__close' src={close} alt='close-button' />
          :
          <img className='navigation__menu' src={burger} alt='burger-menu' />
        }
      </button>
      <nav className={`navigation__container ${isMenuOpened ? 'navigation__container_opened' : ''}`}>
        <div className='navigation__links'>
          <NavLink to='/' className={({ isActive }) => `navigation__link-main button navigation__link ${isActive ? 'navigation__link_active' : ''}`} >
            Главная
          </NavLink>
          <NavLink to='/movies' className={({ isActive }) => `navigation__link button ${isActive ? 'navigation__link_active' : ''}`} >
            Фильмы
          </NavLink>
          <NavLink to='/saved-movies' className={({ isActive }) => `navigation__link button ${isActive ? 'navigation__link_active' : ''}`} >
            Сохранённые фильмы
          </NavLink>
          <NavLink to='/profile' className='navigation__link navigation__profile-link' >
            <button className='navigation__link-button button'>Аккаунт</button>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;