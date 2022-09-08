import axios from 'axios';
import React, { useState, useContext, useEffect, useRef } from 'react';
import Parse from '../../parse.js';
import { OrbitSpinner } from 'react-epic-spinners';
import { AppContext } from '../AppContext.js';
import ImageGallery from './ImageGallery.jsx';
import StyleInformation from './StyleInformation.jsx';
import ProductOverview from './ProductOverview.jsx';
import { select } from 'underscore';
import { FcCheckmark } from 'react-icons/fc';

function Overview({ trackClick }) {

  const { selectedProduct,
    handleLocalClick,
    handleSelectedProduct,
    handleLocalSave,
    localName,
    localId,
    renderStars,
    getTotalReviews,
    getAverageRating } = useContext(AppContext);



  const [product, setProduct] = useState();
  const [stylesList, setStylesList] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState('');
  const [currentStyle, setCurrentStyle] = useState();
  const [arrowDown, setArrowDown] = useState(false);
  const [arrowUp, setArrowUp] = useState(false);
  const [arrowLeft, setArrowLeft] = useState(false);
  const [arrowRight, setArrowRight] = useState(true);
  const [expand, setExpand] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    console.log('OVERVIEW PROC')
    fetchData(selectedProduct);
    getCart();
  }, [])

  async function fetchData(productId) {
    setLoading(true);

    let set = selectedProduct;

    let params = `${selectedProduct.id}/styles`;
    const requestStyles = await Parse.getAll(`products/`, params);

    set.styles = requestStyles.data.results;

    params = `?product_id=${selectedProduct.id}`;
    const requestMeta = await Parse.getAll(`reviews/meta/`, params);
    set.averageRating = getAverageRating(requestMeta.data.ratings);
    set.totalReviews = getTotalReviews(requestMeta.data.recommended);

    if (set.styles[0].photos[0].url !== null) {
      setCurrentPhoto(set.styles[0].photos[0].url);
      setCurrentStyle(set.styles[0]);
    } else {
      setCurrentStyle(set.styles[1]);
      setCurrentPhoto(set.styles[1].photos[0].url);
    }
    setProduct(set);
    setStylesList(requestStyles.data.results[0].photos.slice(0, 7));
    if (requestStyles.data.results[0].photos.length > 6) {
      setArrowDown(true);
    }
  }

  async function getCart() {
    const request = await Parse.getAll('cart', undefined);
  }


  /* --------------------  style selection events  --------------------*/
  const handleProductClick = (e) => {
    e.preventDefault();
  }


  const handleStyleClick = (e, url, prod) => {
    e.preventDefault();
    if (prod.photos.length < 7) {
      setArrowDown(false);
    }
    setStylesList(prod.photos.slice(0, 7));
    setCurrentStyle(prod);
    setCurrentPhoto(prod.photos[0].url);
  }
  /* --------------------  style selection events  --------------------*/


  /* --------------------  gallery arrows events  --------------------*/
  const handleThumbClick = (e, item) => {
    let lastIndex = currentStyle.photos.length - 1;
    currentStyle.photos[0].url === e.target.id ? setArrowLeft(false) : setArrowLeft(true);
    currentStyle.photos[lastIndex].url === e.target.id ? setArrowRight(false) : setArrowRight(true);
    setCurrentPhoto(e.target.id);
  }
  const handleLeftClick = (e, item) => {
    let beforeLast = currentStyle.photos.length - 1;
    for (let i = 0; i < currentStyle.photos.length; i++) {
      if (currentStyle.photos[i].url === currentPhoto) {
        if (currentStyle.photos[1].url === currentPhoto) {
          setArrowLeft(false);
        }
        if (currentStyle.photos[beforeLast].url === currentPhoto) {
          setArrowRight(true);
        }
        if (i > 0) {
          if (i === 7) {
            setArrowDown(true);
            setArrowUp(false);
            setStylesList(currentStyle.photos.slice(0, 7));
            setCurrentPhoto(currentStyle.photos[i - 1].url);
          } else {
            setCurrentPhoto(currentStyle.photos[i - 1].url);
          }
        }
      }
    }
  }
  const handleRightClick = () => {
    let beforeLast = currentStyle.photos.length - 2;
    for (let i = 0; i < currentStyle.photos.length; i++) {
      if (currentStyle.photos[i].url === currentPhoto) {
        if ((i + 1) !== currentStyle.photos.length) {
          if (i === 0) {
            setArrowLeft(true);
          }
          if (currentStyle.photos[beforeLast].url === currentPhoto) {
            setArrowRight(false);
          }
          if (i === 6) {
            setArrowDown(false);
            setArrowUp(true);
            setStylesList(currentStyle.photos.slice(7, 14));
            setCurrentPhoto(currentStyle.photos[i + 1].url);
            if (i === currentStyle.photos.length - 2) {
              setArrowRight(false);
            }
          } else {
            setCurrentPhoto(currentStyle.photos[i + 1].url);
          }
        }
      }
    }
  }
  const handleDownClick = (e) => {
    setArrowUp(true);
    setArrowDown(false);
    setStylesList(currentStyle.photos.slice(7, 14));
    setCurrentPhoto(currentStyle.photos[5].url);
    let lastIndex = currentStyle.photos.length - 1;
    currentStyle.photos[lastIndex].url === currentStyle.photos[5].url ? setArrowRight(false) : setArrowRight(true);
    setArrowLeft(true);
  }
  const handleUpClick = (e) => {
    setArrowUp(false);
    setArrowDown(true);
    setArrowRight(true);
    setStylesList(currentStyle.photos.slice(0, 7));
    setCurrentPhoto(currentStyle.photos[0].url);
  }
  const handleExpandedView = (e) => {
    e.preventDefault();
    setExpand(prevExpand => !prevExpand);
  }
  /* --------------------  gallery arrows events  --------------------*/



  return (
    <React.Fragment>
      <div className='main-container' onClick={trackClick}>
        <ImageGallery
          product={product}
          stylesList={stylesList}
          expand={expand}
          stylesList={stylesList}
          currentPhoto={currentPhoto}
          currentStyle={currentStyle}
          arrowDown={arrowDown}
          arrowUp={arrowUp}
          arrowLeft={arrowLeft}
          arrowRight={arrowRight}
          handleThumbClick={handleThumbClick}
          handleLeftClick={handleLeftClick}
          handleRightClick={handleRightClick}
          handleDownClick={handleDownClick}
          handleUpClick={handleUpClick}
          handleExpandedView={handleExpandedView}
          handleSelectedProduct={handleSelectedProduct}
        />
        <StyleInformation
          product={product}
          currentStyle={currentStyle}
          currentPhoto={currentPhoto}
          localName={localName}
          localId={localId}
          renderStars={renderStars}
          handleStyleClick={handleStyleClick}
          handleLocalClick={handleLocalClick}
          handleLocalSave={handleLocalSave}
        />
      </div>
      <ProductOverview product={product} currentPhoto={currentPhoto} currentStyle={currentStyle} trackClick={trackClick}/>
    </React.Fragment>
  )

}


export default Overview;