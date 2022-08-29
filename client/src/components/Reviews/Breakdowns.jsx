import React, { useState, useEffect, useContext } from 'react';

const Breakdowns = (props) => {

  let renderBars = () => {
    //Renders a bar for each star rating
    let ratingBars = [];
    for (let i = 0; i < 5; i++) {
      ratingBars.push(
        <div className='reviewBarSection' key={i}>
          <p className='reviewBarLabel'><u>{i+1} stars</u></p>
          <div style={renderBarSize(i)} className='reviewBar'></div>
          <p>({props.ratings[i+1]})</p>
        </div>
      )
    }
    return ratingBars;
  }

  let renderBarSize = (index) => {
    //Renders the green/gray proportion of the bar depending on the ratio of that star rating
    let background = {background: `linear-gradient(to right, green, green ${props.ratingPercentages[index]}%, gray ${props.ratingPercentages[index]}%)`};
    return background;
  };

  return (
    <div className='ratingBreakdown'>
      {renderBars().map((bar) => bar)}
    </div>
  )
};

export default Breakdowns;