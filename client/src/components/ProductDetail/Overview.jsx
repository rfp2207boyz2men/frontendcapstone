import axios from 'axios';
import React, { useState, createContext, useContext, useEffect } from 'react';
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
  const [products, setProducts] = useState([]);
  const [styles, setStyles] = useState([]);
  const [productId, setProductId] = useState(0);
  const [currentPhoto, setCurrentPhoto] = useState('');
  const [currentStyles, setCurrentStyles] = useState([]);
  const [arrowDown, setArrowDown] = useState(true);
  const [arrowUp, setArrowUp] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let set = [];

    Parse.getAll(`products/`, '')
      .then((productData) => {
        productData.data.map((item => {
          set.push({
            id: item.id,
            name: item.name,
            slogan: item.slogan,
            description: item.description,
            category: item.category,
            default_price: item.default_price,
          })
        }))
      })
      .then(() => {
        for (let i = 0; i < set.length; i++) {
          Parse.getAll(`products/`, set[i].id)
          .then((productInfo) => {
            set[i]['features'] = productInfo.data.features;
          })
        }
      })
      .then(() => {
        for (let i = 0; i < set.length; i++) {
          let params = `${set[i].id}/styles`;
          Parse.getAll(`products/`, params)
          .then((stylesInfo) => {
            for (let x = 0; x < stylesInfo.data.results.length; x++) {
              set[i]['style_id'] = stylesInfo.data.results[x].style_id;
              set[i]['original_price'] = stylesInfo.data.results[x].original_price;
              set[i]['photos'] = stylesInfo.data.results[x].photos;
              set[i]['skus'] = stylesInfo.data.results[x].skus;
            }
          })
        }
      })
      setProducts(set);

    let params = `${selectedProduct.id}/styles`;
    Parse.getAll(`products/`, params)

    .then((stylesData) => {
      if (stylesData.data.results[0].photos[0].url === null) {
        if (selectedProduct.id === 40346) {
          selectedProduct.id++;
        } else {
          selectedProduct.id--;
        }
        params = `${selectedProduct.id}/styles`;
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

  const handleProductClick = (e) => {
    e.preventDefault();
  }

// test
  return (
    <OverviewProvider>
         {!loading ?
      <div>
        <div className='main-container'>
          <ImageGallery
          products={products}
          styles={styles}
          currentPhoto={currentPhoto}
          currentStyles={currentStyles}
          arrowDown={arrowDown}
          arrowUp={arrowUp}
          selectedProduct={selectedProduct}
          handleProductClick={handleProductClick}
          handleThumbClick={handleThumbClick}
          handleLeftClick={handleLeftClick}
          handleRightClick={handleRightClick}
          handleDownClick={handleDownClick}
          handleUpClick={handleUpClick}
          />
          <StyleInformation
          products={products}
          styles={styles}
          selectedProduct={selectedProduct}
          localName={localName}
          localId={localId}
          handleLocalClick={handleLocalClick}
          handleLocalSave={handleLocalSave}/>
        </div>
        <div>
          <ProductOverview
          products={products}
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