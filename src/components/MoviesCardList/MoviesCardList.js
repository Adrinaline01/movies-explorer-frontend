import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useCallback, useEffect, useState } from "react";

function MoviesCardList({ moviesData, onClick, savedMovies, searchText, isSaved }) {
  const location = useLocation();
  const moviesPage = location.pathname === '/movies';
  const isSavedPage = location.pathname === '/saved-movies';

  const [initialCount, setInitialCount] = useState(3);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const resultMessage = () => {
    if (isSavedPage) {
      return searchText ? 'Ничего не найдено' : savedMovies && savedMovies.length !== 0 ? "У вас нет сохранённых фильмов" : 'У вас нет сохранённых фильмов';
    } else {
      return searchText ? 'Нужно ввести ключевое слово' : 'Нужно ввести ключевое слово'
    }
  };

  const handleWindowResize = useCallback(() => {
    if (windowWidth !== window.innerWidth) {
      setWindowWidth(window.innerWidth);
    }
  }, [windowWidth]);

  useEffect(() => {
    let resizeTimer;
    const lateWindowResizeHandler = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        handleWindowResize();
      }, 100)
    };

    window.addEventListener('resize', lateWindowResizeHandler);

    return () => {
      window.removeEventListener('resize', lateWindowResizeHandler);
    };
  }, [handleWindowResize]);

  const moviesInitialCount = () => {
    switch (true) {
      case windowWidth >= 1280:
        setInitialCount((prevCount) => prevCount + 3);
        break;
      default:
        setInitialCount((prevCount) => prevCount + 2);
        break
    }
  };

  useEffect(() => {
    switch (true) {
      case windowWidth > 1023:
        setInitialCount(12);
        break;
      case windowWidth <= 1023 && windowWidth > 750:
        setInitialCount(8);
        break;
      case windowWidth >= 320 && windowWidth <= 1023:
        setInitialCount(5);
        break;
      default:
        break;
    }
  }, [windowWidth]);

  const handleLikeFilm = (movie) => {
    console.log(savedMovies)
    if (!isSavedPage) {
      const likeMovie = savedMovies.find((film) => film.movieId === movie.id);
      return !!likeMovie;
    }
    return true
  }

  return (
    <section className='movies-card-list'>
      {moviesData.length === 0 ? (
        <p className="movies-card-list__message">{resultMessage()}</p>
      ) : (
        <>
          <ul className='movies-card-list__container'>
            {isSavedPage
              ? moviesData.map((movie) => {
                return <MoviesCard movie={movie} onClick={onClick}
                  key={isSavedPage ? movie._id : movie.id}
                  isLike={handleLikeFilm(movie)}
                />;
              })
              : moviesData.slice(0, initialCount).map((movie) => {
                return <MoviesCard movie={movie} onClick={onClick}
                  key={isSavedPage ? movie._id : movie.id}
                  isLike={handleLikeFilm(movie)}
                />
              })}
          </ul>
          {moviesPage && initialCount < moviesData.length ? (
            <div className="movies-card-list__wrapper">
              <button className='movies-card-list__button button' onClick={moviesInitialCount} type='button' aria-label='more'>
                Ещё
              </button>
            </div>
          ) : null}
        </>
      )}
    </section>
  )
};

export default MoviesCardList;