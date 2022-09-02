import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import Parse from '../../parse.js';
import { OrbitSpinner } from 'react-epic-spinners';
import { AiFillCloseCircle } from 'react-icons/ai';
import StarRatings from 'react-star-ratings';

const OutfitCard = ({ product_id, removeApp, styleId, removeOutfit }) => {
  const [productInfo, setProductInfo] = useState();
  const [productStyles, setProductStyles] = useState();
  const [stars, setStars] = useState(0);
  const [productLoad, setProductLoad] = useState(false);
  const [starHover, setStarHover] = useState(false);
  const [styleIndex, setStyleIndex] = useState(0);

  // On load, get all data to be used on cards and render
  useEffect(() => {
    Parse.getAll('products', `/${product_id}/`)
    .then((productData) => {
      setProductInfo(productData.data)
    })
    .then((data) => {
      Parse.getAll('products', `/${product_id}/styles`)
      .then((stylesData) => {
        setProductStyles(stylesData.data.results)
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
  }, []);

  // Remove outfit from outfits event handler, calls from App
  const handleClickRemove = () => {
    removeApp(productInfo.id);
    removeOutfit(productInfo.id);
  }

  // Function which takes in array of reviews for product, parses into a rating
  const getAverage = (reviewsArray) => {
    let ratings = reviewsArray.map(review => review.rating);
    let starRating = (ratings.reduce((total, rating) => total += rating, 0)/(ratings.length));
    return starRating
  }

  // Function to find index of selected style for photos
  const findIndex = (id) => {
    let index = productStyles.map(style => style.style_id).indexOf(id);
    if (index >= 0) {
      return index;
    }
    return 0;
  }

  return (
    <div>
      {
        productLoad ?
          <div className = 'productCard'>
            <div className = 'productCardImg'>
              <img className = 'productImages' src={productStyles[findIndex(styleId)].photos[0].thumbnail_url || `https://via.placeholder.com/150`}/>
              <div className = "actionCard" onClick={handleClickRemove}><AiFillCloseCircle color='crimson'/></div>
            </div>
            <div>
              <div className = 'productCardDesc'>
                <div className = 'cardCat'>{productInfo.category}</div>
                <div className = 'cardName'><strong>{productInfo.name}</strong></div>
                <div className = 'cardPrice'>${productInfo.default_price}</div>
              </div>
              <div className = 'productCardRating'>
                {
                stars > 0 ?
                <StarRatings
                  rating={stars}
                  starRatedColor="burlywood"
                  numberOfStars={5}
                  starDimension='18px'
                  starSpacing='3px'
                  name='rating'/>
                  : null
                }
              </div>
            </div>
          </div>
        : null
      }
    </div>
  )
}

export default OutfitCard;
