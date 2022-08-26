import React, { useState, useEffect, useContext } from 'react';

<<<<<<< HEAD
const Bars = (props) => {

  return (
    <div className='reviewsSide'>

=======
const SideBar = (props) => {

  let renderBars = () => {
    //props.ratingPercentages
    let ratingBars = [];
    for (let i = 0; i < 5; i++) {
      ratingBars.push(
        <div className='reviewBarSection'>
          <p className='reviewBarLabel'><u>{i+1} stars</u></p>
          <div style={renderBarSize(i, 'green')} className='reviewGreenBar reviewBar'></div>
          <div style={renderBarSize(i, 'gray')} className='reviewGrayBar reviewBar'></div>
        </div>
      )
    }
    console.log(ratingBars);
    return ratingBars;
  }

  let renderBarSize = (index, color) => {
    let barStyle = { width: '', backgroundColor: '' };
    //total size of bars should be 300px (tentative)
    if (color === 'green') {
      let width = 300 * (props.ratingPercentages[index]/100)
      // console.log(width);
      barStyle.width = `${width}px`;
      barStyle.backgroundColor = 'green'
      // console.log(barStyle)
    } else {
      let width = 300 * (1 - (props.ratingPercentages[index]/100));
      barStyle.width = `${width}px`;
      barStyle.backgroundColor = 'gray';
    }
    // barStyle.width = '200px';
    // barStyle.backgroundColor = 'green';
    return barStyle;
  };

  return (
    <div className='reviewSideBar'>
      <h2>RATINGS & REVIEWS</h2>
      <div className='averageRating'>
        <h1>{props.averageRating}</h1>
        {props.renderStars(props.averageRating)}
      </div>
      <div className='ratingPercentages'>
        <p>{props.averageRecommended}% of reviews recommend this product</p>
      </div>
      <div className='ratingBreakdown'>
        {renderBars().map((bar) => bar)}
      </div>
>>>>>>> 16adfd8068b146ab5fe2f8e242e053cc829aad42
    </div>
  );
};

<<<<<<< HEAD
export default Bars;
=======
export default SideBar;
>>>>>>> 16adfd8068b146ab5fe2f8e242e053cc829aad42
