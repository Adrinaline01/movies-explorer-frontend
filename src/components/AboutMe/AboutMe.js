import { Link } from 'react-router-dom';
import myPhoto from '../../images/my_photo.jpg'

function AboutMe() {
  return(
    <section className="about-me">
    <h2 className="about-me__heading">Студент</h2>
    <article className="about-me__description">
    <img className="about-me__photo" src={myPhoto} alt='Фотография ученика факультета Веб-разработки' />
      <div className="about-me__main-text">
        <h3 className="about-me__name">Андрей</h3>
        <p className="about-me__activity">Студент факультета Веб-разработчик, 26 лет</p>
        <p className="about-me__information">Я родился на севере в Якутии, но проживаю в Адыгее. Закончил университет по
          направлению 09.03.01 - информатика и вычислительная техника КубГТУ. Кодить стал со времён университета, но JS
          занялся на факультете Веб-разработчика. После того, как пройду курс, хочу устроиться на работу.</p>
        <Link className="about-me__github button" to="https://github.com/Adrinaline01" target="_blank">Github</Link>
      </div>
    </article>
  </section>
  )
}

export default AboutMe;