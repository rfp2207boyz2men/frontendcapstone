import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import List from './List.jsx';
import Tile from './Tile.jsx';
import SideBar from './SideBar.jsx';
import './ReviewsStyles.css';
import { OrbitSpinner } from 'react-epic-spinners';


const Reviews = (props) => {
  const [ratings, setRatings] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingPercentages, setRatingPercentages] = useState([]);
  const [averageRecommended, setAverageRecommended] = useState(0);
  const [characteristics, setCharacteristics] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let ratings = Object.values(props.metaData.ratings);
    let recommendations = props.metaData.recommended;

    let ratingPercentages = ratings.map((rating) => (rating / props.totalReviews) * 100);

    let totalRecommendations = parseInt(recommendations.false) + parseInt(recommendations.true);
    let averageRecommended = ((parseInt(recommendations.true) / totalRecommendations) * 100);

    setRatings(ratings);
    setRatingPercentages(ratingPercentages);
    setAverageRecommended(averageRecommended.toFixed(0));
    setCharacteristics(props.metaData.characteristics);
    setLoading(true);
    setInitialized(true);
  }, [initialized]);

  return(
    <div>
      {loading
      ?<div className='reviewMain'>
        <SideBar
          renderStars={props.renderStars}
          ratings={props.metaData.ratings}
          averageRating={props.averageRating}
          ratingPercentages={ratingPercentages}
          averageRecommended={averageRecommended}
          characteristics={characteristics}
        />
        <List
          // selectedProduct={props.selectedProduct}
          renderStars={props.renderStars}
          totalReviews={props.totalReviews}
          characteristics={characteristics}
          productName={props.productName}
          productId={props.productId}
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