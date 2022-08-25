import React, { useState, useEffect, useContext } from 'react';
import { FaBeer } from 'react-icons/fa';
import Parse from '../parse.js';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      reviews: [],
      cart: [],
      qanda: [],
      interactions: [],
      selectedProduct: ''
    };
  }

  componentDidMount() {
    Parse.getAll('products')
      .then((products) => {
        let defaultIndex = Math.floor(Math.random() * products.data.length);
        this.setState({
          products: products.data,
          selectedProduct: products.data[defaultIndex]
        })
      })
      .then(() => {
        Parse.getAll(`reviews`, `?product_id=${this.state.selectedProduct.id}`)
          .then((reviews) => {
            this.setState({reviews: reviews.data.results})
            console.log(this.state.products)
            console.log(this.state.selectedProduct)
            console.log(this.state.reviews)
          })
      })
      .catch((err) => console.log(err))

  }
  //https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/productsundefined

  //https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews:40348?count=10
  //https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344
  //https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=40344&count=10

  render() {
    return (
      <div>
        <div className="header">
          <div><h1>Odin <FaBeer /></h1></div>
          <div><input></input></div>
        </div>
      </div>
    )
  }
}

export default App;