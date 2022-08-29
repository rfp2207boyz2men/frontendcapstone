import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { FaBeer } from 'react-icons/fa';
import Parse from '../../parse.js';
import { OrbitSpinner } from 'react-epic-spinners';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import Carousel from 'react-bootstrap/Carousel';
import Modal from './Compare.jsx';
import StarRatings from 'react-star-ratings';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_info: {},
      product_styles: [],
      product_reviews: [],
      stars: 0,
      productCardLoad: false,
      mouseStarHover: false,
      showCompare: false
    };

    this.mouseHoverStar = this.mouseHoverStar.bind(this);
    this.mouseExitStar = this.mouseExitStar.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this)
    this.getAverage = this.getAverage.bind(this);
  }

  componentDidMount() {
    // Requests product info and product styles to use on the cards - card requires info from both
    Parse.getAll('products', `/${this.props.product_id}/`)
      .then((productInfo) => {
        this.setState({product_info: productInfo.data})
      })
      .then((data) => {
        Parse.getAll('products', `/${this.props.product_id}/styles`)
        .then((productStyles) => {
          this.setState({product_styles: productStyles.data.results})
        })
        .then((data) => {
          Parse.getAll('reviews', `?product_id=${this.props.product_id}`)
            .then((data) => {
              this.setState({product_reviews: data.data, productCardLoad: true, stars: this.getAverage(data.data.results)})
            })
        })
      })
  }

  getAverage(reviewsArray) {
    let ratings = reviewsArray.map(review => review.rating);
    let starRating = (ratings.reduce((total, rating) => total += rating, 0)/(ratings.length));
    return starRating
  }

  // hovering effect for comparison module
  mouseHoverStar() {
    this.setState({mouseStarHover: true})
  }

  // hovering effect for comparison module
  mouseExitStar(){
    this.setState({mouseStarHover: false})
  }

  // comparison module show/hide
  showModal(event){
    // stops overlapping clickable areas
    event.stopPropagation();
    this.setState({ showCompare: true });
  };

  // comparison module show/hide
  hideModal(){
    this.setState({ showCompare: false });
  };

  handleImageClick(event) {
    event.stopPropagation();
    this.props.select(this.state.product_info.id)
  }

  render() {
    return (
      <div>
        {this.state.showCompare ? <Modal show={this.state.showCompare} handleClose={this.hideModal} clicked={this.state.product_info} current={this.props.current}></Modal> : null}
      {this.state.productCardLoad
       ?
        <div className = 'productCard'>
        <div className = 'productCardImg' onClick={(event) =>{this.handleImageClick(event)}}>
          <img className = 'productImages' src={ this.state.product_styles[0].photos[0].thumbnail_url || `https://via.placeholder.com/150`}/>
          <div className = "starCard" onMouseEnter={this.mouseHoverStar} onMouseLeave={this.mouseExitStar} onClick={(event) => {this.showModal(event)}}>{this.state.mouseStarHover ? <TiStarFullOutline/> : <TiStarOutline />}</div>
        </div>
        <div>
          <div className = 'productCardDesc'>
          <div className = 'cardCat'>{this.state.product_info.category ? this.state.product_info.category.toUpperCase() : this.state.product_info.category}</div>
          <div className = 'cardName'><strong>{this.state.product_info.name}</strong></div>
          <div className = 'cardPrice'>{this.state.product_styles[this.state.product_styles.length-1].sale_price ? <div className="salePrice"> ${this.state.product_styles[this.state.product_styles.length - 1].sale_price} <div className="defaultPrice">${this.state.product_styles[this.state.product_styles.length-1].original_price}</div></div> : <div>${this.state.product_styles[this.state.product_styles.length - 1].original_price}</div>}</div>
          </div>
          <div className='productCardRating'>
          <StarRatings
            rating={this.state.stars}
            starRatedColor="teal"
            numberOfStars={5}
            starDimension='18px'
            starSpacing='3px'
            name='rating'/>
          </div>
        </div>
      </div>
      : <OrbitSpinner color="teal" />
      }
    </div>
    )
  }
}

export default ProductCard;