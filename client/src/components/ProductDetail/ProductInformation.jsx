import React from 'react';
import Star from './Star.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';

class ProductInformation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className='info-container'>
        <Star />
        <h4>CATEGORY</h4>
        <h2>Sample Product Here</h2>
        <p>$199.99</p>
        <StyleSelector />
        <AddToCart />
        </div>
    )
  }
}


export default ProductInformation;