import React, { useState, useEffect, useContext } from 'react';
import { VscTriangleDown } from 'react-icons/vsc';
import _ from 'underscore';

const Characteristics = (props) => {

  let renderSection = (characteristics) => {
    let characteristicsFormat = [];
    for (let characteristic in characteristics) {
      let value = characteristics[characteristic].value;
      switch(characteristic) {
        case 'Size':
          characteristicsFormat.push(renderAggregate('Size', 3, value, ['Small', 'Perfect', 'Big']));
          break;
        case 'Width':
          characteristicsFormat.push(renderAggregate('Width', 3, value, ['Narrow', 'Perfect', 'Wide']));
          break;
        case 'Comfort':
          characteristicsFormat.push(renderAggregate('Comfort', 5, value, ['Poor', 'Perfect']));
          break;
        case 'Quality':
          characteristicsFormat.push(renderAggregate('Quality', 5, value, ['Poor', 'Perfect']));
          break;
        case 'Length':
          characteristicsFormat.push(renderAggregate('Length', 3, value, ['Short', 'Perfect', 'Long']));
          break;
        default:
          characteristicsFormat.push(renderAggregate('Fit', 3, value, ['Tight', 'Perfect', 'Long']));
          break;
      }
    }
    return characteristicsFormat.map((characteristic, index) => characteristic);
  };

  let renderAggregate = (label, count, value, barLabels) => {
    return (
      <div className = 'reviewCharacteristicSection'>
        {renderLabel(label)}
        <div className='reviewCharacteristicBarSection'>{renderBars(count)}</div>
        {renderArrow(value)}
        {renderBarLabels(barLabels)}
      </div>
    )
  };

  let renderLabel = (label) => {
    return <p className='reviewCharacteristicLabel'>{label}</p>
  };

  let renderBars = (count) => {
    let bars = [];
    let width = (300 / count) - 2;
    let style = { width: `${width}px` };
    for (let i = 0; i < count; i++) {
      bars.push(<div style={style} className='reviewCharacteristicBar' key={i}></div>)
    }
    return bars.map((bar) => bar);
  };

  let renderBarLabels = (belowLabels) => {
    return (
      <div className='reviewCharacteristicBarLabels'>
        {belowLabels.map((label) => <p key={label}>{label}</p>)}
      </div>
    )
  };

  let renderArrow = (value) => {
    //Initial position of arrow is 5px right from the bar
    //This should adjust the arrow to the appropriate position on the bar
    //  rating value is 1 - 5
    //  5 rating = right end of bar (0 px)
    //  1 rating = left end of bar (300 px)
    //  1 * (4 * 0.25)
    let trueValue = value - 1;
    let percentage = trueValue / 4;
    let right = 10 + (300 * (1 - percentage));
    return <div style={{position: 'relative', right: `${right}px`}}><VscTriangleDown /></div>
  };

  return(
    <div className='reviewSideCharacteristics'>
      {renderSection(props.characteristics)}
    </div>
  )

};

export default Characteristics;