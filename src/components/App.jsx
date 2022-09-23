import { useState, useEffect} from 'react'
import { fetchGallery } from './Fetch'
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Searchbar from './Searchbar';
import css from './App.module.css'

const App = () => {
  
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); 
  const [foundImages, setFoundImages] = useState(null); 
  const [currentLargeImg, setCurrentLargeImg] = useState(null);
  const [currentAlt, setCurrentAlt] = useState(null)

  const setInitialParams = (search) => {
    if (search === '') {
      return alert('Enter the search value!');
    }

    if (searchQuery === search) {
      return;
    }
    setImages([]);
    setSearchQuery(search);
    setPage(1);
  }



const loadMore = () => {
    setPage( s=>  s + 1);
  }

  const addImages = async (searchQuery, page) => {
    setIsLoading(true)

    try {
      if (!searchQuery) {
        return;
      }
      const data = await fetchGallery(searchQuery, page);
      setFoundImages(data.totalHits)
      const {hits: newImages, totalHits: foundImages} = data;

      setImages(oldImages => [...oldImages, ...newImages]);

      if (data.totalHits !== foundImages) {
        setImages({ foundImages });
      }
    } catch (error) {
      setError( error )
    } finally {
      setIsLoading(false)
    }
  }


 const openModal = (src, alt) => {
   setCurrentLargeImg(src);
   setCurrentAlt(alt)
  }

 const closeModal = () => {
   setCurrentLargeImg(null);
  }

 useEffect(()=>{addImages(searchQuery, page)}, [page, searchQuery])


    return (
      <div className={css.app}>
        <Searchbar onSubmit={setInitialParams}/>
        {error && <p>Whoops, something went wrong: {error}</p>}
        {isLoading && <Loader />}
        {images.length > 0 && 
          <>
            <ImageGallery 
              items={images} 
              openModal={openModal} 
            />
            {images.length < foundImages && 
              <Button loadMore={loadMore} />
            }
          </>
        }
        {currentLargeImg && <Modal closeModal={closeModal} imgData={currentLargeImg} imgAlt={currentAlt} />}
      </div>
    );
  }


export default App;
