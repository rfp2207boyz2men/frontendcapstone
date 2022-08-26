import React, { useState, useEffect, useContext } from 'react';
import { FaBeer } from 'react-icons/fa';
import Parse from '../../parse.js';
import ProductCard from './ProductCard.jsx';

class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      related_ids: [],
    };
  }

  componentDidMount() {
    Parse.getAll('products', `/${this.props.selectedProduct.id}/related`)
      .then((relatedProducts) => {
        this.setState({related_ids: relatedProducts.data})
      })
  }

  render() {
    return (
      <div className = 'related'>
        {this.state.related_ids.map(ids => {
          return <ProductCard key = {ids} product_id = {ids}/>
        })}
      </div>
    )
  }
}

export default Related;