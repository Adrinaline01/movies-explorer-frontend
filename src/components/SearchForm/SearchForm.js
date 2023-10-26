import { useEffect, useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";

function SearchForm({ onSubmit, onCheckboxChange, shortMovies }) {
  const [values, setValues] = useState({ lowerText: "" });

  const location = useLocation();
  const isMySaveMoviesPage = location.pathname === '/saved-movies';

  const handleChangeInput = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSubmit(values.lowerText || '', shortMovies);
  };

  useEffect(() => {
    if (isMySaveMoviesPage) {
      setValues('');
    } else {
      const savedSearch = localStorage.getItem('textSearch');
      setValues({ lowerText: savedSearch });
    }
  }, [isMySaveMoviesPage]);



  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSearch} noValidate>
        <div className="search-form__movies">
          <input className="search-form__input" name='lowerText' type='text' placeholder="Фильм" onChange={handleChangeInput} value={values.lowerText ?? ''} />
          <button className="search-form__button button-without-color" type='submit'></button>
        </div>
        <FilterCheckbox onChange={onCheckboxChange} isChecked={shortMovies} />
      </form>
    </section>
  )
}

export default SearchForm;