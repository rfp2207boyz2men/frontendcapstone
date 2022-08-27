import React, { useState, useEffect, useContext } from 'react';
import { VscTriangleDown } from 'react-icons/vsc';
import _ from 'underscore';

const Characteristics = (props) => {

  // let centralizeType = (type) => {
  //   //Reverse key/value to make it faster but probably harder to read
  //   let types = {
  //     accessory: ['Cap', 'Hat', 'Accessories', 'Sunglasses', 'Backpack', 'Socks'],
  //     clothes: ['Jackets', 'Romper', 'Suit', 'Tank top', 'Coat', 'Shirt', 'Hoodie',
  //              'Pants', 'Skirt', 'Sweatpants', 'Trousers', 'Slacks', 'Shorts'],
  //     shoes: ['Kicks', 'Dress shoes', 'Heels', 'Boots'],
  //   };

  //   for (let category in types) {

  //   }
  // };

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
    let width = (300 / count) - 0;
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
    // console.log('value ', value);
    // console.log('truevalue ', trueValue);
    // console.log('percentage ', percentage);
    // console.log('right ', right);
    return <div style={{position: 'relative', right: `${right}px`}}><VscTriangleDown /></div>
  };

  return(
    <div className='reviewSideCharacteristics'>
      {renderSection(props.characteristics)}
    </div>
  )

};

export default Characteristics;

/*              1            2             3            4             5
Size      Small           Small         Perfect       Big           Big     <-----  Middle
Width      Narrow         Narrow        Perfect       Wide        Wide      <----- Middle
Comfort   Uncomfy          Uncomfy        ok        Comfy         Comfy     <----- Right
Quality   Poor             Poor         Expected    Great         Perfect   <----- Right
Length     Short          Short         Perfect      Long         Long      <----- Middle
Fit      Tight            Tight         Perfect      Long         Long      <----- Middle
*/

/*
Current item categories found:
  Jackets
  Accessories (like glasses)
  Pants
  Kicks (shoes)
  Dress shoes
  Backpack
  Sunglasses
  Romper (shirt)
  Suit
  Cap
  Socks
  Tank top
  Skirt
  Hat
  Sweatpants
  Coat
  Sweater
  Heels
  Boots
  Trousers
  Shirt
  Slacks
  Hoodie
  Shorts
*/

/*
Categories characteristics:
  Accessory:
    Quality
  Clothes:
    Comfort
    Quality
    Length
    Fit
  Shoes:
    Size
    Width
    Comfort
    Quality
*/

/*
Final categories:
  Accessory:
    Cap
    Hat
    Accessories
    Sunglasses
    Backpack
    Socks
  Clothes:
    Jackets
    Romper
    Suit
    Tank top
    Coat
    Shirt
    Hoodie
    Pants
    Skirt
    Sweatpants
    Trousers
    Slacks
    Shorts
  Shoes:
    Kicks
    Dress shoes
    Heels
    Boots
*/
