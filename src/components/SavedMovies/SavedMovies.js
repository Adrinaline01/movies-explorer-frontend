import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies({ loggedIn, filterByName, savedMovies, deleteMovies }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filterShortMovies = (movies) => {
    return movies.filter((movie) => movie.duration <= 40);
  };

  const handleDeleteMovie = ({ _id: id }) => {
    deleteMovies(id)
  }

  useEffect(() => {
    const saveMovie = filterByName(savedMovies, searchText);
    if (savedMovies) {
      setFilteredMovies(isShortMovies ? filterShortMovies(saveMovie) : saveMovie);
    }
    return;
  }, [savedMovies, isShortMovies]);

  const searchMyMovies = (inputText) => {
    if (inputText) {
      if (savedMovies) {
        setSearchText('');
        setFilteredMovies(isShortMovies ? filterShortMovies(filterByName(savedMovies, inputText)) : filterByName(savedMovies, inputText));
        setSearchText(inputText);
      }
    } else {
      setFilteredMovies([]);
      setSearchText('');
    }
  }

  const handleCheckboxChange = () => {
    setIsShortMovies(!isShortMovies);
  };



  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main">
        <SearchForm onSubmit={searchMyMovies} onCheckboxChange={handleCheckboxChange} shortMovies={isShortMovies} />
        <MoviesCardList moviesData={filteredMovies} onClick={handleDeleteMovie} searchText={searchText} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;