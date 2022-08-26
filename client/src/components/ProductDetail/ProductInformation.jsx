import React from 'react';
import Star from './Star.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';

const ProductInformation = ({ selectedProduct, handleClick }) => (
  <div className='info-container'>
    <Star />
    <h4>{selectedProduct.category}</h4>
    <h2>{selectedProduct.name}</h2>
    <p>${selectedProduct.default_price}</p>
    <StyleSelector />
    <AddToCart handleClick={handleClick} />
  </div>

)






export default ProductInformation;