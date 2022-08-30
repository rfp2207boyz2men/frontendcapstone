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
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [slicedReviews, setSlicedReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStars, setSearchStars] = useState({1:true, 2:true, 3:true, 4:true, 5:true});
  // const [starFilter, setStarFilter] = useState(false);
  const [showAmount, setShowAmount] = useState(2);
  const [sort, setSort] = useState('newest');

  useEffect(() => {
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
  //    Do I reset the reviewsSlice to only show 2 reviews?
  //    Do I keep the amount shown, but readjust how many are shown?
  //  Currently going with the latter...

  let getSortedReviews = (sorter) => {
    let params = `?product_id=${props.productId}&count=${props.totalReviews}&sort=${sorter ? sorter : sort}`;
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
    for (let review of reviews) {
      if (review.body.includes(searchQuery)) {
        if (searchStars[review.rating]) {
          filteredReviews.push(review);
        }
      }
    }
    return filteredReviews;
  };

  let handleOnChange = (e) => {
    console.log(e.target.value);
    if (e.target.value.length >= 3) {
      setSearchQuery(e.target.value);
    } else {
      setSearchQuery(e.target.value);
    }
  };

  let handleShowMore = () => {
    setSlicedReviews(reviews.slice(0, showAmount + 2));
    setShowAmount(showAmount + 2);
  };

  return(
    <div>
      {initialized
      ?<div className='reviewMain'>
        <SideBar
          renderStars={props.renderStars}
          ratings={props.metaData.ratings}
          averageRating={props.averageRating}
          ratingPercentages={ratingPercentages}
          averageRecommended={averageRecommended}
          characteristics={props.metaData.characteristics}
          clickedStar={searchStars}
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
        />
      </div>
      :<OrbitSpinner color='green' />}
    </div>
  )
};

export default Reviews;

/*

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: [],
      totalReviews: 0,
      averageRating: 0,
      ratingPercentages: [],
      averageRecommended: 0,
      loading: false,
    };
  }

  componentDidMount() {
    let state = {};
    let ratings = Object.values(this.props.metaData.ratings);
    let recommendations = this.props.metaData.recommended;

    let ratingPercentages = ratings.map((rating) => (rating / this.props.totalReviews) * 100);

    let totalRecommendations = parseInt(recommendations.false) + parseInt(recommendations.true);
    let averageRecommended = ((parseInt(recommendations.true) / totalRecommendations) * 100);

    state.ratings = ratings;
    state.ratingPercentages = ratingPercentages;
    state.averageRecommended = averageRecommended.toFixed(0);
    state.characteristics = this.props.metaData.characteristics;

    //total reviews
    state.loading = true;

    this.setState(state);
  };




  render() {

    return(
      <div>
        {this.state.loading
        ?<div className='reviewMain'>
          <SideBar
            renderStars={this.props.renderStars}
            ratings={this.props.metaData.ratings}
            averageRating={this.props.averageRating}
            ratingPercentages={this.state.ratingPercentages}
            averageRecommended={this.state.averageRecommended}
            characteristics={this.state.characteristics}
          />
          <List
            // selectedProduct={this.props.selectedProduct}
            renderStars={this.props.renderStars}
            totalReviews={this.props.totalReviews}
            characteristics={this.state.characteristics}
            productName={this.props.productName}
            productId={this.props.productId}
          />
        </div>
        :<OrbitSpinner color='green' />}
      </div>
    )
  }

};

export default Reviews;

*/