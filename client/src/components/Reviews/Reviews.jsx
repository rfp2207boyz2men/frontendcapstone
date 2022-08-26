import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import List from './List.jsx';
import Tile from './Tile.jsx';
import SideBar from './SideBar.jsx';
import './ReviewsStyles.css';
import { OrbitSpinner } from 'react-epic-spinners';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsShowClick: 2,
      reviewsSlice: [],
      ratings: [],
      totalReviews: 0,
      averageRating: 0,
      ratingPercentages: [],
      averageRecommended: 0,
      reviewsPage: 0,
      reviewsCount: 0,
      metaData: [],
      loading: false,
    };
  }

  componentDidMount() {
    // /reviews/meta?product_id=#
    // gets metadata
    let state = {};
    let params = `?product_id=${this.props.selectedProduct.id}`

    Parse.getAll(`reviews/meta`, params)
      .then((meta) => {
        let data = meta.data;

        let ratings = Object.values(data.ratings);
        let totalRatings = ratings.reduce((prev, cur) => prev + parseInt(cur), 0);
        let ratingStrengths = ratings.map((rating, index) => rating * (index + 1));
        let averageRatingTotal = (ratingStrengths.reduce((prev, cur) => prev + cur, 0)) / totalRatings;
        let ratingPercentages = ratings.map((rating) => (rating / totalRatings) * 100);

        let recommendations = data.recommended;
        let totalRecommendations = parseInt(recommendations.false) + parseInt(recommendations.true);
        let averageRecommended = ((parseInt(recommendations.true) / totalRecommendations) * 100);

        state.ratings = ratings;
        state.averageRating = averageRatingTotal.toFixed(1);
        state.ratingPercentages = ratingPercentages;
        state.averageRecommended = averageRecommended.toFixed(0);
        state.totalReviews = totalRatings;
        state.characteristics = data.characteristics;
        state.loading = true;

        this.setState(state);
      })
      .catch((err) => console.log(err));

  };




  render() {
    //tentative widths, fix later
    let widenAdd = {
      width: this.props.reviews.length - this.state.reviewsShowClick > 2 ? '20%' : '50%'
    };

    return(
      <div>
        {this.state.loading
        ?<div className='reviewMain'>
          <SideBar
            renderStars = {this.props.renderStars}
            ratings = {this.state.ratings}
            averageRating = {this.state.averageRating}
            ratingPercentages = {this.state.ratingPercentages}
            averageRecommended = {this.state.averageRecommended}
            characteristics = {this.state.characteristics}
          />
          <List
            reviews = {this.props.reviews}
            renderStars = {this.props.renderStars}
            reviewsShowClick = {this.props.reviewsShowClick}
          />
        </div>
        :<OrbitSpinner color='green' />}
      </div>
    )
  }

};

export default Reviews;

/*
Display list of reviews

*/

/*
{
    "product_id": "40344",
    "ratings": {
        "1": "84",
        "2": "98",
        "3": "234",
        "4": "186",
        "5": "394"
    },
    "recommended": {
        "false": "240",
        "true": "756"
    },
    "characteristics": {
        "Fit": {
            "id": 135219,
            "value": "3.2874806800618238"
        },
        "Length": {
            "id": 135220,
            "value": "3.3386075949367089"
        },
        "Comfort": {
            "id": 135221,
            "value": "3.2456747404844291"
        },
        "Quality": {
            "id": 135222,
            "value": "3.2303839732888147"
        }
    }
}
*/