import React, { useState, useEffect, useRef, useId } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowLeftThick, TiArrowRightThick, TiArrowMaximise } from 'react-icons/ti';
import './overview.css';
import { OrbitSpinner } from 'react-epic-spinners';
import Parse from '../../parse';

function imageGallery ({
    p1,
    selectedProduct,
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
    const [loading, setLoading] = useState(true);
    const productEl = useRef(null);

    useEffect(() => {
      if(p1.length > 0) {
        setLoading(false);
      }
    }, [p1])

    return (
      <div>
        {!loading ?
        <div className='image-container'>
          <div className='g-container'>
          {arrowUp && <TiArrowSortedUp onClick={handleUpClick} className='arrow' />}
          {
            p1.map(item => {
              let id = Math.random();
              if (currentPhoto === item.photos[0].url) {
                if (item.photos[0].url === null) {
                  return;
                }
                return  <img onClick={e => handleThumbClick(e, item)} id={item.photos[0].url} key={id} src={item.photos[0].thumbnail_url} className='g-entry g-border'></img>
              } else {
                if (item.photos[0].url === null) {
                  return;
                }
                return  <img onClick={e => handleThumbClick(e, item)} id={item.photos[0].url} key={id} src={item.photos[0].thumbnail_url} className='g-entry'></img>
              }
            })

            }

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