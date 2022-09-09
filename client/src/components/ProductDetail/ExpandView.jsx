import React, { useState, useEffect, useContext, arrowLeft, arrowRight } from 'react';
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowLeftThick,
  TiArrowRightThick,
  TiArrowMaximise,
  TiArrowMinimise,
} from "react-icons/ti";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';



const ExpandView = ({ stylesList, handleOverlay, currentPhoto, setCurrentPhoto, currentStyle, handleLeftClick, handleRightClick, isMagnify, setIsMagnify }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMagnifyIn = () => {
    setIsMagnify(true);
  }

  const handleMagnifyOut = () => {
    setIsMagnify(false);
  }

  const goToPic = (picIndex) => {
    setCurrentPhoto(currentStyle.photos[picIndex].url);
  }


  return (
    <div className='slider'>
      <InnerImageZoom className='sliderImg' alt='Expanded Image'
        src={currentPhoto}
        hasSpacer={true}
        hideHint={true}
        zoomScale={1}
        afterZoomIn={handleMagnifyIn}
        afterZoomOut={handleMagnifyOut}
        fadeDuration={50} />
      {!isMagnify ?
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
        :
        <></>
      }

    </div >
  )
};

export default ExpandView;