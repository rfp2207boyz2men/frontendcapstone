import React, { useState, useEffect, useContext } from 'react';
import { VscTriangleDown } from 'react-icons/vsc';

const Characteristics = (props) => {

  let centralizeType = (type) => {
    //Reverse key/value to make it faster but probably harder to read
    let types = {
      accessory: ['Cap', 'Hat', 'Accessories', 'Sunglasses', 'Backpack', 'Socks'],
      clothes: ['Jackets', 'Romper', 'Suit', 'Tank top', 'Coat', 'Shirt', 'Hoodie',
               'Pants', 'Skirt', 'Sweatpants', 'Trousers', 'Slacks', 'Shorts'],
      shoes: ['Kicks', 'Dress shoes', 'Heels', 'Boots'],
    };

    for (let category in types) {

    }
  };

  return(
    <div>
      Hi!
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
