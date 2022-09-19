import React, { Component } from 'react'
import { fetchGallery } from './Fetch'
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Searchbar from './Searchbar';
import css from './App.module.css'

class App extends Component {  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    error: null,
    foundImages: null,
    currentLargeImg: null,
  }

  setInitialParams = (searchQuery) => {
    if (searchQuery === '') {
      return alert('Enter the search value!')
    }

    if (searchQuery === this.state.searchQuery) {
      return;
    }

    this.setState({
      images: [],
      searchQuery,
      page: 1,
    });
  }

  loadMore = () => {
    this.setState(({page}) => ({page: page + 1}));
  }

  addImages = async (searchQuery, page) => {
    this.setState({ isLoading: true });

    try {
      const data = await fetchGallery(searchQuery, page);
      const {hits: newImages, totalHits: foundImages} = data;

      this.setState(oldState => ({
        images: [...oldState.images, ...newImages],
      }));

      if (foundImages !== this.state.foundImages) {
        this.setState({ foundImages });
      }
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({ isLoading: false });
    }
  }

  openModal = (src, alt) => {
    this.setState(state => ({...state, currentLargeImg: {src, alt}}));
  }

  closeModal = (e) => {
    this.setState({currentLargeImg: null});
  }

  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page || prevState.searchQuery !== this.state.searchQuery) {
      const {searchQuery, page} = this.state;
      this.addImages(searchQuery, page);
    }
  }

  render() {
    const {images, isLoading, error, foundImages, currentLargeImg} = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.setInitialParams}/>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <Loader />}
        {images.length > 0 && 
          <>
            <ImageGallery 
              items={images} 
              openModal={this.openModal} 
            />
            {images.length < foundImages && 
              <Button loadMore={this.loadMore} />
            }
          </>
        }
        {currentLargeImg && <Modal closeModal={this.closeModal} imgData={currentLargeImg}/>}
      </div>
    );
  }
};

export default App;
