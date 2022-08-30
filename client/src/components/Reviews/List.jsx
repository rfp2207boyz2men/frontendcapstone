import React, { useState, useEffect, useContext } from 'react';
import Tile from './Tile.jsx';
import Search from './Search.jsx';
import Sort from './Sort.jsx';
import { OrbitSpinner } from 'react-epic-spinners';
import InputOverlay from './InputOverlay.jsx';

const List = (props) => {
  const [overlay, setOverlay] = useState(false);

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
          getReviews={props.getReviews}
        />}
      <div className='reviewListHeader'>
        <h3>
          There are {props.reviews.length} unreported reviews.
          Currently showing {props.slicedReviews.length} reviews.
          Sorting by <span>{props.sort}.</span>
        </h3>
        Sort by:<Sort onChange={props.onSortChange} />
        <Search onChange={props.onQueryChange} />
      </div>
      <div className='reviewList'>
        {props.slicedReviews.map((review, index) => (
          <Tile
            review={review}
            key={index}
            index={index}
            renderStars={props.renderStars}
            getReviews={props.getReviews}
          />
        ))}
      </div>
      <div className='reviewExpandButtonSection'>
        {props.filteredReviews.length - props.slicedReviews.length > 0
        && <button className='reviewExpandButton' onClick={props.handleShowMore}>MORE REVIEWS</button>}
        <button className='reviewExpandButton' onClick={handleOverlay}>ADD A REVIEW +</button>
      </div>
    </div>
  )

};

export default List;