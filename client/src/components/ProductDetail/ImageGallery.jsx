import React, { useState, useEffect, useRef, useId } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowLeftThick, TiArrowRightThick, TiArrowMaximise, TiArrowMinimise } from 'react-icons/ti';
import './overview.css';
import { OrbitSpinner } from 'react-epic-spinners';
import Parse from '../../parse';

function imageGallery ({
    p1,
    selectedProduct,
    expand,
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
    handleExpandedView,
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
            p1.map(prod => {
              let id = Math.random();

              if (currentPhoto === prod.styles[0].photos[0].url || JSON.stringify(prod).includes(currentPhoto)) {
                if (prod.styles[0].photos[0].url === null) {
                  return;
                }
                return  <img onClick={e => handleThumbClick(e, prod)} id={prod.styles[0].photos[0].url} key={id} src={prod.styles[0].photos[0].thumbnail_url} className='g-entry g-border'></img>
              } else {
                if (prod.styles[0].photos[0].url === null) {
                  return;
                }
                return  <img onClick={e => handleThumbClick(e, prod)} id={prod.styles[0].photos[0].url} key={id} src={prod.styles[0].photos[0].thumbnail_url} className='g-entry'></img>
              }

            })

            }

          {arrowDown && <TiArrowSortedDown onClick={handleDownClick} className='arrow' />}
          </div>



          {expand?
          <div className='pv-container-active'>
            <TiArrowLeftThick onClick={handleLeftClick} className='arrow' />
            <img className='pv-active' onClick={handleExpandedView} src={currentPhoto || `https://via.placeholder.com/500`} alt={selectedProduct.name}></img>
            <TiArrowRightThick onClick={handleRightClick} className='arrow' />
            <TiArrowMinimise onClick={handleExpandedView} className='expand' />
          </div>
          :
          <div className='pv-container'>
            <TiArrowLeftThick onClick={handleLeftClick} className='arrow' />
            <img className='pv-img' onClick={handleExpandedView} src={currentPhoto || `https://via.placeholder.com/500`} alt={selectedProduct.name}></img>
            <TiArrowRightThick onClick={handleRightClick} className='arrow' />
            <TiArrowMaximise onClick={handleExpandedView} className='expand' />
          </div>
          }

          </div>

          :
          <OrbitSpinner color="teal" />
        }
      </div>
    )

}


export default imageGallery;