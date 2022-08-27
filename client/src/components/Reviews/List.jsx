import React, { useState, useEffect, useContext } from 'react';
import Tile from './Tile.jsx';
import Parse from '../../parse.js';
import { OrbitSpinner } from 'react-epic-spinners';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      showAmount: 2,
      initialized: false
    };
  }

  componentDidMount() {
    console.log(this.state);
    this.getReviews()
  }

  handleShowMore = () => {

  };

  getReviews = () => {
    let params = `?product_id=${this.props.selectedProduct.id}&count=${this.state.showAmount}`;
    Parse.getAll(`reviews/`, params)
    .then((reviews) => {
      return this.setState({
        reviews: reviews.data.results,
        initialized: true
      })
    })
  }

  render() {
    return (
      <div className='reviewsMainBar'>
        {this.state.initialized
        ?<div><div className='reviewList'>
          {this.state.reviews.map((review, index) => (
            <Tile
              review = {review}
              key = {index}
              index = {index}
              renderStars = {this.props.renderStars}
            />
          ))}
        </div>
        <div className='reviewExpandButtonSection'>
          {this.state.reviews.length
          && <button className='reviewExpandButton'>MORE REVIEWS</button>}
          <button  className='reviewExpandButton'>ADD A REVIEW +</button>
        </div></div>
        :<OrbitSpinner color='green'/>}
      </div>
    )
  }
}

export default List;