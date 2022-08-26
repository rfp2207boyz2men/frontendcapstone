import React, { useState, useEffect, useContext } from 'react';

const Breakdowns = (props) => {

  let renderBars = () => {
    // if (props.ratingPercentages.length === 0) {
    //   return [];
    // }
    let ratingBars = [];
    for (let i = 0; i < 5; i++) {
      ratingBars.push(
        <div className='reviewBarSection' key={i}>
          <p className='reviewBarLabel'><u>{i+1} stars</u></p>
          <div style={renderBarSize(i, 'green')} className='reviewGreenBar reviewBar'></div>
          <div style={renderBarSize(i, 'gray')} className='reviewGrayBar reviewBar'></div>
          {/* <p>{props.ratingPercentages[i].toFixed(0)}</p>
          <p>{100 - props.ratingPercentages[i].toFixed(0)}</p> */}
        </div>
      )
    }
    return ratingBars;
  }

  let renderBarSize = (index, color) => {
    let barStyle = { width: '', backgroundColor: '' };
    //total size of bars should be 300px (tentative)
    if (color === 'green') {
      let width = 300 * (props.ratingPercentages[index]/100)
      barStyle.width = `${width}px`;
      barStyle.backgroundColor = 'green'
    } else {
      let width = 300 * (1 - (props.ratingPercentages[index]/100));
      barStyle.width = `${width}px`;
      barStyle.backgroundColor = 'gray';
    }
    return barStyle;
  };

  return (
    <div className='ratingBreakdown'>
      {renderBars().map((bar) => bar)}
    </div>
  )
};

export default Breakdowns;