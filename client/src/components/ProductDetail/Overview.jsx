import axios from 'axios';
import React, { useState, createContext, useContext } from 'react';
import Parse from '../../parse.js';
import { OverviewProvider } from './OverviewContext.js';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import ProductOverview from './ProductOverview.jsx';

function Overview ({ selectedProduct, handleLocalClick, handleLocalSave, localName }) {

  useEffect(() => {
    let params = `${selectedProduct.id}/styles`;
    Parse.getAll(`products/`, params)
    .then((stylesData) => {
      setStyles(stylesData.data);
    })
  }, [])

  return (
    <OverviewProvider>
      <div>
        <div className='main-container'>
          <ImageGallery selectedProduct={selectedProduct} />
          <ProductInformation selectedProduct={selectedProduct} styles={styles}
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
    </OverviewProvider>
    )

}


export default Overview;