import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import List from './List.jsx';
import Tile from './Tile.jsx';
import SideBar from './SideBar.jsx';
import { OrbitSpinner } from 'react-epic-spinners';

const Reviews = (props) => {

  const [ratingPercentages, setRatingPercentages] = useState([]);
  const [averageRecommended, setAverageRecommended] = useState(0);
  const [initialized, setInitialized] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [ratings, setRatings] = useState({});
  const [averageRating, setAverageRating] = useState(0);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [slicedReviews, setSlicedReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStars, setSearchStars] = useState({1:false, 2:false, 3:false, 4:false, 5:false});
  const [starFilter, setStarFilter] = useState(false);
  const [showAmount, setShowAmount] = useState(2);
  const [sort, setSort] = useState('relevant');

  useEffect(() => {
    console.log('REVIEWS PROCCED')
    let sort = localStorage.getItem('sort');
    let searchStars = JSON.parse(localStorage.getItem('searchStars'));
    let ratings = props.metaData.ratings;
    //If no star rating for the selecting product, set rating to 0
    for (let i = 1; i <= 5; i++) {
      if (!ratings[i]) {
        ratings[i] = 0;
      }
    }

    getSortedReviews(props.totalReviews, sort)
    .then((reviews) => {
      setSearchStars(searchStars);
      setStarFilter(enableFilter(searchStars));
      setSort(sort);
      setRatings(props.metaData.ratings);
      setAverageRating(props.averageRating);
      setRatingPercentages(getRatingPercentages(props.metaData.ratings));
      setAverageRecommended(getAverageRecommended(props.metaData.recommended));
      setTotalReviews(props.totalReviews);
      setReviews(reviews.data.results);
      let filteredReviews = filterReviews(reviews.data.results);
      setFilteredReviews(filteredReviews);
      setSlicedReviews(filteredReviews.slice(0, showAmount));
      setInitialized(true)
    })
    .catch((err) => console.log(err));
  }, []);

  const getSortedReviews = (totalReviews, sort) => {
    //Get reviews based on total reviews then the sort
    let params = `?product_id=${props.productId}&count=${totalReviews}&sort=${sort}`;
    return Parse.getAll(`reviews/`, params)
  };

  const getRatingPercentages = (ratings) => {
    let ratingValues = Object.values(ratings);
    return ratingValues.map((rating) => (rating / props.totalReviews) * 100);
  };

  const getAverageRecommended = (recommendations) => {
    let totalRecommendations = parseInt(recommendations.false) + parseInt(recommendations.true);
    return ((parseInt(recommendations.true) / totalRecommendations) * 100).toFixed(0);
  }


  const filterReviews = (reviews) => {
    //TODO: Set up highlighting (split text?)
    let filteredReviews = [];
    let starFilter = enableFilter(searchStars);

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

  const enableFilter = (searchStars) => {
    //Determine if no stars are clicked (renders as though all 5 are clicked)
    for (let star in searchStars) {
      if (searchStars[star]) {
        return true;
      }
    }
    return false;
  }

  const removeStarFilter = () => {
    localStorage.setItem('searchStars', JSON.stringify({1:false, 2:false, 3:false, 4:false, 5:false}));
    setSearchStars({1:false, 2:false, 3:false, 4:false, 5:false});
    setStarFilter(false);
  };

  const handleOnQueryChange = (e) => {
    if (e.target.value.length >= 3) {
      setSearchQuery(e.target.value);
    } else {
      setSearchQuery('');
    }
  };

  const handleStarClick = (value) => {
    localStorage.setItem('searchStars', JSON.stringify({...searchStars, [value]: !searchStars[value]}));
    let stars = ({...searchStars, [value]: !searchStars[value]})
    // setSearchStars((prevStars) => ({...prevStars, [value]: !searchStars[value]}));
    setSearchStars(stars);
    setStarFilter(enableFilter(stars));
  };

  const handleOnSortChange = (sort) => {
    localStorage.setItem('sort', sort);
    console.log(sort)
    getSortedReviews(totalReviews, sort)
    .then((reviews) => {
      setReviews(reviews.data.results);
      let filteredReviews = filterReviews(reviews.data.results);
      setFilteredReviews(filteredReviews);
      setSlicedReviews(filteredReviews.slice(0, showAmount));
      setSort(sort);
    })
    .catch((err) => console.log(err));
  };

  useEffect(() => {
    //If either stars or query change, filter reviews
    let filteredReviews = filterReviews(reviews);
    setFilteredReviews(filteredReviews);
    setSlicedReviews(filteredReviews.slice(0, showAmount));
  }, [searchStars, searchQuery])

  // useEffect(() => {
  //   console.log('SORT: ', sort);
  //   console.log('PROPS REVIEWS: ', props.totalReviews);
  //   //If the sort has changed, do another GET request with that sort parameter
  //   getSortedReviews();
  // }, [sort])

  const handleReport = (index) => {
    //Immediately render out reported review instead of doing a GET request
    let filteredReviewsCopy = filteredReviews.slice();
    filteredReviewsCopy.splice(index, 1);
    setFilteredReviews(filteredReviewsCopy);
    setSlicedReviews(filteredReviewsCopy.slice(0, showAmount));
  };

  const handleShowMore = () => {
    //Increased sliceReviews length by 2 reviews
    setSlicedReviews(filteredReviews.slice(0, showAmount + 2));
    setShowAmount(showAmount + 2);
  };

  const handleSubmitReview = () => {
    let params = `?product_id=${props.productId}`;
    let metaData;
    Parse.getAll(`reviews/meta/`, params)
    .then((meta) => {
      for (let i = 0; i <= 5; i++) {
        if (!meta.data.ratings[i]) {
          meta.data.ratings[i] = 0;
        }
      }
      metaData = meta.data;
      return getSortedReviews(totalReviews + 1, sort);
    })
    .then((reviews) => {
      setRatings(metaData.ratings);
      setAverageRating(props.getAverageRating(metaData.ratings));
      setRatingPercentages(getRatingPercentages(metaData.ratings));
      setAverageRecommended(getAverageRecommended(metaData.recommended));
      setTotalReviews(props.getTotalReviews(metaData.recommended));
      setReviews(reviews.data.results);
      let filteredReviews = filterReviews(reviews.data.results);
      setFilteredReviews(filteredReviews);
      setSlicedReviews(filteredReviews.slice(0, showAmount));
    })
    .catch((err) => console.log(err));
  };

  return(
    <div onClick={props.trackClick} data-testid='mainReviewPage'>
      {initialized
      ?<div className='reviewMain' data-testid='reviewMain'>
        <SideBar
          renderStars={props.renderStars}
          ratings={ratings}
          totalReviews={totalReviews}
          averageRating={averageRating}
          ratingPercentages={ratingPercentages}
          averageRecommended={averageRecommended}
          characteristics={props.metaData.characteristics}
          clickedStars={searchStars}
          handleClick={handleStarClick}
          starFilter={starFilter}
          removeStarFilter={removeStarFilter}
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
          handleSubmit={handleSubmitReview}
          searchQuery={searchQuery}
        />
      </div>
      :<OrbitSpinner color='green' />}
    </div>
  )
};

export default Reviews;