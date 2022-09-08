import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import Parse from '../../parse.js';
import { OrbitSpinner } from 'react-epic-spinners';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import Modal from './Compare.jsx';

const ProductCard = ({ product_id, addOutfit, select, current, avgStars, starRender }) => {
  const [productInfo, setProductInfo] = useState({});
  const [productStyles, setProductStyles] = useState([]);
  const [stars, setStars] = useState(0);
  const [productLoad, setProductLoad] = useState(false);
  const [starHover, setStarHover] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    Parse.getAll('products', `/${product_id}/`)
      .then((productInfo) => {
        setProductInfo(productInfo.data)
      })
      .then((data) => {
        Parse.getAll('products', `/${product_id}/styles`)
        .then((productStyles) => {
          console.log(productStyles.data.results)
          setProductStyles(productStyles.data.results)
        })
        .then((data) => {
          Parse.getAll('reviews', `?product_id=${product_id}`)
            .then((reviewsData) => {
              setStars(getAverage(reviewsData.data.results))
            })
            .then((data) => {
              setProductLoad(true);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }, [])

  // Function which takes in array of reviews for product, parses into a rating
  const getAverage = (reviewsArray) => {
    let ratings = reviewsArray.map(review => review.rating);
    let starRating = (ratings.reduce((total, rating) => total += rating, 0)/(ratings.length));
    return starRating
  }

  let renderAvgStars = () => {
    return starRender(stars).map((star => star))
  };

  // hovering effect for comparison module
  const mouseHoverStar = () => {
    setStarHover(true);
  }

  // hovering effect for comparison module
  const mouseExitStar = () => {
    setStarHover(false);
  }

  // comparison module show/hide
  const showModal = (event) => {
    // stops overlapping clickable areas
    event.stopPropagation();
    setShowCompare(true)
  };

  // comparison module show/hide
  const hideModal = () => {
    setShowCompare(false)
  };

  const handleImageClick = (event) => {
    event.stopPropagation();
    select(productInfo.id)
  }

  return (
    <div>
      {/*Comparison Modal Condtionally Rendered Upon Click*/}
      {showCompare ? <Modal show={showCompare} handleClose={hideModal} clicked={productInfo} current={current}></Modal> : null}
      {/*Related Section Condtionally Rendered Upon Initialization*/}
      {productLoad ?
        <div className='productCard'>
          <div className='productCardImg' onClick={(event) =>{handleImageClick(event)}}>
            <img className='productImages' src={productStyles[0].photos[0].thumbnail_url || `https://via.placeholder.com/150`} alt='Product Card Image'/>
            <div className='starCard' onMouseEnter={mouseHoverStar} onMouseLeave={mouseExitStar} onClick={(event) => {showModal(event)}}>
              { /* Show interaction with action button to show comparison modal */
                starHover ? <TiStarFullOutline/> : <TiStarOutline />
              }
            </div>
          </div>
          <div>
            <div className='productCardDesc'>
              <div className='cardCat'>{productInfo.category ? productInfo.category.toUpperCase() : productInfo.category}</div>
              <div className='cardName'><strong>{productInfo.name}</strong></div>
              <div className='cardPrice'>
                { /* Card Pricing Conditional - if sale price exists, render it, else render original price */
                  productStyles[productStyles.length-1].sale_price ?
                  <div className='salePrice'>
                    ${productStyles[productStyles.length-1].sale_price} <div className='defaultPrice'>${productStyles[productStyles.length-1].original_price}</div>
                  </div>
                  : <div>${productStyles[productStyles.length - 1].original_price}</div>
                }
              </div>
            </div>
          <div className='productCardRating'>
            {stars ? renderAvgStars() : null}
          </div>
        </div>
      </div>
      : <div className="cardLoader"><OrbitSpinner color='burlywood' className='cardSpinner'/></div>
      }
    </div>
  )
}

export default ProductCard;