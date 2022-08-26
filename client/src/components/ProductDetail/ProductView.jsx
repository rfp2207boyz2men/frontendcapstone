import React from 'react';
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti';
import { TiArrowMaximise } from 'react-icons/ti';

const ProductView = () => (
  <div>
    <div className='pv-container'>
      <TiArrowLeftThick className='arrow' />
      <img src="https://via.placeholder.com/500" alt="Product description" w></img>
      <TiArrowRightThick className='arrow' />
      <TiArrowMaximise className='expand' />
    </div>
  </div>
)

export default ProductView;