import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { FaBeer } from 'react-icons/fa';
import Parse from '../parse.js';
import axios from 'axios';
import Related from './RelatedAndComp/Related.jsx';
import Reviews from './Reviews/Reviews.jsx';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';
import { GiTriquetra } from 'react-icons/gi'
import { OrbitSpinner } from 'react-epic-spinners';
import { BsSearch } from 'react-icons/bs'

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
      .catch((err) => {
        console.log(err)
      })

    //If desired, can set default to the first product (which may be hardcoded)
    // this.updateSelectedProduct(40344);
  }

  unloadComponents = (product_id) => {
    this.setState({ loading: false }, () => this.SelectedProduct(product_id))
  }

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
      .catch((err) => {
        console.log(err)
      })
  };

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
         ? <div>
          <div className="header">
            <div className="logoheader"><div className="logotext"><h1>Odin</h1></div><div className="logo"><GiTriquetra /></div></div>
            <div><input className="search" placeholder="Search"></input></div>
          </div>
          <div>
            <>Manuel</>
          </div>
          <div className = 'relatedSection'>
            <Related selectedProduct={this.state.selectedProduct}/>
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
        : <div className = 'spinner'><OrbitSpinner color='teal' /></div>
        }
      </div>
    )
  }
}

export default App;