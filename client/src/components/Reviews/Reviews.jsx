import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import List from './List.jsx';
import Tile from './Tile.jsx';
import SideBar from './SideBar.jsx';
import './ReviewsStyles.css';
import { OrbitSpinner } from 'react-epic-spinners';


const Reviews = (props) => {
  const [ratingPercentages, setRatingPercentages] = useState([]);
  const [averageRecommended, setAverageRecommended] = useState(0);
  const [initialized, setInitialized] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [slicedReviews, setSlicedReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStars, setSearchStars] = useState({1:false, 2:false, 3:false, 4:false, 5:false});
  const [starFilter, setStarFilter] = useState(false);
  const [showAmount, setShowAmount] = useState(2);
  const [sort, setSort] = useState('relevant');
  //MAKE SURE TO SET THIS DEFAULT TO 'relevant' UPON DELIVERING

  useEffect(() => {
    if (!localStorage.getItem('helpfulReviews')) {
      localStorage.setItem('helpfulReviews', JSON.stringify({}))
    }
    //This only gets the initial averages
    //  Should I update after adding a review?
    let ratings = Object.values(props.metaData.ratings);
    let recommendations = props.metaData.recommended;

    let ratingPercentages = ratings.map((rating) => (rating / props.totalReviews) * 100);

    let totalRecommendations = parseInt(recommendations.false) + parseInt(recommendations.true);
    let averageRecommended = ((parseInt(recommendations.true) / totalRecommendations) * 100);

    setRatingPercentages(ratingPercentages);
    setAverageRecommended(averageRecommended.toFixed(0));


    getSortedReviews();
  }, [initialized]);


  //FORK-IN-THE-ROAD MOMENT
  //  Upon changing sort...
  //  Reset reviewSlice to two?
  //  Do I keep the same?

  let getSortedReviews = () => {
    // console.log('sort: ', sorter)
    let params = `?product_id=${props.productId}&count=${props.totalReviews}&sort=${sort}`;
    return Parse.getAll(`reviews/`, params)
    .then((reviews) => {
      // console.log(reviews.data.results);
      //let reviews = reviews.data.results
      setReviews(reviews.data.results);
      let filteredReviews = filterReviews(reviews.data.results);
      setFilteredReviews(filteredReviews);
      setSlicedReviews(filteredReviews.slice(0, showAmount));
      setInitialized(true)
    });
  };

  let filterReviews = (reviews) => {
    //TODO: Set up highlighting (split text?)
    let filteredReviews = [];
    let starFilter = enableFilter();

    for (let review of reviews) {
      if (!starFilter) {
        if (review.body.toLowerCase().includes(searchQuery.toLowerCase())) {
          filteredReviews.push(review);
        }
      } else {
        if (searchStars[review.rating]) {
          if (review.body.toLowerCase().includes(searchQuery.toLowerCase())) {
            filteredReviews.push(review);
          }
        }
      }
    }
    return filteredReviews;
  };

  let enableFilter = () => {
    //Determine if no stars are clicked (renders as though all 5 are clicked)
    for (let star in searchStars) {
      if (searchStars[star]) {
        return true;
      }
    }
    return false;
  }

  let highlightText = () => {
    //Split review body to fit in spans that can highlight text
  };

  let handleOnQueryChange = (e) => {
    if (e.target.value.length >= 3) {
      setSearchQuery(e.target.value);
    } else {
      setSearchQuery('');
    }
  };

  let handleStarClick = (value) => {
    setSearchStars((prevStars) => ({...prevStars, [value]: !searchStars[value]}));
  };

  let handleOnSortChange = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    //If either stars or query change, filter reviews
    let filteredReviews = filterReviews(reviews);
    setFilteredReviews(filteredReviews);
    setSlicedReviews(filteredReviews.slice(0, showAmount));
  }, [searchStars, searchQuery])

  useEffect(() => {
    //If the sort has changed, do another GET request with that sort parameter
    getSortedReviews();
  }, [sort])

  let handleReport = (index) => {
    //Immediately render out reported review instead of doing a GET request
    let filteredReviewsCopy = filteredReviews.slice();
    filteredReviewsCopy.splice(index, 1);
    setFilteredReviews(filteredReviewsCopy);
    setSlicedReviews(filteredReviewsCopy.slice(0, showAmount));
  };

  let handleShowMore = () => {
    //Increased sliceReviews length by 2 reviews
    setSlicedReviews(filteredReviews.slice(0, showAmount + 2));
    setShowAmount(showAmount + 2);
  };

  return(
    <div>
      {initialized
      ?<div className='reviewMain'>
        <SideBar
          renderStars={props.renderStars}
          ratings={props.metaData.ratings}
          totalReviews={props.totalReviews}
          averageRating={props.averageRating}
          ratingPercentages={ratingPercentages}
          averageRecommended={averageRecommended}
          characteristics={props.metaData.characteristics}
          clickedStar={searchStars}
          handleClick={handleStarClick}
        />
        <List
          // selectedProduct={props.selectedProduct}
          reviews={reviews}
          renderStars={props.renderStars}
          totalReviews={props.totalReviews}
          characteristics={props.metaData.characteristics}
          productName={props.productName}
          productId={props.productId}
          handleShowMore={handleShowMore}
          filteredReviews={filteredReviews}
          slicedReviews={slicedReviews}
          sort={sort}
          getReviews={getSortedReviews}
          handleReport={handleReport}
          onQueryChange={handleOnQueryChange}
          onSortChange={handleOnSortChange}
        />
      </div>
      :<OrbitSpinner color='green' />}
    </div>
  )
};

export default Reviews;