import React, { useState, useEffect, useContext } from 'react';
import Breakdowns from './Breakdowns.jsx';
import Characteristics from './Characteristics.jsx';

const SideBar = (props) => {

  return (
    <div className='reviewSideBar'>
      <h2>RATINGS & REVIEWS</h2>
      <div className='averageRating'>
        <h1>{props.averageRating}</h1>
        {props.renderStars(props.averageRating)}
        <p>Based on {props.totalReviews} reviews</p>
      </div>
      <div className='ratingPercentages'>
        <p>{props.averageRecommended}% of reviews recommend this product</p>
      </div>
      <Breakdowns
        ratings={props.ratings}
        ratingPercentages={props.ratingPercentages}
        clickedStars={props.clickedStars}
        handleClick={props.handleClick}
        starFilter={props.starFilter}
        removeStarFilter={props.removeStarFilter}
      />
      <Characteristics
        characteristics={props.characteristics}
      />
    </div>
  );
};

export default SideBar;