import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section class="search-form">
      <form className="search-form__form">
        <div class="search-form__movies">
          <input class="search-form__input" type='text' placeholder="Фильм" />
          <button class="search-form__button button-without-color" type='submit'></button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  )
}

export default SearchForm;