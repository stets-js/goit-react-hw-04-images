import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'


const ImageGalleryItem = ({itemData, openModal}) => {
  const {webformatURL, tags, largeImageURL} = itemData;

  return (
    <li className={css.imageGalleryItem}>
      <img className={css.imageGalleryItem__image} src={webformatURL} alt={tags} onClick={() => openModal(largeImageURL, tags)}/>
    </li>
  )
}

ImageGalleryItem.propTypes = {
  itemData: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
}

export default ImageGalleryItem;