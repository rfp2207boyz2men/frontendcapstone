import React, { useState, useEffect, useContext } from 'react';
import Tile from './Tile.jsx';
import Search from './Search.jsx';
import Sort from './Sort.jsx';
import { OrbitSpinner } from 'react-epic-spinners';
import InputOverlay from './InputOverlay.jsx';

const List = (props) => {
  const [overlay, setOverlay] = useState(false);

  const handleOverlay = () => {
    setOverlay(!overlay);
  };

  const renderHeader = () => {
    return (
      <div className='reviewListHeader'>
        <h3>{props.reviews.length} reviews, sorted by &nbsp;</h3>
        <h3><Sort sort={props.sort} onChange={props.onSortChange} /></h3>
        {props.slicedReviews.length > 0 && <h3>Currently showing {props.slicedReviews.length} {props.slicedReviews.length > 1 ? 'reviews.' : 'review.'}</h3>}
      </div>
    );
  };

  let styleAddReview = () => {
    let marginLeft;
    if (((props.filteredReviews.length - props.slicedReviews.length > 0) && props.reviews.length > 0)) {
      marginLeft = '0';
    } else {
      marginLeft = '127px';
    }
    return ({marginLeft: marginLeft});
  };

  let stylePlaceholders = {marginLeft: '10px', marginBottom: '832px'};

  return (
    <div className='reviewsMainBar'>
      {overlay &&
        <InputOverlay
          characteristics={props.characteristics}
          handleOverlay={handleOverlay}
          productName={props.productName}
          productId={props.productId}
          getReviews={props.getReviews}
          handleSubmit={props.handleSubmit}
        />
      }
      <Search onChange={props.onQueryChange} />
      {renderHeader()}
      {props.slicedReviews.length > 0 &&
        <div className='reviewList' data-testid='reviewList'>
        {props.slicedReviews.map((review, index) => (
          <Tile
            review={review}
            key={props.slicedReviews[index].review_id}
            index={index}
            renderStars={props.renderStars}
            getReviews={props.getReviews}
            handleReport={props.handleReport}
            searchQuery={props.searchQuery}
            data-testid='reviewListTiles'
          />
        ))}
      </div>
      }
      {props.reviews.length === 0 &&
        <h3 style={stylePlaceholders}>Help the Odin community by providing an answer!</h3>
      }
      {(props.reviews.length > 0 && props.slicedReviews.length === 0) &&
        <h3 style={stylePlaceholders}>No reviews found with the current search.</h3>
      }
      <div className='reviewExpandButtonSection'>
        {((props.filteredReviews.length - props.slicedReviews.length > 0) && props.reviews.length > 0)
          && <button className='reviewExpandButton' onClick={props.handleShowMore}>MORE REVIEWS</button>}
        <button style={styleAddReview()} className='reviewExpandButton' onClick={handleOverlay}>ADD A REVIEW +</button>
      </div>
    </div>
  )

};

export default List;