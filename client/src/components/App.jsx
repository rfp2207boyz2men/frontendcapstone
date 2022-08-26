import React, { useState, useEffect, useContext } from 'react';
import { FaBeer } from 'react-icons/fa';
import Parse from '../parse.js';
import axios from 'axios';
import Overview from './ProductDetail/Overview.jsx';
import Reviews from './Reviews/Reviews.jsx';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';
// import { BiLoaderCircle } from 'react-icons/bi';
import { AtomSpinner } from 'react-epic-spinners';
// import Related from './Related.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      reviewsData: [],
      reviews: [],
      cart: [],
      qanda: [],
      interactions: [],
      selectedProduct: '',
      loading: false
    };

    this.retrieveStorage = this.retrieveStorage.bind(this);
  }

  componentDidMount() {
    //Default to a random product
    let state = {};

    Parse.getAll(`products/`)
      .then((products) => {
        let defaultIndex = Math.floor(Math.random() * products.data.length);
        state.products = products.data;
        state.selectedProduct = products.data[defaultIndex];
        state.loading = true;
        return Parse.getAll(`reviews/`, `?product_id=${state.selectedProduct.id}`);
      })
      .then((reviews) => {
        state.reviewsData = reviews.data;
        state.reviews = reviews.data.results;
        return this.setState(state);
      })
      .catch((err) => console.log(err));



    //If desired, can set default to the first product (which may be hardcoded)
    // this.updateSelectedProduct(40344);
  };

  unloadComponents = (product_id) => {
    this.setState({ loading: false }, () => this.SelectedProduct(product_id))
  };

  updateSelectedProduct = (product_id) => {
    let state = {};
    let params = `?product_id=${product_id}`;

    Parse.getAll(`products/`, params)
      .then((products) => {
        let defaultIndex = Math.floor(Math.random() * products.data.length);
        state.products = products.data;
        state.selectedProduct = products.data[defaultIndex];
        state.loading = true;
        return Parse.getAll(`reviews/`, params);
      })
      .then((reviews) => {
        state.reviewsData = reviews.data;
        state.reviews = reviews.data.results;
        return this.setState(state);
      })
      .catch((err) => console.log(err));
  };

  retrieveStorage() {
    const str = localStorage.getItem('styles');
    return JSON.parse(str);
  }

  renderStars = (rating) => {
    let ratingCopy = rating;
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (ratingCopy >= 0 && ratingCopy < 0.33 || ratingCopy < 0) {
        stars.push(<TiStarOutline key = {i}/>);
      } else if (ratingCopy >= 0.33 && ratingCopy <= 0.67) {
        stars.push(<TiStarHalfOutline key = {i}/>);
      } else {
        stars.push(<TiStarFullOutline key = {i}/>);
      }
      ratingCopy--;
    }
    return stars;
  };

  //https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344
  //https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344&count=10

  render() {
    return (
      <div>
        {this.state.loading
        ?<div>
          <div className="header">
            <div><h1>Odin <FaBeer /></h1></div>
            <div><input></input></div>
          </div>
          <div>
            <Overview selectedProduct={this.state.selectedProduct}
            retrieveStorage={this.retrieveStorage}/>
          </div>
          <div>
            <>Tony</>
          </div>
          <div>
            <>Paul</>
          </div>
          <div>
            <Reviews
              selectedProduct={this.state.selectedProduct}
              reviews={this.state.reviews}
              renderStars={this.renderStars.bind(this)}
            />
          </div>
        </div>
        :<AtomSpinner color='green' />
        }
      </div>
    )
  }
}

export default App;