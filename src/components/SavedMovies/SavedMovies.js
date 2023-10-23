import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { moviesData } from "../../utils/constans";

function SavedMovies() {
  const savedMovies = moviesData.slice(0, 3);
  return (
    <main className="main">
      <SearchForm />
      <MoviesCardList moviesData={savedMovies} isSaved={true} />
    </main>
  )
}

export default SavedMovies;