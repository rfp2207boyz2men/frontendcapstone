import React, { useState, useEffect, useRef, useId } from "react";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowLeftThick,
  TiArrowRightThick,
  TiArrowMaximise,
  TiArrowMinimise,
} from "react-icons/ti";
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
  setCurrentPhoto,
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
}) {
  const [loading, setLoading] = useState(true);
  const [overlay, setOverlay] = useState(false);
  const [clickedPhoto, setClickedPhoto] = useState('');
  const [isMagnify, setIsMagnify] = useState(false);

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

  let marginRight = {marginRight : overlay ? '575px' : '0'};

  return (
    <div>
      {!loading ? (
        <div style={marginRight} className="image-container">
          {!overlay &&
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
                      <img onClick={e => handleThumbClick(e, style)} id={style.url} src={style.thumbnail_url} className='g-entry' alt='Style Thumbnail'></img>
                      <div className="g-line"></div>
                    </div>
                  )


                } else {
                  if (style.url === null) {
                    return;
                  }
                  return (
                    <div key={id}>
                      <img onClick={e => handleThumbClick(e, style)} id={style.url} src={style.thumbnail_url} className='g-entry' alt='Style Thumbnail'></img>
                      <div className="g-line-hidden"></div>
                    </div>
                  )
                }

              })}

              {arrowDown && (
                <TiArrowSortedDown onClick={handleDownClick} className="arrow" />
              )}
            </div>



          }

          <div className="pv-container">
            {arrowLeft ? <TiArrowLeftThick onClick={handleLeftClick} className='arrow' /> : <TiArrowLeftThick onClick={handleLeftClick} className='arrow-hidden' />}
            {overlay &&
              <div>
                <div className="slider-modal">
                  <ExpandView clickedPhoto={clickedPhoto}
                    handleOverlay={handleOverlay}
                    currentStyle={currentStyle}
                    currentPhoto={currentPhoto}
                    setCurrentPhoto={setCurrentPhoto}
                    stylesList={stylesList}
                    handleLeftClick={handleLeftClick}
                    handleRightClick={handleRightClick}
                    arrowLeft={arrowLeft}
                    arrowRight={arrowRight}
                    onClick={handleOverlay}
                    isMagnify={isMagnify}
                    setIsMagnify={setIsMagnify} />
                </div>
                {!isMagnify ? arrowLeft ? <TiArrowLeftThick onClick={handleLeftClick} className='left-arrow-v' /> : <TiArrowLeftThick onClick={handleLeftClick} className='arrow-hidden' /> : <></>}

                {!isMagnify ? arrowRight ? <TiArrowRightThick onClick={handleRightClick} className='right-arrow-v' /> : <TiArrowRightThick onClick={handleRightClick} className='arrow-hidden' /> : <></>}
                <div className="g-container-vertical">
                  {arrowUp && (
                    <TiArrowSortedUp onClick={handleUpClick} className="arrow-side" />
                  )}

                  {!isMagnify ?
                    stylesList.map((style) => {
                      let id = Math.random();
                      if (currentPhoto === style.url) {
                        if (style.thumbnail_url === null) {
                          return;
                        }
                        return (
                          <div key={id}>
                            <img onClick={e => handleThumbClick(e, style)} id={style.url} src={style.thumbnail_url} className='g-entry-v-b' alt='Style Thumbnail'></img>
                          </div>
                        )
                      } else {
                        if (style.thumbnail_url === null) {
                          return;
                        }
                        return (
                          <div key={id}>
                            <img onClick={e => handleThumbClick(e, style)} id={style.url} src={style.thumbnail_url} className='g-entry-v' alt='Style Thumbnail'></img>
                          </div>
                        )
                      }
                    }) : <></>}

                  {arrowDown && (
                    <TiArrowSortedDown onClick={handleDownClick} className="arrow-side" />
                  )}
                </div>
                <div className="slider-overlay" onClick={handleOverlay}></div>
              </div>
            }

            {!overlay && <img className='pv-img' onClick={handlePhotoClick} src={currentPhoto || `https://via.placeholder.com/500`} alt={product.name} alt='Style In View'></img>}

            {!overlay && (arrowRight ? <TiArrowRightThick onClick={handleRightClick} className='arrow' /> : <TiArrowRightThick onClick={handleRightClick} className='arrow-hidden' />)}

            {!overlay && <TiArrowMaximise onClick={handlePhotoClick} className='expand' />}
          </div>

        </div>
      ) : (
        <OrbitSpinner color="teal" />
      )
      }
    </div >
  );
}

export default ImageGallery;