import axios from 'axios';
import React from 'react';
import Parse from '../../parse.js';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import ProductOverview from './ProductOverview.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      styles: [],
      currentProduct: [],
    }
  }

  componentDidMount () {
  }

  render() {
    return (
      <div>
        <div className='main-container'>
          <ImageGallery styles={this.props.styles} />
          <ProductInformation selectedProduct={this.props.selectedProduct} styles={this.props.styles}
          localName={this.props.localName}
          handleLocalClick={this.props.handleLocalClick}
          handleLocalSave={this.props.handleLocalSave}/>
        </div>
        <div>
          <ProductOverview
          selectedProduct={this.props.selectedProduct}
           />
        </div>
      </div>
    )
  }
}


export default Overview;