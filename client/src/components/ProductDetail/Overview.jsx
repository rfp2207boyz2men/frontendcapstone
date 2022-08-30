import axios from 'axios';
import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import Parse from '../../parse.js';
import { OrbitSpinner } from 'react-epic-spinners';
import { OverviewProvider } from './OverviewContext.js';
import ImageGallery from './ImageGallery.jsx';
import StyleInformation from './StyleInformation.jsx';
import ProductOverview from './ProductOverview.jsx';
import { select } from 'underscore';

function Overview ({
  selectedProduct,
  handleLocalClick,
  handleLocalSave,
  localName,
  localId
}) {
  const [p1, setP1] = useState([]);
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
  const styleThumbUrl = useRef();


  useEffect(() => {
    fetchData(count);
  }, [])

  async function fetchData(pageN) {
    setLoading(true);
    let set = [];
    const request =  await Parse.getAll(`products/`, `?page=${pageN}`);

    request.data.map((item => {
      set.push({
        id: item.id,
        name: item.name,
        slogan: item.slogan,
        description: item.description,
        category: item.category,
        default_price: item.default_price,
      })
    }))

    for (let i = 0; i < set.length; i++) {
        const requestFeatures = await Parse.getAll(`products/`, set[i].id);
        set[i]['slogan'] = requestFeatures.data.slogan;
        set[i]['features'] = requestFeatures.data.features;
    }

    let list = [];

    for (let i = 0; i < set.length; i++) {
      let params = `${set[i].id}/styles`;
      const requestStyles = await Parse.getAll(`products/`, params);
      let style = requestStyles.data.results;
      list.push(style);
  }

  for (let i = 0; i < set.length; i++) {
    set[i]['styles'] = list[i];
  }

  let prodList = [];

  for(let i = 0; i < set.length; i++) {
    if (set[i].styles.length > 0 && set[i].styles[0].photos[0].thumbnail_url !== null) {
      prodList.push({
        url: set[i].styles[0].photos[0].url,
        thumbnail_url: set[i].styles[0].photos[0].thumbnail_url
      });
    }

  }

  setP1(set);
  setCurrentProduct(set[0]);
  if (set[0].styles.length > 0) {
    setCurrentPhoto(set[0].styles[0].photos[0].url);
  } else {
    setCurrentPhoto(set[1].styles[0].photos[0].url);
  }
  setProductList(prodList);
  setLoading(false);
}

  const handleThumbClick = (e, item) => {
    setCurrentPhoto(e.target.id);
    setCurrentProduct(item);
  }
  const handleLeftClick = (e) => {
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].url === currentPhoto) {
        if (i > 0) {
          setCurrentPhoto(productList[i-1].url);
        }
      }
    }
  }
  const handleRightClick = (e) => {
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].url === currentPhoto) {
        if (i < (productList.length - 1)) {
          setCurrentPhoto(productList[i+1].url);
        }
      }
    }
  }

  useEffect(() => {
   fetchData(count);
  }, [count])

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
         {!loading ?
      <div>

        <div className='main-container'>

          {expand ?

            <div className='main-container'>
              <ImageGallery
              p1={p1}
              expand={expand}
              currentPhoto={currentPhoto}
              currentStyle={currentStyle}
              arrowDown={arrowDown}
              arrowUp={arrowUp}
              selectedProduct={selectedProduct}
              handleProductClick={handleProductClick}
              handleThumbClick={handleThumbClick}
              handleLeftClick={handleLeftClick}
              handleRightClick={handleRightClick}
              handleDownClick={handleDownClick}
              handleUpClick={handleUpClick}
              handleExpandedView={handleExpandedView}
              />
            </div>
          :
          <div className='main-container'>
            <ImageGallery
            p1={p1}
            expand={expand}
            currentPhoto={currentPhoto}
            currentStyle={currentStyle}
            arrowDown={arrowDown}
            arrowUp={arrowUp}
            selectedProduct={selectedProduct}
            handleProductClick={handleProductClick}
            handleThumbClick={handleThumbClick}
            handleLeftClick={handleLeftClick}
            handleRightClick={handleRightClick}
            handleDownClick={handleDownClick}
            handleUpClick={handleUpClick}
            handleExpandedView={handleExpandedView}
          />
            <StyleInformation
            p1={p1}
            currentProduct={currentProduct}
            currentStyle={currentStyle}
            styleThumbUrl={styleThumbUrl}
            localName={localName}
            localId={localId}
            handleStyleClick={handleStyleClick}
            handleLocalClick={handleLocalClick}
            handleLocalSave={handleLocalSave}/>
          </div>

          }

        </div>
        <div>
          <ProductOverview
          p1={p1}
          currentProduct={currentProduct}
          />
        </div>
      </div>
         :
         <OrbitSpinner color="teal" />
       }
    </OverviewProvider>
    )

}


export default Overview;