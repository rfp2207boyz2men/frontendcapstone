import React, { useState, useEffect, useId } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowLeftThick, TiArrowRightThick, TiArrowMaximise } from 'react-icons/ti';
import './overview.css';
import { OrbitSpinner } from 'react-epic-spinners';
import Parse from '../../parse';

function imageGallery ({
    selectedProduct,
    loading,
    styles,
    currentPhoto,
    currentStyles,
    handleThumbClick,
    handleLeftClick,
    handleRightClick,
    handleDownClick,
    handleUpClick,
    arrowDown,
    arrowUp,
  }) {

    return (
      <div>
        {!loading ?
        <div className='image-container'>
          <div className='g-container'>
          {arrowUp && <TiArrowSortedUp onClick={handleUpClick} className='arrow' />}
          {currentStyles.map(pic => {
            let id = Math.random();
            if (currentPhoto === pic.url) {
              return  <img onClick={handleThumbClick} id={pic.url} key={id} src={pic.thumbnail_url} className='g-entry g-border'></img>
            } else {
              return  <img onClick={handleThumbClick} id={pic.url} key={id} src={pic.thumbnail_url} className='g-entry'></img>
            }

          })}

          {arrowDown && <TiArrowSortedDown onClick={handleDownClick} className='arrow' />}
          </div>

          <div className='pv-container'>
          <TiArrowLeftThick onClick={handleLeftClick} className='arrow' />
          <img className='pv-img' src={currentPhoto || `https://via.placeholder.com/500`} alt={selectedProduct.name}></img>
          <TiArrowRightThick onClick={handleRightClick} className='arrow' />
          <TiArrowMaximise className='expand' />
          </div>

        </div>

        :
        <OrbitSpinner color="teal" />
      }

      </div>
    )

}


export default imageGallery;