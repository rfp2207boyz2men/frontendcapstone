import axios from 'axios';
import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import Parse from '../../parse.js';
import { OrbitSpinner } from 'react-epic-spinners';
import { OverviewProvider } from './OverviewContext.js';
import ImageGallery from './ImageGallery.jsx';
import StyleInformation from './StyleInformation.jsx';
import ProductOverview from './ProductOverview.jsx';
import { select } from 'underscore';

function Overview({
  selectedProduct,
  handleLocalClick,
  handleLocalSave,
  localName,
  localId,
  renderStars,
  getAverageRating,
  getTotalReviews,
  handleSelectedProduct,
}) {
  const [product, setProduct] = useState();
  const [count, setCount] = useState(1);
  const [stylesList, setStylesList] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState('');
  const [currentStyle, setCurrentStyle] = useState();
  const [arrowDown, setArrowDown] = useState(false);
  const [arrowUp, setArrowUp] = useState(false);
  const [expand, setExpand] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchData(selectedProduct);
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
    setStylesList(requestStyles.data.results.slice(0, 5));
    if (requestStyles.data.results.length > 4) {
      setArrowDown(true);
    }
  }

  const handleThumbClick = (e, item) => {
    setCurrentPhoto(e.target.id);
    setCurrentStyle(item);
  }
  const handleLeftClick = (e, item) => {
    for (let i = 0; i < product.styles.length; i++) {
      if (product.styles[i].photos[0].url === currentPhoto) {
        if (i > 0) {
          setCurrentStyle(product.styles[i - 1]);
          setCurrentPhoto(product.styles[i - 1].photos[0].url);
        }
      }
    }
  }
  const handleRightClick = (e, item) => {
    for (let i = 0; i < product.styles.length; i++) {
      if (product.styles[i].photos[0].url === currentPhoto) {
        if ((i + 1) !== product.styles.length) {
          setCurrentStyle(product.styles[i + 1]);
          setCurrentPhoto(product.styles[i + 1].photos[0].url);
        }
      }
    }
  }

  // useEffect(() => {
  //  fetchData(count);
  // }, [count])

  const handleDownClick = (e) => {
    setArrowUp(true);
    setArrowDown(false);
    setStylesList(product.styles.slice(5, 10));
    setCurrentPhoto(product.styles[5].photos[0].url);
  }

  const handleUpClick = (e) => {
    setArrowUp(false);
    setArrowDown(true);
    setStylesList(product.styles.slice(0, 5));
    setCurrentPhoto(product.styles[0].photos[0].url);
  }

  const handleStyleClick = (e, url, prod) => {
    e.preventDefault();
    setCurrentPhoto(url);
    setCurrentStyle(prod);
  }

  const handleProductClick = (e) => {
    e.preventDefault();
  }

  const handleExpandedView = (e) => {
    e.preventDefault();
    setExpand(prevExpand => !prevExpand);
  }


  return (
    <React.Fragment>
      <div className='main-container'>
        <ImageGallery
          product={product}
          stylesList={stylesList}
          expand={expand}
          currentPhoto={currentPhoto}
          currentStyle={currentStyle}
          arrowDown={arrowDown}
          arrowUp={arrowUp}
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
          localName={localName}
          localId={localId}
          renderStars={renderStars}
          handleStyleClick={handleStyleClick}
          handleLocalClick={handleLocalClick}
          handleLocalSave={handleLocalSave}
        />
      </div>
      <ProductOverview product={product} currentPhoto={currentPhoto} currentStyle={currentStyle} />
    </React.Fragment>
  )

}


export default Overview;