

function NavTab() {
  return(
    <div className="navtab__item">
      <h1 className="navtab__title">Учебный проект студента факультета Веб-разработки.</h1>
      <div className="navtab__links">
        <button className="navtab__about-project-button button">О проекте</button>
        <button className="navtab__technologies-button button">Технологии</button>
        <button className="navtab__student-button button">Студент</button>
      </div>
    </div>
  )
}

export default NavTab;