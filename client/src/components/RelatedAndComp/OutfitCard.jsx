import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { FaBeer } from 'react-icons/fa';
import Parse from '../../parse.js';
import { OrbitSpinner } from 'react-epic-spinners';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import Carousel from 'react-bootstrap/Carousel';


class OutfitCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productCardLoad: false,
      mouseStarHover: false
    };

    this.mouseHoverStar = this.mouseHoverStar.bind(this);
    this.mouseExitStar = this.mouseExitStar.bind(this)
  }

  componentDidMount() {

  }

  mouseHoverStar() {
    this.setState({mouseStarHover: true})
  }

  mouseExitStar(){
    this.setState({mouseStarHover: false})
  }

  render() {
    return (
      <div>
      {this.state.productCardLoad
       ?
        <div className = 'productCard'>
        <div className = 'productCardImg'>
          <img className = 'productImages' src={ this.props.products.product_styles[0].photos[0].thumbnail_url || `https://via.placeholder.com/150`}/>
          <div className = "starCard" onMouseEnter={this.mouseHoverStar} onMouseLeave={this.mouseExitStar}>{this.state.mouseStarHover ? <TiStarFullOutline/> : <TiStarOutline />}</div>
        </div>
        <div>
          <div className = 'productCardDesc'>
          <div className = 'cardCat'>{this.state.product_info.category}</div>
          <div className = 'cardName'><strong>{this.state.product_info.name}</strong></div>
          <div className = 'cardPrice'>{this.state.product_info.default_price}</div>
          </div>
          <div className = 'productCardRating'>
          <TiStarFullOutline className='star'/>
          <TiStarFullOutline className='star'/>
          <TiStarFullOutline className='star'/>
          <TiStarFullOutline className='star'/>
          <TiStarFullOutline className='star'/>
          </div>
        </div>
      </div>
      : null
      }
    </div>
    )
  }
}

export default OutfitCard;