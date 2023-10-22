import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import { moviesData } from "../../utils/constans";

function Movies() {
  return (
    <>
      <Header isAuth={true} />
      <SearchForm />
      <MoviesCardList moviesData={ moviesData } />
      <Footer />
    </>
  )
}

export default Movies;