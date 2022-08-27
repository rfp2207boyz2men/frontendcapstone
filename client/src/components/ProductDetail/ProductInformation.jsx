import React from 'react';
import Star from './Star.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';

function ProductInformation ({selectedProduct, handleLocalClick, localName, styles, handleLocalSave}) {

    return (
      <div className='info-container'>
        <Star />
        <h4>{selectedProduct.category}</h4>
        <h2>{selectedProduct.name}</h2>
        <p>${selectedProduct.default_price}</p>
        <StyleSelector
        handleLocalClick={handleLocalClick}
        localName={localName}
        styles={styles} />
        <AddToCart handleLocalSave={handleLocalSave} />
      </div>
    )

}

export default ProductInformation;