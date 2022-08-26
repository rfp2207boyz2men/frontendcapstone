import React, { useState, useEffect, useContext } from 'react';
import Parse from '../../parse.js';
import Tile from './Tile.jsx';
import './ReviewsStyles.css';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsShowClick: 2,
      reviewsSlice: [],
      reviewsPage: 0,
      reviewsCount: 0,
      metaData: [],
    };
  }

  componentDidMount() {
    // /reviews/meta?product_id=#
    // gets metadata
    let state = {};
    let params = `?product_id=${this.props.selectedProduct.id}`

    // Parse.getAll(`reviews`, params)
    // .then((reviews) => console.log(reviews))

  };

  render() {
    return(
      <div className='reviewMain'>
        <div className='reviewList'>
          {this.props.reviews.map((review, index) => (
            <Tile
              review = {review}
              key = {index}
              index = {index}
              showClick = {this.state.reviewsShowClick}
            />
          ))}
        </div>
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