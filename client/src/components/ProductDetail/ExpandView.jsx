import React, { useState, useEffect, useContext } from 'react';
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



const ExpandView = ({ stylesList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderStyle = {
    position: 'relative',
    height: '100%',
  }

  const slideStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }

  const leftArrow = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    left: '32px',
    fontSize: '25px',
    color: '#000',
    zIndex: 2,
    cursor: 'pointer',
  }

  const rightArrow = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    left: '462px',
    fontSize: '25px',
    color: '#000',
    zIndex: 2,
    cursor: 'pointer',
  }

  const dotContainer = {
    display: 'flex',
    justifyContent: 'center',
  }

  const dot = {
    margin: '0 3px',
    cursor: 'pointer',
    fontSize: '20px',
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
    setCurrentIndex(picIndex);
  }

  const sliderPicture = {
    ...slideStyle,
    backgroundImage: `url(${stylesList[currentIndex].url})`,
  };

  return (
    <div style={sliderStyle}>
      <TiArrowLeftThick onClick={goPrevious} style={leftArrow} />
      <TiArrowRightThick onClick={goNext} style={rightArrow} />
      <div style={sliderPicture}></div>

      <div style={dotContainer}>
        {stylesList.map((pic, picIndex) => {
          let id = Math.random();
          return (
            <div onClick={() => goToPic(picIndex)} style={dot} key={id}>
              ●
            </div>
          )
        })}
      </div>

    </div>
  )
};

export default ExpandView;