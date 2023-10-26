import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { moviesData } from "../../utils/constans";
import { getAllMovies } from "../../utils/MoviesApi";
import Preloader from '../Preloader/Preloader';

function Movies({ filterByName, saveMovies, savedMovies, deleteMovies }) {
  const moviesAll = JSON.parse(localStorage.getItem('allMovies')) ?? [];
  const moviesShortCheck = JSON.parse(localStorage.getItem('isShortMovies')) ?? false;

  const [filterMovies, setFilterMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState(moviesShortCheck);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const filterShortMovies = (movies) => {
    return movies.filter((movies) => movies.duration <= 40);
  };

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('filteredMovies'));
    if (savedMovies) {
      if (savedMovies.length !== 0) {
        setFilterMovies(shortMovies ? filterShortMovies(savedMovies) : savedMovies);
        setShortMovies(JSON.parse(localStorage.getItem('isShortMovie')));
      }
    }
  }, [shortMovies, searchText]);

  const handleCheckboxChange = () => {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      const moviesShort = filterShortMovies(filterMovies);
      setFilterMovies(moviesShort);
    } else {
      const allMovies = JSON.parse(localStorage.getItem('allMovies')) || [];
      filterAllMovies(allMovies, localStorage.getItem('textSearch'));
    }
    localStorage.setItem('isShortMovie', !shortMovies);
  };

  const filterAllMovies = (movies, text, checkbox) => {
    const filteredMovies = filterByName(movies, text);
    localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
    setFilterMovies(checkbox ? filterShortMovies(filteredMovies) : filteredMovies);
  };

  const searchMovies = (text, shortMovies) => {
    setIsLoading(true);
    setSearchText(text);
    if (text) {
      if (!moviesAll.length) {
        getAllMovies()
          .then((data) => {
            localStorage.setItem("allMovies", JSON.stringify(data));
            filterAllMovies(data, text, shortMovies);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Ошибка при загрузке фильмов: ', error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        filterAllMovies(moviesAll, text, shortMovies);
        setIsLoading(false);
      }
      localStorage.setItem('isShortMovie', shortMovies);
      localStorage.setItem('textSearch', text)
    } else {
      localStorage.setItem('textSearch', text);
      filterAllMovies([], text, shortMovies);
      setIsLoading(false);
      setSearchText('');
    }
  };

  const handleSaveClick = (movies) => {
    const deleteSaveMovie = savedMovies.find((savedMovies) => savedMovies.movieId === movies.id);
    if (deleteSaveMovie) {
      deleteMovies(deleteSaveMovie._id);
      return
    }
    saveMovies(movies);
  };

  return (
    <main className="main">
      <SearchForm onSubmit={searchMovies} onCheckboxChange={handleCheckboxChange} shortMovies={shortMovies} />
      {isLoading ? <Preloader /> : <MoviesCardList moviesData={filterMovies} onClick={handleSaveClick} savedMovies={savedMovies} searchText={searchMovies} />}
    </main>
  )
}

export default Movies;