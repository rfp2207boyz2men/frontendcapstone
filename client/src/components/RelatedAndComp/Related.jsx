import React, { useState, useEffect, useContext } from 'react';
import { FaBeer } from 'react-icons/fa';
import Parse from '../../parse.js';
import ProductCard from './ProductCard.jsx';
import Carousel from 'react-bootstrap/Carousel';
import Outfits from './Outfits.jsx';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      related_ids: [],
    };
  }

  componentDidMount() {
    // Requests the related_ids from API based on selected product within App
    Parse.getAll('products', `/${this.props.selectedProduct.id}/related`)
      .then((relatedProducts) => {
        // cleans the data for any dupes
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
      <div className='overlay'>
      <div className="whitebox"></div>
      <div className="carousel">
          <div className = 'related'>
            {this.state.related_ids.map(ids => {
              return <ProductCard
                key={ids}
                product_id={ids}
                addOutfit={this.props.addToOutfit}
                select={this.props.selectStyle}
                current={this.props.selectedProduct}
                avgStars={this.props.avgRating}/>
            })}
        </div>
        </div>
        </div>
      </div>
    )
  }
}

export default Related;