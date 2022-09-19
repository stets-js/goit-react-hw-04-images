import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css'


const INITIAL_STATE = {
  searchQuery: '',
}

class Searchbar extends Component {
  state = {...INITIAL_STATE}

  handleChange = (evt) => {
    const {name, value} = evt.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    this.setState({...INITIAL_STATE});
  }

  render() {
    const {searchQuery} = this.state;


    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
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
            value={searchQuery}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
 
export default Searchbar;