import React, { useState, useEffect, useRef, useId } from "react";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowLeftThick,
  TiArrowRightThick,
  TiArrowMaximise,
  TiArrowMinimise,
} from "react-icons/ti";
import "./overview.css";
import '../Reviews/ReviewsStyles.css';
import styled, { css, keyframes } from 'styled-components';
import ReactCSSTransitionGroup from 'react-transition-group';
import { OrbitSpinner } from "react-epic-spinners";
<<<<<<< HEAD
import Parse from "../../parse";
import PhotoOverlay from "../Reviews/PhotoOverlay.jsx";

/* --------------------  styled components  --------------------*/

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`


const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  animation: ${fadeIn} 1s;
`

const PvImg = styled.img`
  cursor: -moz-zoom-in;
  cursor: -webkit-zoom-in;
  cursor: zoom-in;
  width: 500px;
  height: 500px;
  object-fit: cover;
  animation: ${fadeIn} 1s;
`

/* --------------------  ImageGallery components  --------------------*/
=======
import {
  SideBySideMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";
import Parse from "../../parse";
import PhotoOverlay from "../Reviews/PhotoOverlay.jsx";
import ExpandOverlay from "./ExpandOverlay.jsx";
>>>>>>> dev

function ImageGallery({
  product,
  stylesList,
  expand,
  currentPhoto,
  currentStyle,
  arrowDown,
  arrowUp,
  arrowLeft,
  arrowRight,
  handleThumbClick,
  handleLeftClick,
  handleRightClick,
  handleDownClick,
  handleUpClick,
  handleExpandedView,
  handleSelectedProduct,
}) {
  const [loading, setLoading] = useState(true);
  const [overlay, setOverlay] = useState(false);
  const [clickedPhoto, setClickedPhoto] = useState('');

  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

  let handlePhotoClick = (e) => {
    setClickedPhoto(currentPhoto);
    setOverlay(true);
  };


  let handleOverlay = () => {
    setOverlay(false);
  };

  return (
    <div>
      {!loading ? (
        <div className="image-container">
          <div className="g-container">
            {arrowUp && (
              <TiArrowSortedUp onClick={handleUpClick} className="arrow" />
            )}

            {stylesList.map((style) => {
              let id = Math.random();

              if (currentPhoto === style.url) {
                if (style.url === null) {
                  return;
                }
<<<<<<< HEAD
                return <img onClick={e => handleThumbClick(e, style)} id={style.url} key={id} src={style.thumbnail_url} className='g-entry g-border'></img>
=======
                return (
                  <div key={id}>
                    <img onClick={e => handleThumbClick(e, style)} id={style.url} src={style.thumbnail_url} className='g-entry'></img>
                    <div className="g-line aClass"></div>
                  </div>
                )


>>>>>>> dev
              } else {
                if (style.url === null) {
                  return;
                }
                return <img onClick={e => handleThumbClick(e, style)} id={style.url} key={id} src={style.thumbnail_url} className='g-entry'></img>
              }

            })}

            {arrowDown && (
              <TiArrowSortedDown onClick={handleDownClick} className="arrow" />
            )}
          </div>

          <div className="pv-container">
            {arrowLeft &&
              <TiArrowLeftThick onClick={handleLeftClick} className='arrow' />}

<<<<<<< HEAD
            {overlay && <PhotoOverlay clickedPhoto={clickedPhoto} onClick={handleOverlay} />}
=======
            {overlay && <ExpandOverlay clickedPhoto={clickedPhoto} onClick={handleOverlay} />}


>>>>>>> dev
            <img className='pv-img' onClick={handlePhotoClick} src={currentPhoto || `https://via.placeholder.com/500`} alt={product.name}></img>

            {arrowRight && <TiArrowRightThick onClick={handleRightClick} className='arrow' />}

            <TiArrowMaximise onClick={handlePhotoClick} className='expand' />
          </div>

        </div>
      ) : (
        <OrbitSpinner color="teal" />
      )}
    </div>
  );
}

export default ImageGallery;
