import React, { useState, useEffect, useId } from 'react';
import { OrbitSpinner } from 'react-epic-spinners';
import { FaFacebookSquare, FaTwitter, FaPinterest } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';

function ProductOverview  ({ p1, currentProduct }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(p1.length > 0) {
      setLoading(false);
    }
  }, [p1])

  return (
    <div>
      {!loading ?
      <div className='prodview-container'>

       <div className='prodview-text'>
        <h2>{currentProduct.slogan}</h2>
        <p>{currentProduct.description}</p>
        <div className='social'>
        <a href="https://www.facebook.com" target='_blank'><FaFacebookSquare /></a>
        <a href="https://www.twitter.com" target='_blank'><FaTwitter /></a>
        <a href="https://www.pinterest.com" target='_blank'><FaPinterest /></a>
        </div>
      </div>

      <div className='prodview-line'></div>
      <div>
        {currentProduct.features.map((item) => {
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
      :
      <OrbitSpinner color="teal" />
      }
    </div>
  )
}


export default ProductOverview;