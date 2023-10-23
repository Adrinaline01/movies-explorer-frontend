import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { moviesData } from "../../utils/constans";

function Movies() {
  return (
    <main className="main">
      <SearchForm />
      <MoviesCardList moviesData={ moviesData } />
    </main>
  )
}

export default Movies;