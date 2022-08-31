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
  const [pTemp, setPTemp] = useState([]);
  const [styles, setStyles] = useState([]);
  const [productId, setProductId] = useState(0);
  const [productList, setProductList] = useState([]);
  const [currentProduct, setCurrentProduct] = useState();
  const [currentPhoto, setCurrentPhoto] = useState('');
  const [currentStyle, setCurrentStyle] = useState();
  const [arrowDown, setArrowDown] = useState(true);
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
    set.styles = requestStyles.data.results


    params = `?product_id=${selectedProduct.id}`;
    const requestMeta = await Parse.getAll(`reviews/meta/`, params);
    set.averageRating = getAverageRating(requestMeta.data.ratings);
    set.totalReviews = getTotalReviews(requestMeta.data.recommended);


    console.log('what we got so far??', set);

    // get product features data for each product

    // for (let i = 0; i < set.length; i++) {
    //   const requestFeatures = await Parse.getAll(`products/`, set[i].id);
    //   set[i]['slogan'] = requestFeatures.data.slogan;
    //   set[i]['features'] = requestFeatures.data.features;
    // }

    if (set.styles[0].photos[0].url !== null) {
      setCurrentPhoto(set.styles[0].photos[0].url);
    } else {
      setCurrentPhoto(set.styles[1].photos[0].url);
    }
    setProduct(set);


    // get avg ratings and reviews for each product

    //  for (let i = 0; i < set.length; i++) {
    //    let params = `?product_id=${set[i].id}`;
    //    const requestMeta = await Parse.getAll(`reviews/meta/`, params);
    //    set[i]['averageRating'] = getAverageRating(requestMeta.data.ratings);
    //    set[i]['totalReviews'] = getTotalReviews(requestMeta.data.recommended);

    //   }


    let list = [];
    // get styles for each product
    // for (let i = 0; i < set.length; i++) {
    //   let params = `${set[i].id}/styles`;
    //   const requestStyles = await Parse.getAll(`products/`, params);
    //   let style = requestStyles.data.results;
    //   list.push(style);
    // }

    // for (let i = 0; i < set.length; i++) {
    //   set[i]['styles'] = list[i];
    // }

    // let prodList = [];

    // for(let i = 0; i < set.length; i++) {
    //   if (set[i].styles.length > 0 && set[i].styles[0].photos[0].thumbnail_url !== null) {
    //     prodList.push({
    //       url: set[i].styles[0].photos[0].url,
    //       thumbnail_url: set[i].styles[0].photos[0].thumbnail_url
    //     });
    //   }
    // }

    // get products based on page number



    // request.data.map((item => {
    //   set.push({
    //     id: item.id,
    //     name: item.name,
    //     slogan: item.slogan,
    //     description: item.description,
    //     category: item.category,
    //     default_price: item.default_price,
    //   })
    // }))





    // setProduct(set);
    // setCurrentProduct(set[0]);
    // if (set[0].styles.length > 0) {
    //   setCurrentPhoto(set[0].styles[0].photos[0].url);
    // } else {
    //   setCurrentPhoto(set[1].styles[0].photos[0].url);
    // }
    // setProductList(prodList);
    // setLoading(false);
  }

  const handleThumbClick = (e, item) => {
    setCurrentPhoto(e.target.id);
    //handleSelectedProduct(item.id);
    //setCurrentProduct(item);
  }
  const handleLeftClick = (e) => {
    for (let i = 0; i < product.styles.length; i++) {
      if (product.styles[i].photos[0].url === currentPhoto) {
        if (i > 0) {
          setCurrentPhoto(product.styles[i - 1].photos[0].url);
        }
      }
    }
  }
  const handleRightClick = (e) => {
    for (let i = 0; i < product.styles.length; i++) {
      if (product.styles[i].photos[0].url === currentPhoto) {
        if (i < (product.styles.length - 1)) {
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
    setCount(count + 1);
  }

  const handleUpClick = (e) => {
    if (count === 2) {
      setArrowUp(false);
      setCount(count - 1);
    } else {
      setCount(count - 1);
    }
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
    <OverviewProvider>
      <ImageGallery
        product={product}
        expand={expand}
        currentPhoto={currentPhoto}
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
        localName={localName}
        localId={localId}
        renderStars={renderStars}
        handleStyleClick={handleStyleClick}
        handleLocalClick={handleLocalClick}
        handleLocalSave={handleLocalSave}
      />
      <ProductOverview product={product} />
    </OverviewProvider>
  )

}


export default Overview;