import axios from 'axios';
import React from 'react';
import Parse from '../../parse.js';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import ProductOverview from './ProductOverview.jsx';

function Overview ({ styles, selectedProduct, handleLocalClick, handleLocalSave, localName }) {

    return (
      <div>
        <div className='main-container'>
          <ImageGallery styles={styles} />
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
    )

}


export default Overview;