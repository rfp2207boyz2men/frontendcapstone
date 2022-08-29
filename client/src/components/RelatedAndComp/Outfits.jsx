import React, { useState, useEffect, useContext } from 'react';
import { FaBeer } from 'react-icons/fa';
import Parse from '../../parse.js';
import ProductCard from './ProductCard.jsx';
import Carousel from 'react-bootstrap/Carousel';
import OutfitCard from './OutfitCard.jsx';
import { OrbitSpinner } from 'react-epic-spinners';
import { BsPlusCircle } from 'react-icons/bs';


class Outfits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitView: [],
      addOutfitHover: false
    };

    this.handleOutfitClick = this.handleOutfitClick.bind(this);
  }

  componentDidMount() {
    this.setState({outfitView: this.props.outfits})
  }

  handleOutfitClick() {
    this.props.outfitAdd(this.props.current)
  }

  render() {
    return (
      <div>
        <div className='sectionTitle'><h2>YOUR OUTFIT</h2></div>
      <div className="carousel">
        <div className="outfits">
        <div className='productCard'>
        <div className='plusCardArea' onClick = {this.handleOutfitClick}>
          <div className='plusSymbol'><BsPlusCircle/></div>
        </div>
        <div>
          <div className='plusSymbolText'>
            <div><p>Add to Outfit</p></div>
          </div>
        </div>
      </div>
          {this.state.outfitView.length ? this.props.outfits.map(outfit => {
            return <OutfitCard key={outfit.id} product_id={outfit.id} remove={this.props.outfitRemove}/>
          }) : null}
        </div>
      </div>
      </div>
    )
  }
}

export default Outfits;