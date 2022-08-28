import axios from 'axios';
import React, { useState, createContext, useContext, useEffect } from 'react';
import Parse from '../../parse.js';
import { OrbitSpinner } from 'react-epic-spinners';
import { OverviewProvider } from './OverviewContext.js';
import ImageGallery from './ImageGallery.jsx';
import StyleInformation from './StyleInformation.jsx';
import ProductOverview from './ProductOverview.jsx';

function Overview ({ selectedProduct, handleLocalClick, handleLocalSave, localName }) {
  const [styles, setStyles] = useState([]);
  const [productId, setProductId] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState('');
  const [currentStyles, setCurrentStyles] = useState([]);
  const [arrowDown, setArrowDown] = useState(true);
  const [arrowUp, setArrowUp] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let params = `${selectedProduct.id}/styles`;
    Parse.getAll(`products/`, params)
    .then((stylesData) => {
      if (stylesData.data.results[0].photos[0].url === null) {
        alert('had to request twice');
        params = `${selectedProduct.id++}/styles`;

        Parse.getAll(`products/`, params)
        .then((stylesData2) => {
          setStyles(stylesData2.data.results);
          setLoading(false);
        })

      } else {
        setProductId(stylesData.data.product_id);
        setStyles(stylesData.data.results);
        setLoading(false);
      }
    })
  }, [])

  useEffect(() => {
    if (!loading) {
      setCurrentPhoto(styles[0].photos[0].url);
      setCurrentStyles(styles[0].photos.slice(0,5));
    }
  }, [loading])

  const handleThumbClick = (e) => {
    setCurrentPhoto(e.target.id)
  }
  const handleLeftClick = (e) => {
    for (let i = 0; i < currentStyles.length; i++) {
      if (currentStyles[i].url === currentPhoto) {
        setCurrentPhoto(currentStyles[i-1].url);
      }
    }
  }
  const handleRightClick = (e) => {
    for (let i = 0; i < currentStyles.length; i++) {
      if (currentStyles[i].url === currentPhoto) {
        setCurrentPhoto(currentStyles[i+1].url);
      }
    }
  }

  const handleDownClick = (e) => {
    setArrowUp(true);
    setArrowDown(false);
    setCurrentStyles(styles[0].photos.slice(5,10));
  }

  const handleUpClick = (e) => {
    setArrowUp(false);
    setArrowDown(true);
    setCurrentStyles(styles[0].photos.slice(0,5));
  }


  return (
    <OverviewProvider>
         {!loading ?
      <div>
        <div className='main-container'>
          <ImageGallery
          loading={loading}
          styles={styles}
          currentPhoto={currentPhoto}
          currentStyles={currentStyles}
          arrowDown={arrowDown}
          arrowUp={arrowUp}
          selectedProduct={selectedProduct}
          handleThumbClick={handleThumbClick}
          handleLeftClick={handleLeftClick}
          handleRightClick={handleRightClick}
          handleDownClick={handleDownClick}
          handleUpClick={handleUpClick}
          />
          <StyleInformation
          styles={styles}
          selectedProduct={selectedProduct}
          localName={localName}
          handleLocalClick={handleLocalClick}
          handleLocalSave={handleLocalSave}/>
        </div>
        <div>
          <ProductOverview
          selectedProduct={selectedProduct}
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