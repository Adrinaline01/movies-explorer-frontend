import Arrow from '../../images/arrow.svg'
import { Link } from 'react-router-dom';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__heading">Портфолио</h2>
      <nav className="portfolio__navigation">
        <ul className="portfolio__sites-list">
          <li className="portfolio__sites-item">
            <Link className="portfolio__site button" to="https://github.com/Adrinaline01/how-to-learn" target="_blank">Статичный сайт</Link>
            <img className="portfolio__arrow" src={Arrow} />
          </li>
          <li className="portfolio__sites-item">
            <Link className="portfolio__site button" to="https://github.com/Adrinaline01/russian-travel" target="_blank">Адаптивный сайт</Link>
            <img className="portfolio__arrow" src={Arrow} />
          </li>
          <li className="portfolio__sites-item">
            <Link className="portfolio__site button" to="https://github.com/Adrinaline01/react-mesto-api-full-gha" target="_blank">Одностраничное приложение</Link>
            <img className="portfolio__arrow" src={Arrow} />
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default Portfolio;