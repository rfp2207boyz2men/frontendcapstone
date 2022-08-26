import React, { useState, useEffect, useContext } from 'react';
import Tile from './Tile.jsx';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className='reviewsMainBar'>
        <div className='reviewList'>
          {this.props.reviews.map((review, index) => (
            <Tile
              review = {review}
              key = {index}
              index = {index}
              renderStars = {this.props.renderStars}
            />
          ))}
        </div>
        <div className='reviewExpandButtonSection'>
          {this.props.reviews.length - this.state.reviewsShowClick > 2
          && <button className='reviewExpandButton'>MORE REVIEWS</button>}
          <button  className='reviewExpandButton'>ADD A REVIEW +</button>
        </div>
      </div>
    )
  }
}

export default List;