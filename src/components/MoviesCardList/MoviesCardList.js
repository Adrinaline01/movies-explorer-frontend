import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({isSaved, moviesData}) {
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
        <button className='movies-card-list__button button'  type='button' aria-label='more'/>
      )}
    </section>
  )
};

export default MoviesCardList;