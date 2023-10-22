import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { moviesData } from "../../utils/constans";

function SavedMovies() {
  const savedMovies = moviesData.slice(0, 3);
  return (
    <>
      <Header isAuth={true} />
      <SearchForm />
      <MoviesCardList moviesData={savedMovies} isSaved={true} />
      <Footer />
    </>
  )
}

export default SavedMovies;