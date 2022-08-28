import React, { useId } from 'react';
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
        {selectedProduct.features.map((item) => {
          let id = Math.random();
          return (
            <div key={id}>
              <p><TiTick/>{item.feature}</p>
              <p><TiTick/>{item.value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}


export default ProductOverview;