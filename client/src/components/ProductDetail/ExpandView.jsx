import React, { useState, useEffect, useContext, arrowLeft, arrowRight } from 'react';
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowLeftThick,
  TiArrowRightThick,
  TiArrowMaximise,
  TiArrowMinimise,
} from "react-icons/ti";
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";



const ExpandView = ({ stylesList, handleOverlay, currentPhoto, setCurrentPhoto, currentStyle, handleLeftClick, handleRightClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviewPhotoExpand = {
    position: 'fixed',
    maxHeight: '70vh',
    maxWidth: '70vw',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
    backgroundColor: 'white',
    border: '2px solid teal',
    zIndex: 3,
    overflowY: 'auto',
  }

  const expandOverlay = {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: '0.5',
    height: '100%',
    width: '100%',
    zIndex: 10,
  }

  const goPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? stylesList.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const goNext = () => {
    const isLastSlide = currentIndex === stylesList.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }

  const goToPic = (picIndex) => {
    setCurrentPhoto(currentStyle.photos[picIndex].url);
  }


  return (
    <div className='slider'>
      <img src={currentPhoto} className='sliderImg' alt='Expanded Image'></img>
      <div className='dot-container'>
        {currentStyle.photos.map((pic, picIndex) => {
          let id = Math.random();
          if (currentStyle.photos[picIndex].url === currentPhoto) {
            return (
              <div onClick={() => goToPic(picIndex)} className='dot-active' key={id}>
                ●
              </div>
            )
          } else {
            return (
              <div onClick={() => goToPic(picIndex)} className='dot' key={id}>
                ●
              </div>
            )
          }
        })}
      </div>

    </div>
  )
};

export default ExpandView;