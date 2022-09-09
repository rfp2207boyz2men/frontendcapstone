import React, { useState, useEffect, useContext, arrowLeft, arrowRight } from 'react';
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowLeftThick,
  TiArrowRightThick,
  TiArrowMaximise,
  TiArrowMinimise,
} from "react-icons/ti";



const ExpandView = ({ stylesList, handleOverlay, currentPhoto, setCurrentPhoto, currentStyle, handleLeftClick, handleRightClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPic = (picIndex) => {
    setCurrentPhoto(currentStyle.photos[picIndex].url);
  }


  return (
    <div className='slider'>

      <div id='lens-container'>
        <div id='lens'></div>
        <img id='featured' src={currentPhoto} className='sliderImg' ></img>
      </div>

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

    </div >
  )
};

export default ExpandView;