import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ isSaved, moviesData }) {
  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__container'>
        {moviesData.map((movie) => (
          <MoviesCard movie={movie}
            key={movie.id}
          />
        ))}
      </ul>
      {!isSaved && (
        <div className="movies-card-list__wrapper">
          <button className='movies-card-list__button button' type='button' aria-label='more'>
            Ещё
          </button>
        </div>
      )}
    </section>
  )
};

export default MoviesCardList;