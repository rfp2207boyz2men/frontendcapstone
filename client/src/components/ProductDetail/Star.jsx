import React from 'react';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';

function ProductView () {
  return (
    <div>
      <TiStarFullOutline className='star' />
      <TiStarFullOutline className='star' />
      <TiStarFullOutline className='star' />
      <TiStarHalfOutline className='star' />
      <TiStarOutline className='star' />
      <a href=''>Read all reviews</a>
    </div>
  )
}



export default ProductView;