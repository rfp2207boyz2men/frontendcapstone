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
import Parse from "../../parse";
import PhotoOverlay from "../Reviews/PhotoOverlay.jsx";
import ExpandView from "./ExpandView.jsx";

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
                return (
                  <div key={id}>
                    <img onClick={e => handleThumbClick(e, style)} id={style.url} src={style.thumbnail_url} className='g-entry'></img>
                    <div className="g-line"></div>
                  </div>
                )


              } else {
                if (style.url === null) {
                  return;
                }
                return (
                  <div key={id}>
                    <img onClick={e => handleThumbClick(e, style)} id={style.url} src={style.thumbnail_url} className='g-entry'></img>
                    <div className="g-line-hidden"></div>
                  </div>
                )
              }

            })}

            {arrowDown && (
              <TiArrowSortedDown onClick={handleDownClick} className="arrow" />
            )}
          </div>

          <div className="pv-container">
            {arrowLeft ? <TiArrowLeftThick onClick={handleLeftClick} className='arrow' /> : <TiArrowLeftThick onClick={handleLeftClick} className='arrow-hidden' />}

            {overlay &&
              <div className="expand-container">
                <ExpandView clickedPhoto={clickedPhoto} stylesList={stylesList} onClick={handleOverlay} />
              </div>
            }

            <img className='pv-img' onClick={handlePhotoClick} src={currentPhoto || `https://via.placeholder.com/500`} alt={product.name}></img>

            {arrowRight ? <TiArrowRightThick onClick={handleRightClick} className='arrow' /> : <TiArrowRightThick onClick={handleRightClick} className='arrow-hidden' />}

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
