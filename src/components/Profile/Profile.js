import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header"
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useValidator } from "../../hooks/useValidator";

function Profile({ loggedIn, onSignOut, onUpdateUser, errorGlobal, resetErrorGlobal }) {
  const currentUser = useContext(CurrentUserContext)
  const { values, errors, handleChange, isValid, resetForm } = useValidator()
  const [isChange, setIsChange] = useState(false)

  useEffect(() => {
    if (values.name !== currentUser.name || values.email !== currentUser.email) {
      setIsChange(true);
    } else {
      setIsChange(false);
    }
  }, [currentUser, values]);

  useEffect(() => {

    resetForm({
      name: currentUser.name || "",
      email: currentUser.email || "",
    })
    setIsChange(false)
  }, [currentUser])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    handleChange(e)

    if (name === "name" || name === "email") {
      setIsChange(true)
    }
  }

  const handleSaveClick = () => {
    if (isValid) {
      const newUserInfo = {
        name: values.name,
        email: values.email,
      }
      console.log(newUserInfo)
      onUpdateUser(newUserInfo)
      resetErrorGlobal();
    }
  }

  return (
    <section className="profile">
      <Header loggedIn={loggedIn} />
      <div className="profile__container">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form">
          <label className="profile__label">
            Имя
            <input className="profile__input"
              name="name"
              type='text'
              pattern="[a-zA-Zа-яА-ЯёЁ\s\-]*"
              minLength="2"
              maxLength="40"
              onChange={handleInputChange}
              value={values.name || ''}
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
              onChange={handleInputChange}
              required />
          </label>
          <span className="profile__profile-error">{errors.email}</span>

          <span className="profile__profile-error">{errorGlobal}</span>

          <button className="profile__button-edit button-without-color" onClick={handleSaveClick} disabled={!isValid}>
            Редактировать
          </button>

          <button className="profile__button-exit button-without-color" onClick={onSignOut}>Выйти из аккаунта</button>
        </form>
      </div>
    </section>
  )
}

export default Profile;