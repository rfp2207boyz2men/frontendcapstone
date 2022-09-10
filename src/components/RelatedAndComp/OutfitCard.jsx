import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import Parse from '../../parse.js';
import { OrbitSpinner } from 'react-epic-spinners';
import { AiFillCloseCircle } from 'react-icons/ai';

const OutfitCard = ({ product_id, removeApp, styleId, removeOutfit, starRender, carousel, left, right, placement }) => {
  const [productInfo, setProductInfo] = useState();
  const [productStyles, setProductStyles] = useState();
  const [stars, setStars] = useState(0);
  const [productLoad, setProductLoad] = useState(false);
  const [starHover, setStarHover] = useState(false);
  const [styleIndex, setStyleIndex] = useState(0);

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

  const handleClickRemove = () => {
    removeApp(productInfo.id);
    removeOutfit(productInfo.id);
  }

  const getAverageStars = (reviewsArray) => {
    let ratings = reviewsArray.map(review => review.rating);
    let starRating = (ratings.reduce((total, rating) => total += rating, 0)/(ratings.length));
    return starRating
  }

  let renderAvgStars = () => {
    return starRender(stars);
  };

  const findStyleIndex = (id) => {
    let index = productStyles.map(style => style.style_id).indexOf(id);
    if (index >= 0) {
      return index;
    }
    return 0;
  }

  const renderMask = () => {
    if (right.length >= 1 && placement === 2) {
      return {WebkitMaskImage: `-webkit-gradient(linear, right center, center center,
        from(rgba(0,0,0,0.2)), to(rgba(0,0,0,1)))`};
    }
  };

  return (
    <div>
      {
        productLoad ?
          <div style={renderMask()} className = 'productCard'>
            <div className = 'productCardImg'>
              <img className = 'productImages' src={productStyles[findStyleIndex(styleId)].photos[0].thumbnail_url || `https://via.placeholder.com/150`} alt='Outfit Card Image'/>
              <div className = "actionCard" onClick={handleClickRemove}><AiFillCloseCircle color='crimson'/></div>
            </div>
            <div>
              <div className = 'productCardDesc'>
                <div className = 'cardCat'>{productInfo.category}</div>
                <div className = 'cardName'><strong>{productInfo.name}</strong></div>
                <div className = 'cardPrice'>${productInfo.default_price}</div>
              </div>
              <div className = 'productCardRating'>
                {stars ? renderAvgStars() : null}
              </div>
            </div>
          </div>
        : null
      }
    </div>
  )
}

export default OutfitCard;
