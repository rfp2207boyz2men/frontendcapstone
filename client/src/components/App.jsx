import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { FaBeer } from 'react-icons/fa';
import Parse from '../parse.js';
import axios from 'axios';
import Related from './RelatedAndComp/Related.jsx';
import Overview from './ProductDetail/Overview.jsx';
import Reviews from './Reviews/Reviews.jsx';
import QandA from './QandA/QandA.jsx';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';
import { GiTriquetra } from 'react-icons/gi'
import { OrbitSpinner } from 'react-epic-spinners';
import { BsSearch } from 'react-icons/bs'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      outfits: [],
      styles: [],
      localName: 'No style selected',
      localId: 0,
      reviewsData: [],
      metaData: {},
      averageRating: 0,
      totalReviews: 0,
      cart: [],
      qanda: [],
      interactions: [],
      selectedProduct: '',
      loading: false
    };

    this.handleLocalClick = this.handleLocalClick.bind(this);
    this.handleLocalSave = this.handleLocalSave.bind(this);
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
      return Parse.getAll(`reviews/meta/`, `?product_id=${state.selectedProduct.id}`);
    })
    .then((meta) => {
      state.metaData = meta.data;
      state.averageRating = this.getAverageRating(meta.data.ratings)
      state.totalReviews = this.getTotalRating(meta.data.recommended)
      return this.setState(state);
    })
    .then(() => {
      this.retrieveStorage();
      this.retrieveStyles();
    })
    .catch((err) => console.log(err));

  }
  //https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/productsundefined
  //https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews:40348?count=10


    //If desired, can set default to the first product (which may be hardcoded)
    // this.updateSelectedProduct(40344);
  getAverageRating = (ratings) => {
    let ratingValues = Object.values(ratings);
    let totalRatings = ratingValues.reduce((prev, cur) => prev + parseInt(cur), 0);
    let ratingStrengths = ratingValues.map((rating, index) => rating * (index + 1));
    let averageRatingTotal = (ratingStrengths.reduce((prev, cur) => prev + cur, 0)) / totalRatings;
    return averageRatingTotal.toFixed(1);
  };

  getTotalRating = (recommended) => {
    let recommendValues = Object.values(recommended);
    let totalRecommended = recommendValues.reduce((prev, cur) => prev + parseInt(cur), 0);
    return totalRecommended;
  };

  unloadComponents = (product_id) => {
    this.setState({ loading: false }, () => this.SelectedProduct(product_id))
  };

  updateSelectedProduct = (product_id) => {
    let state = {};
    let params = `?product_id=${product_id}`;

    Parse.getAll(`products/`)
      .then((products) => {
        let defaultIndex = Math.floor(Math.random() * products.data.length);
        state.products = products.data;
        state.selectedProduct = products.data[defaultIndex];
        state.loading = true;
        return Parse.getAll(`reviews/meta/`, params);
      })
      .then((meta) => {
        state.metaData = meta.data;
        state.averageRating = this.getAverageRating(meta.data.ratings)
        state.totalRating = this.getTotalRating(meta.data.recommended)
        return this.setState(state);
      })
      .catch((err) => console.log(err));
  }

  retrieveStyles() {
    let state = {};
    let params = `${this.state.selectedProduct.id}/styles`;

    Parse.getAll(`products/`, params)
    .then((styles) => {
      state.styles = styles.data.results;
      return this.setState(state);
    })
  }

  retrieveStorage() {
    const storage = { ...localStorage };
    for (let key in storage) {
      this.setState({
        outfits: [...this.state.outfits, JSON.parse(storage[key])]
      })
    }
  }

  handleLocalClick(e) {
    e.preventDefault();
    this.setState({
      localName: e.target.name,
      localId: parseInt(e.target.id),
    })
  }


  handleLocalSave(e) {
    e.preventDefault();
      let styleObj = this.state.styles.filter((style => {
        return style.style_id === this.state.localId;
      }));

      if (!localStorage.getItem(this.state.localName)) {
        const jsonObj = JSON.stringify(styleObj);
        localStorage.setItem(this.state.localId, jsonObj);
        console.log('item saved in localStorage');
      }
   }

  // Not tested yet, why are event not firing??
   removeStorage (e) {
    localStorage.removeItem(e.target.id);
    this.setState(outfits =>
      this.state.outfits.filter(outfit => {
        return outfit.style_id !== e.target.id;
      }),
    );
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
            styles={this.state.styles}
            localName={this.state.localName}
            handleLocalClick={this.handleLocalClick}
            handleLocalSave={this.handleLocalSave}
            />
          </div>
          <div>
            <div className = 'relatedSection'>
              <Related selectedProduct={this.state.selectedProduct}/>
            </div>
          </div>
          <div>
            <QandA
                selectedProduct={this.state.selectedProduct}
              />
          </div>
          <div>
            <Reviews
              selectedProduct={this.state.selectedProduct}
              totalReviews = {this.state.totalReviews}
              averageRating = {this.state.averageRating}
              metaData = {this.state.metaData}
              renderStars={this.renderStars.bind(this)}
            />
          </div>
        </div>
        :<OrbitSpinner color='green' />
        }
      </div>
    )
  }
}

export default App;