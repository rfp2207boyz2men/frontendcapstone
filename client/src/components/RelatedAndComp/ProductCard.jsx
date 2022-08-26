import React, { useState, useEffect, useContext } from 'react';
import { FaBeer } from 'react-icons/fa';
import Parse from '../../parse.js';
import { BiLoaderCircle } from 'react-icons/bi';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti'



class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_info: {},
      product_styles: [],
      productCardLoad: false
    };
  }

  componentDidMount() {
    Parse.getAll('products', `/${this.props.product_id}/`)
      .then((productInfo) => {
        this.setState({product_info: productInfo.data})
      })
    Parse.getAll('products', `/${this.props.product_id}/styles`)
      .then((productStyles) => {
        this.setState({product_styles: productStyles.data.results, productCardLoad: true})
        console.log(this.state.product_info)
      })
  }

  render() {
    return (
      <div>
      {this.state.productCardLoad
       ? <div>
      <div className = 'productCard'>
        <div className = 'productCardImg'>
          <img className = 'productImages' src={ this.state.product_styles[0].photos[0].thumbnail_url || `https://via.placeholder.com/150`}/>
          <div className = "starCard"><TiStarOutline /></div>
        </div>
        <div>
          <div  className = 'productCardDesc'>
          <div className = 'cardCat'>{this.state.product_info.category}</div>
          <div className = 'cardName'><strong>{this.state.product_info.name}</strong></div>
          <div className = 'cardPrice'>{this.state.product_info.default_price}</div>
          </div>
          <div className = 'productCardRating'>
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />
          </div>
        </div>
      </div>
      </div>
      :<BiLoaderCircle />
      }
    </div>
    )
  }
}

export default ProductCard;