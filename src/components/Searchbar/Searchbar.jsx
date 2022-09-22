import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css'


const Searchbar = (onSubmit) => {
  
  const [q, setQ] = useState('')

  const handleChange = (evt) => {
    setQ(evt.currentTarget.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(q)
    setQ('');
  }

    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <button className={css.searchForm__button} type="submit">
            <span className={css.searchForm__buttonLabel}>Search</span>
          </button>

          <input
            className={css.searchForm__input}
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={q}
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
 
export default Searchbar;