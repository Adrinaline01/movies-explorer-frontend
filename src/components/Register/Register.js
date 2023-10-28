import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import { useValidator } from '../../hooks/useValidator';
import { useEffect } from 'react';

function Register({ onRegister, loggedIn, resetErrorGlobal, errorGlobal }) {
  const { values, handleChange, errors, isValid, resetForm } = useValidator();

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm])

  function handleClick() {
    resetErrorGlobal();
  }

  return (
    <section className='register'>
      <div className='register__container'>
        <Logo />
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form className='register__form' onSubmit={handleSubmit} >
          <label className='register__label'>
            Имя
            <input className='register__input' value={values.name || ""} pattern="[a-zA-Zа-яА-ЯёЁ\s\-]*" onChange={handleChange} required type='text' name='name' placeholder='Имя' minLength='2' maxLength='30' />
            <span className="register__error"> {errors.name}</span>
          </label>
          <label className='register__label'>
            E-mail
            <input className='register__input' pattern="[^@\s]+@[^@\s]+\.[^@\s]+" onChange={handleChange} required type='email' name='email' placeholder='Email' />
            <span className="register__error"> {errors.email}</span>
          </label>
          <label className='register__label'>
            Пароль
            <input className='register__input' onChange={handleChange} required type='password' name='password' placeholder='Пароль' minLength='6' maxLength='127' />
            <span className="register__error"> {errors.password}</span>
          </label>
          <span className='register__error'>{errorGlobal}</span>
          <div className='register__submit'>
            <button type='submit' aria-label='sign up' className={!isValid ? "register__button_disabled" : 'register__button button'} disabled={!isValid}>Зарегистрироваться</button>
            <div className='register__signin'>
              <p className='register__text'>Уже зарегистрированы? <Link to='/signin' className='register__link link' onClick={handleClick}>Войти</Link></p>
            </div>
          </div>
        </form>
      </div>
    </section>

  )
}

export default Register;