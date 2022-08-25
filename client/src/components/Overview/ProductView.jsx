import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { BiExpandAlt } from 'react-icons/bi';

const ProductView = () => (
  <div>
    <div className='pv-container'>
      <FiArrowLeft className='arrow' />
      <img src="https://via.placeholder.com/500" alt="Product description" w></img>
      <FiArrowRight className='arrow' />
      <BiExpandAlt className='expand' />
    </div>
  </div>
)

export default ProductView;