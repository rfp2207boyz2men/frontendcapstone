import React, { useState, useEffect, useContext } from 'react';
import Parse from '../parse.js';
//import '../styles.css';
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
      .then((products) => {this.setState({products: products.data})})
      .then(() => console.log(this.state.products))
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div>
        <div className="header">
          <div><h1>Odin</h1></div>
          <div><input></input></div>
        </div>
      </div>
    )
  }
}

export default App;