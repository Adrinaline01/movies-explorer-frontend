import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header"
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useValidator } from "../../hooks/useValidator";

function Profile({
  loggedIn,
  onSignOut,
  onUpdateUser,
  errorGlobal,
  resetErrorGlobal
}) {
  const currentUser = useContext(CurrentUserContext)
  const {
    values,
    errors,
    handleChange,
    isValid,
    setIsValid,
    setValues,
  } = useValidator()
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setIsValid(false);
    }
  }, [values, currentUser]);

  useEffect(() => {
    setValues({
      name: currentUser.name || "",
      email: currentUser.email || "",
    });
    setIsChange(false);
  }, [currentUser]);

  const handleEdit = () => {
    setIsChange(true);
  }

  const handleSaveClick = (event) => {
    event.preventDefault();
    if (isValid) {
      const newUserInfo = {
        name: values.name,
        email: values.email,
      }
      onUpdateUser(newUserInfo);
      resetErrorGlobal();
      setIsChange(false); // Сбросить флаг изменений после сохранения
    }
  }

  return (
    <section className="profile">
      <Header loggedIn={loggedIn} />
      <div className="profile__container">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" onSubmit={handleSaveClick}>
          <label className="profile__label">
            Имя
            <input className="profile__input"
                   name="name"
                   type='text'
                   pattern="[a-zA-Zа-яА-ЯёЁ\s\-]*"
                   minLength="2"
                   maxLength="40"
                   onChange={handleChange}
                   value={values.name || ''}
                   disabled={!isChange}
                   required />
          </label>
          <span className="profile__profile-error">{errors.name}</span>

          <label className="profile__label">
            E-mail
            <input className="profile__input"
                   name="email"
                   id="name-input"
                   pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                   type='email'
                   value={values.email || ""}
                   onChange={handleChange}
                   disabled={!isChange}
                   required />
          </label>
          <span className="profile__profile-error">{errors.email}</span>

          <span className="profile__profile-error">{errorGlobal}</span>
          {!isChange
            ? (<button
              type='button'
              className="profile__button-edit button-without-color"
              onClick={handleEdit}>
              Редактировать
            </button>)
            : (<button
              type='submit'
              className={`profile__button-edit button-without-color ${!isValid ? 'profile__button-edit_disabled' : ''}`}
              disabled={!isValid}>
              Сохранить
            </button>)
          }

          <button className="profile__button-exit button-without-color"
                  onClick={onSignOut}>Выйти из аккаунта
          </button>
        </form>
      </div>
    </section>
  )
}

export default Profile;
