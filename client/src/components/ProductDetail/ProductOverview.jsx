import React from 'react';
import { TiTick } from 'react-icons/ti';

function ProductOverview  ({ selectedProduct }) {

  return (
    <div className='prodview-container'>
      <div className='prodview-text'>
        <h2>{selectedProduct.slogan}</h2>
        <p>{selectedProduct.description}</p>
      </div>
      <div className='prodview-line'></div>
      <div>
        <p><TiTick />GMO</p>
        <p><TiTick />Made with 100% Generic Salt</p>
        <p><TiTick />Can cause itches</p>
        <p><TiTick />Or not</p>
      </div>
    </div>
  )
}


export default ProductOverview;