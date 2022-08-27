import React, { useState, useEffect, useContext } from 'react';
import Tile from './Tile.jsx';
import Parse from '../../parse.js';
import { OrbitSpinner } from 'react-epic-spinners';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      showAmount: 0,
      initialized: false
    };
  }

  componentDidMount() {
    this.getReviews()
  }

  handleShowMore = () => {

  };

  getReviews = () => {
    let params = `?product_id=${this.props.selectedProduct.id}&count=${this.state.showAmount + 2}`;
    Parse.getAll(`reviews/`, params)
    .then((reviews) => {
      return this.setState({
        reviews: reviews.data.results,
        showAmount: this.state.showAmount + 2,
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
          {this.props.totalReviews - this.state.reviews.length > 0
          && <button className='reviewExpandButton' onClick={this.getReviews}>MORE REVIEWS</button>}
          <button className='reviewExpandButton'>ADD A REVIEW +</button>
        </div></div>
        :<OrbitSpinner color='green'/>}
      </div>
    )
  }
}

export default List;