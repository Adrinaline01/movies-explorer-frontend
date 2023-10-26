import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header"
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useValidator } from "../../hooks/useValidator";

function Profile({ loggedIn, onSignOut, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext)
  const {
    values,
    errors,
    handleChange,
    isValid,
    resetForm,
  } = useValidator()

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
  }, [currentUser, resetForm])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    handleChange(e)

    if (name === "name" || name === "email") {
      setIsChange(true)
    }
  }

  const handleSaveClick = () => {
    if (isValid) {
      const newUserData = {
        name: values.name,
        email: values.email,
      }
      onUpdateUser(newUserData)
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
              type='text'
              onChange={handleInputChange}
              value={values.name || ''}
              required />
            <span className="profile__profile-error">{errors.email}</span>
          </label>
          <label className="profile__label">
            E-mail
            <input className="profile__input"
              id="name-input"
              type='email'
              value={values.email}
              onChange={handleInputChange}
              required />
          </label>
          <button className="profile__button-edit button-without-color" onClick={handleSaveClick}>
            Редактировать
          </button>
          <button className="profile__button-exit button-without-color" onClick={onSignOut}>Выйти из аккаунта</button>
        </form>
      </div>
    </section>
  )
}

export default Profile;