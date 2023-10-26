import React, { useState } from "react";
import { useLocation } from "react-router-dom";


function MoviesCard(props) {
  const location = useLocation();
  const savedMoviesPage = location.pathname === '/saved-movies';


  const imageMovie = location.pathname === "/saved-movies" ? props.movie.image : `https://api.nomoreparties.co/${props.movie.image.url}`;

  const [isSaved, setIsSaved] = useState(false)

  const handleSaveClick = () => {
    props.onClick(props.movie)
  };

  const buttonSaveCard = savedMoviesPage ? (
    <button className="movies-card__delete-movie button-for-image" type='button' onClick={handleSaveClick}></button>
  ) : isSaved ? (
    <button className="movies-card__already-save button-for-image" type='button' onClick={handleSaveClick}></button>
  ) : (
    <button className="movies-card__save button-for-image" onClick={handleSaveClick} type='button'></button>
  );

  // const hours = Math.floor(duration / 60);
  // const minutes = duration % 60;
  return (
    <li className='movies-card'>
      {buttonSaveCard}
      <img className="movies-card__image" src={imageMovie} alt={props.movie.nameRU} />
      <div className="movies-card__description">
        <h2 className="movies-card__title">{props.movie.nameRU}</h2>
        <div className="movies-card__time">
          <p className="movies-card__duration">{props.movie.duration}</p>
        </div>
      </div>
    </li>

  )
}

export default MoviesCard;