import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Login({ onLogin }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(values);
  }


  return (
    <main>
      <section className='login'>
        <div className='login__container'>
          <Logo />
          <h1 className='login__title'>Рады видеть!</h1>
          <form className='login__form' onSubmit={handleSubmit}>
            <label className='login__label'>
              E-mail
              <input className='login__input' onChange={handleChange} required type='email' name='email' placeholder='Email' />
            </label>
            <label className='login__label'>
              Пароль
              <input className='login__input' onChange={handleChange} required type='password' name='password' placeholder='Пароль' minLength='6' maxLength='127' />
            </label>
            <div className='login__submit'>
              <button className='login__button button' type='submit' aria-label='sign-in'>Войти</button>
              <div className='login__signin'>
                <p className='login__text'>Ещё не зарегистрированы? <Link to='/signup' className='login__link link'>Регистрация</Link></p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
};

export default Login;