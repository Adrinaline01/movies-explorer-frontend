import Header from "../Header/Header"

function Profile({ logOut }) {
  return (
    <section className="profile">
      <Header isAuth={true} />
      <div className="profile__container">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form">
          <label className="profile__label">
            Имя
            <input className="profile__input" />
          </label>
          <label className="profile__label">
            E-mail
            <input className="profile__input" />
          </label>
          <button className="profile__button-edit button-without-color">Редактировать</button>
          <button className="profile__button-exit button-without-color" onClick={logOut}>Выйти из аккаунта</button>
        </form>
      </div>
    </section>
  )
}

export default Profile;