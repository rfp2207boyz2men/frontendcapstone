import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { FaBeer } from 'react-icons/fa';
import Parse from '../../parse.js';
import { OrbitSpinner } from 'react-epic-spinners';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import Carousel from 'react-bootstrap/Carousel';
import { AiOutlineCloseCircle } from 'react-icons/ai'

class OutfitCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_info: {},
      product_styles: [],
      productCardLoad: false,
      mouseStarHover: false
    };

    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  componentDidMount() {
    // Requests the data for product info and product styles for outfit product cards
    Parse.getAll('products', `/${this.props.product_id}/`)
    .then((productInfo) => {
      this.setState({product_info: productInfo.data})
    })
    Parse.getAll('products', `/${this.props.product_id}/styles`)
    .then((productStyles) => {
      this.setState({product_styles: productStyles.data.results, productCardLoad: true})
    })
  }

  handleClickRemove(){
    this.props.remove(this.state.product_info);
  }

  render() {
    return (
      <div>
      {this.state.productCardLoad
       ?
        <div className = 'productCard'>
        <div className = 'productCardImg'>
          <img className = 'productImages' src={ this.state.product_styles[0].photos[0].thumbnail_url || `https://via.placeholder.com/150`}/>
          <div className = "starCard" onClick={this.handleClickRemove}>
            <AiOutlineCloseCircle color='crimson'/>
          </div>
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

//onClick={this.props.remove(this.state.product_info)}