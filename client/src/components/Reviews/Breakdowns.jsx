import React, { useState, useEffect, useContext } from 'react';

const Breakdowns = (props) => {

  let renderBars = () => {
    //Renders a bar for each star rating
    let ratingBars = [];
    let style;
    for (let i = 1; i <= 5; i++) {
      // style = {backgroundColor: props.clickedStar[i] ? 'teal' : 'transparent'};
      ratingBars.push(
        <div className={props.clickedStar[i] ? 'reviewBarSectionOn' : 'reviewBarSectionOff'} key={i} onClick={()=>props.handleClick(i)}>
          <p className='reviewBarLabel'><u>{i} stars</u></p>
          <div style={renderBarSize(i-1)} className='reviewBar'></div>
          <p>({props.ratings[i]})</p>
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