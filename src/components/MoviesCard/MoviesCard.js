import React, { useState } from "react";
import { useLocation } from "react-router-dom";


function MoviesCard({ movie }) {
  const location = useLocation();
  const moviesPage = location.pathname === '/movies';
  const savedMoviesPage = location.pathname === '/saved-movies';

  const [isSaved, setIsSaved] = useState(false)

  const handleSaveClick = () => {
    if (moviesPage) {
      setIsSaved(!isSaved);
    }
  };

  const buttonSaveCard = savedMoviesPage ? (
    <button className="movies-card__delete-movie button-for-image" type='button'></button>
  ) : isSaved ? (
    <button className="movies-card__already-save button-for-image" type='button'></button>
  ) : (
    <button className="movies-card__save button-for-image" onClick={handleSaveClick} type='button'></button>
  );

  const { title, link, duration } = movie;
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return (
    <li className='movies-card'>
      {buttonSaveCard}
      <img className="movies-card__image" src={link} alt={title} />
      <div className="movies-card__description">
        <h2 className="movies-card__title">{title}</h2>
        <div className="movies-card__time">
          <p className="movies-card__duration">{`${hours}ч ${minutes}м`}</p>
        </div>
      </div>
    </li>

  )
}

export default MoviesCard;