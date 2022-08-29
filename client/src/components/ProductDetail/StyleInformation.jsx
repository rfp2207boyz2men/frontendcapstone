import React, { useState, useEffect } from 'react';
import { OrbitSpinner } from 'react-epic-spinners';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';

function ProductInformation ({p1, currentProduct, handleLocalClick, localName, localId, styles, handleLocalSave}) {
  const [loading, setLoading] = useState(true);
  const [currentStyle, setCurrentStyle] = useState();
  const [currentSkus, setCurrentSkus] = useState([]);


  useEffect(() => {
    if(p1.length > 0) {
      setLoading(false);
    }
  }, [p1])

  useEffect(() => {
    let style = styles.filter((item => {
      return item.style_id === localId;
    }));
    setCurrentStyle(style[0]);
  }, [localId])


    return (
      <div>
         {!loading ?
        <div className='info-container'>
        <div>
          <TiStarFullOutline className='star' />
          <TiStarFullOutline className='star' />
          <TiStarFullOutline className='star' />
          <TiStarHalfOutline className='star' />
          <TiStarOutline className='star' />
          <a href=''>Read all reviews</a>
        </div>
        <h4>{currentProduct.category}</h4>
        <h2>{currentProduct.name}</h2>
        <p>${currentProduct.default_price}</p>
        <div>
      <div className='style-title'>
        <h4> STYLE > </h4>
        <h4>{localName}</h4>
      </div>
      <div className='style-container'>

        {styles.map(style => {
          let id = Math.random();
          return (
            <img key={id}
            id={style.style_id}
            name={style.name}
            onClick={handleLocalClick}
            src={style.photos[0].thumbnail_url} className='style-entry'></img>
          )
        })}

      </div>
    </div>

    <div className='add-container'>

      <select>
        <option value="0">SELECT SIZE</option>
        {currentStyle ?
            Object.values(currentStyle.skus).map((item => {
              let id = Math.random();
              return <option key={id}>{item.size}</option>
            }))
        :
            <div></div>
        }
      </select>

      <select>
        <option value="0">1</option>
        {currentStyle ?
            Object.values(currentStyle.skus).map((item => {
              let id = Math.random();
              return <option key={id}>{item.quantity}</option>
            }))
        :
            <div></div>
        }
      </select>

      <button>ADD TO CART</button>
      <button onClick={handleLocalSave}><TiStarFullOutline /></button>
    </div>

      </div>
          :
          <OrbitSpinner color="teal" />
          }
      </div>



    )

}

export default ProductInformation;