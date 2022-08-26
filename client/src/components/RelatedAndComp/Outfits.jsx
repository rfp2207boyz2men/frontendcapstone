import React, { useState, useEffect, useContext } from 'react';
import { FaBeer } from 'react-icons/fa';
import Parse from '../../parse.js';
import ProductCard from './ProductCard.jsx';
import Carousel from 'react-bootstrap/Carousel';
import OutfitCard from './OutfitCard.jsx';

class Outfits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitView: []
    };
  }

  componentDidMount() {
    let createOutfit = {};
    this.setState({outfitView: []})
  }

  render() {
    return (
      <div>
        <div><h1>OUTFIT</h1></div>
        <div>
          {this.props.outfits.length ? this.props.outfits.map(outfit => {
            return <OutfitCard />
          }) : null}
        </div>
      </div>
    )
  }
}

export default Outfits;