import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import Parse from '../../parse.js';
import { OrbitSpinner } from 'react-epic-spinners';
import { MdOutlineStar, MdOutlineStarOutline } from 'react-icons/md';
import ComparisonModal from './Compare.jsx';

const ProductCard = ({ product_id, addOutfit, select, current, avgStars, starRender, carousel, leftCarousel, rightCarousel, placement }) => {
  const [productInfo, setProductInfo] = useState({});
  const [productStyles, setProductStyles] = useState([]);
  const [stars, setStars] = useState(0);
  const [productLoad, setProductLoad] = useState(false);
  const [starHover, setStarHover] = useState(false);
  const [showCompare, setShowCompareModal] = useState(false);

  useEffect(() => {
    Promise.all([
      Parse.getAll('products', `/${product_id}/`),
      Parse.getAll('products', `/${product_id}/styles`),
      Parse.getAll('reviews', `?product_id=${product_id}`)
    ])
    .then((response) => {
      setProductInfo(response[0].data);
      setProductStyles(response[1].data.results);
      setStars(getAverageStars(response[2].data.results));
      setProductLoad(true);
    })
    .catch((err) => console.log(err));
  }, []);

  const getAverageStars = (reviewsArray) => {
    let ratings = reviewsArray.map(review => review.rating);
    let starRating = (ratings.reduce((total, rating) => total += rating, 0)/(ratings.length));
    return starRating
  }

  let renderAvgStars = () => {
    return starRender(stars);
  };

  const mouseHoverStar = () => {
    setStarHover(true);
  }

  const mouseExitStar = () => {
    setStarHover(false);
  }

  const showCompareModal = (event) => {
    event.stopPropagation();
    setShowCompareModal(true)
  };

  const hideCompareModal = () => {
    setShowCompareModal(false)
  };

  const handleImageClick = (event) => {
    event.stopPropagation();
    select(productInfo.id)
  }

  const renderMask = () => {
    if (leftCarousel.length >= 1 && placement === 0) {
      return {WebkitMaskImage: `-webkit-gradient(linear, left center, center center,
        from(rgba(0,0,0,0.2)), to(rgba(0,0,0,1)))`};
    }

    if (rightCarousel.length >= 1 && placement === 3) {
      return {WebkitMaskImage: `-webkit-gradient(linear, right center, center center,
        from(rgba(0,0,0,0.2)), to(rgba(0,0,0,1)))`};
    }
  };

  return (
    <div>
      {showCompare ? <ComparisonModal show={showCompare} handleClose={hideCompareModal} clicked={productInfo} current={current}></ComparisonModal> : null}
      {productLoad ?
        <div style={renderMask()} className='productCard'>
          <div className='productCardImg' onClick={(event) =>{handleImageClick(event)}}>
            <img className='productImages' src={productStyles[0].photos[0].thumbnail_url || `https://via.placeholder.com/150`} alt='Product Card Image'/>
            <div className='starCard' onMouseEnter={mouseHoverStar} onMouseLeave={mouseExitStar} onClick={(event) => {showCompareModal(event)}}>
              { starHover ? <MdOutlineStar/> : <MdOutlineStarOutline /> }
            </div>
          </div>
          <div>
            <div className='productCardDesc'>
              <div className='cardCat'>{productInfo.category ? productInfo.category.toUpperCase() : productInfo.category}</div>
              <div className='cardName'><strong>{productInfo.name}</strong></div>
              <div className='cardPrice'>
                {
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