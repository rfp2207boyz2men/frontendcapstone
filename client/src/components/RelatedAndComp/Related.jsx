import React, { useState, useEffect, useContext } from 'react';
import { FaBeer } from 'react-icons/fa';
import Parse from '../../parse.js';
import ProductCard from './ProductCard.jsx';
import Carousel from 'react-bootstrap/Carousel';
import Outfits from './Outfits.jsx'

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
        let cleanedData = [];
        relatedProducts.data.forEach(id => {
          if (!cleanedData.includes(id)) {
            cleanedData.push(id)
          }
        })
        this.setState({related_ids: cleanedData})
      })
  }

  render() {
    return (
      <div>
        <div className='sectionTitle'><h2>RELATED PRODUCTS</h2></div>
          <div className = 'related'>
            {this.state.related_ids.map(ids => {
              return <ProductCard key = {ids} product_id = {ids}/>
            })}
        </div>

      </div>
    )
  }
}

export default Related;