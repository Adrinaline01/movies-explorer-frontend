import React from 'react';
import { HashLink } from 'react-router-hash-link';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__item">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <div className="promo__links">
          <HashLink className="promo__about-project-button button" to='#about' smooth>О проекте</HashLink>
          <HashLink className="promo__technologies-button button" to='#techs' smooth>Технологии</HashLink>
          <HashLink className="promo__student-button button" to="#student" smooth>Студент</HashLink>
        </div>
      </div>
    </section>
  )
}

export default Promo;