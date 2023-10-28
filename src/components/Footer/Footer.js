import { Link } from "react-router-dom"

function Footer() {
  return (
    <section className="footer">
      <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2023</p>
        <nav className="footer__navigation">
          <ul className="footer__navigation-links">
            <li>
              <Link className="footer__navigation-link button" to="https://practicum.yandex.ru" target="_blank">Яндекс.Практикум</Link>
            </li>
            <li>
              <Link className="footer__navigation-link button" to="https://github.com/Adrinaline01" target="_blank">Github</Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default Footer;