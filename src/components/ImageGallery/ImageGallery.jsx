import React from 'react';
import PropTypes from 'prop-types';
import nextId from "react-id-generator";
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css'

const ImageGallery = ({items, openModal}) => {
  return (
    <ul className={css.imageGallery}>
      {items.map(item => <ImageGalleryItem key={nextId()} itemData={item} openModal={openModal}/>)}
    </ul>
  )
}

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape).isRequired,
  openModal: PropTypes.func.isRequired,
}

export default ImageGallery;