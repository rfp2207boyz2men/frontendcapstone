import React, { useState, useEffect, useContext } from 'react';

const Breakdowns = (props) => {

  const renderBars = () => {
    let ratingBars = [];
    let style;
    for (let i = 1; i <= 5; i++) {
      ratingBars.push(
        <div className={props.clickedStars[i] ? 'reviewBarSectionOn' : 'reviewBarSectionOff'} key={i} onClick={() => props.handleClick(i)}>
          <p className='reviewBarLabel'>{i} stars</p>
          <div style={renderBarSize(i - 1)} className='reviewBar'></div>
          <p>({props.ratings[i]})</p>
        </div>
      )
    }
    return ratingBars;
  }

  const renderBarSize = (index) => {
    let background = { background: `linear-gradient(to right, teal, teal ${props.ratingPercentages[index]}%, gray ${props.ratingPercentages[index]}%)` };
    return background;
  };

  const renderFilterIndicator = () => {
    if (!props.starFilter) {
      return null;
    }

    let stars = [];
    for (let star in props.clickedStars) {
      if (props.clickedStars[star]) {
        stars.push(star);
      }
    }
    return (
      <>
        <div className='ratingStarIndicatorStars'>
          <p>Current Star Filters:</p>
          {stars.map((star, index) => <p key={index}>{star}</p>)}
        </div>
        <p className='ratingsRemoveStarFilter' onClick={props.removeStarFilter}><u>Remove all star filters</u></p>
      </>
    )
  }

  return (
    <>
      <div className='ratingBreakdown'>
        {renderBars().map((bar) => bar)}
      </div>
      <div className='ratingStarIndicator'>
        {renderFilterIndicator()}
      </div>
    </>
  )
};

export default Breakdowns;