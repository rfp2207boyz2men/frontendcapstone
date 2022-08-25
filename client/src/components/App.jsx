import React, { useState, useEffect, useContext } from 'react';
import { FaBeer } from 'react-icons/fa';
import Parse from '../parse.js';
import axios from 'axios';
import Related from './RelatedAndComp/Related.jsx';
import Reviews from './Reviews/Reviews.jsx';
import { BiLoaderCircle } from 'react-icons/bi';
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
      .then(() => {
        Parse.getAll(`reviews`, `?product_id=${this.state.selectedProduct.id}`)
          .then((reviews) => {
            this.setState({reviews: reviews.data.results, componentMounted: true})
            // console.log(this.state.products)
            // console.log(this.state.selectedProduct)
            // console.log(this.state.reviews)
          })})
      .then((reviews) => {
        state.reviewsData = reviews.data;
        state.reviews = reviews.data.results;
        return this.setState(state);
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
  }

  //https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344
  //https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344&count=10

  render() {
    return (
      <div>
        {this.state.loading
         ? <div>
          <div className="header">
            <div><h1>Odin <FaBeer /></h1></div>
            <div><input></input></div>
          </div>
          <div>
            <>Manuel</>
          </div>
          <div>
            <>Tony</>
          </div>
          <div>
            <>Paul</>
          </div>
          <div>
            <Reviews selectedProduct={this.state.selectedProduct} reviews={this.state.reviews}/>
          </div>
        </div>
        :<BiLoaderCircle />
        }
      </div>
    )
  }
}

export default App;