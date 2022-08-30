import React, { useState, useEffect, useContext } from 'react';
import Tile from './Tile.jsx';
import Parse from '../../parse.js';
import { OrbitSpinner } from 'react-epic-spinners';
import InputOverlay from './InputOverlay.jsx';

const List = (props) => {
  const [reviews, setReviews] = useState([]);
  const [reviewsSlice, setReviewsSlice] = useState([]);
  const [showAmount, setShowAmount] = useState(2);
  const [sort, setSort] = useState('newest');
  const [initialized, setInitialized] = useState(false);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    getSortedReviews();
  }, [initialized]);

  //FORK-IN-THE-ROAD MOMENT
  //  Upon changing sort...
  //    Do I reset the reviewsSlice to only show 2 reviews?
  //    Do I keep the amount shown, but readjust how many are shown?
  //  Currently going with the former...

  let getSortedReviews = (sorter) => {
    let params = `?product_id=${props.productId}&count=${props.totalReviews}&sort=${sorter ? sorter : sort}`;
    return Parse.getAll(`reviews/`, params)
    .then((reviews) => {
      setReviews(reviews.data.results);
      setReviewsSlice(reviews.data.results.slice(0, showAmount));
      setInitialized(true)
    });
  };

  let handleShowMore = () => {
    setReviewsSlice(reviews.slice(0, showAmount + 2));
    setShowAmount(showAmount + 2);
  };

  let handleOverlay = () => {
    setOverlay(!overlay);
  };

  return (
    <div className='reviewsMainBar'>
      {overlay &&
        <InputOverlay
          characteristics={props.characteristics}
          handleOverlay={handleOverlay}
          productName={props.productName}
          productId={props.productId}
          getReviews={getSortedReviews}
        />}
      {initialized
      ?<div>
        <h3>There are {reviews.length} unreported reviews. Currently showing {reviewsSlice.length} reviews. Sorting by {sort}.</h3>
        <div className='reviewList'>
          {reviewsSlice.map((review, index) => (
            <Tile
              review={review}
              key={index}
              index={index}
              renderStars={props.renderStars}
              getReviews={getSortedReviews}
            />
          ))}
        </div>
        <div className='reviewExpandButtonSection'>
          {reviews.length - reviewsSlice.length > 0
          && <button className='reviewExpandButton' onClick={handleShowMore}>MORE REVIEWS</button>}
          <button className='reviewExpandButton' onClick={handleOverlay}>ADD A REVIEW +</button>
        </div>
      </div>
      :<OrbitSpinner color='green'/>}
    </div>
  )

};

export default List;