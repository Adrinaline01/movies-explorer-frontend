import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <section className='register'>
      <div className='register__container'>
        <Logo />
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form className='register__form'>
          <label className='register__label'>
            Имя
            <input className='register__input' required type='text' name='name' placeholder='Имя' minLength='2' maxLength='30' />
          </label>
          <label className='register__label'>
            E-mail
            <input className='register__input' required type='email' name='email' placeholder='Email' />
          </label>
          <label className='register__label'>
            Пароль
            <input className='register__input'  required type='password' name='password' placeholder='Пароль' minLength='6' maxLength='127' />
            <span className='register__error'>Что-то пошло не так...</span>
          </label>
          <div className='register__submit'>
            <button type='submit' aria-label='sign up' className='register__button button'>Зарегистрироваться</button>
            <div className='register__signin'>
              <p className='register__text'>Уже зарегистрированы? <Link to='/signin' className='register__link link'>Войти</Link></p>
            </div>
          </div>
        </form>
      </div>
    </section>

  )
}

export default Register;