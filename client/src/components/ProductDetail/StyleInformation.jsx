import React, { useState, useEffect } from 'react';
import Parse from '../../parse';
import { OrbitSpinner } from 'react-epic-spinners';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';

function ProductInformation({
  product,
  currentStyle,
  renderStars,
  handleStyleClick,
  handleLocalClick,
  localName,
  localId,
  handleLocalSave,
}) {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product])

  let renderAvgStars = () => {
    return renderStars(product.averageRating).map((star => star))
  };

  // pending to use api to add to card
  async function addToCart(skusId) {
    let params;
    let data;
    const request = await Parse.create(`cart/`, params, skusId);
  }


  const relatedLink = (e) => {
    e.preventDefault();
    window.location.replace("/#related");
  }

  return (
    <div>
      {!loading ?
        <div className='info-container'>
          <div>
            {renderAvgStars()}
            <a href='' className='reviews' onClick={relatedLink}>Read all {product.totalReviews} reviews</a>
          </div>

          <h4>{product.category}</h4>
          {currentStyle ? <h2>{currentStyle.name}</h2> : <h2>{product.name}</h2>}
          {currentStyle ? <h2>${currentStyle.original_price}</h2> : <h2>${product.default_price}</h2>}

          <div>
            <div className='style-title'>
              <h4> STYLE > </h4>
              <h4>{currentStyle.name}</h4>
            </div>
            <div className='style-container'>

              {
                currentStyle.photos.map(item => {
                  let id = Math.random();
                  return (
                    <img key={id}
                      id={currentStyle.style_id}
                      name={currentStyle.name}
                      onClick={(e, url, prod) => {
                        handleLocalClick(e);
                        handleStyleClick(e, item.url, currentStyle);
                      }}
                      src={item.thumbnail_url} className='style-entry'></img>
                  )
                })}

            </div>
          </div>

          <div className='add-container'>

            <select>
              <option value="0">SELECT SIZE</option>
              {currentStyle &&
                Object.values(currentStyle.skus).map((item => {
                  let id = Math.random();
                  return <option key={id}>{item.size}</option>
                }))}
            </select>

            <select>
              <option value="0">1</option>
              {currentStyle &&
                Object.values(currentStyle.skus).map((item => {
                  let id = Math.random();
                  return <option key={id}>{item.quantity}</option>
                }))}
            </select>

            <button onClick={handleLocalSave}>ADD TO CART</button>
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