import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css'


class Modal extends Component {
 

  handleOverlayClick = (evt) => {
    const overlay = evt.currentTarget;
    if (evt.target === overlay) {
      this.props.closeModal();
    }
  }

  handleEcsapeKey = (evt) => {
    if (evt.key === "Escape") {
      this.props.closeModal();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleEcsapeKey);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEcsapeKey);
  }
  
  render() {
    const {imgData} = this.props;
    const {src, alt} = imgData;

    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    )
  }
}

 Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    imgData: PropTypes.objectOf(PropTypes.string),
  }

export default Modal;