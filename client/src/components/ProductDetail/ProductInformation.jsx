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
      <h4>{this.props.selectedProduct.category}</h4>
      <h2>{this.props.selectedProduct.name}</h2>
      <p>${this.props.selectedProduct.default_price}</p>
      <StyleSelector
       handleLocalClick={this.props.handleLocalClick}
       localName={this.props.localName}
       styles={this.props.styles} />
      <AddToCart handleLocalSave={this.props.handleLocalSave} />
    </div>
    )
  }
}

export default ProductInformation;