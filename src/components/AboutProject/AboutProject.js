

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__heading">О проекте</h2>
      <ul className="about-project__list">
        <li className="about-project__item">
          <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности
            и финальные доработки.</p>
        </li>
        <li className="about-project__item">
          <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="about-project__scale">
        <div className="about-project__green-scale">1 неделя</div>
        <div className="about-project__grey-scale">4 недели</div>
      </div>
      <div className="about-project__inscription">
        <p className="about-project__back-end-inscription">Back-end</p>
        <p className="about-project__front-end-inscription">Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject;