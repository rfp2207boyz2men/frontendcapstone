import React from 'react';
import './overview.css';
import Parse from '../../parse.js';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import ProductOverview from './ProductOverview.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      styles: [],
    }
  }

  componentDidMount () {
    let params = `?product_id=${this.props.selectedProduct.id}/related`;

    Parse.getAll(`products/`, params)
      .then((styles) => {
        console.log('styles?', styles.data);
      })
  }

  render() {
    return (
      <div>
        <div className='main-container'>
          <ImageGallery />
          <ProductInformation selectedProduct={this.props.selectedProduct} />
        </div>
        <div>
          <ProductOverview selectedProduct={this.props.selectedProduct} />
        </div>
      </div>
    )
  }
}


export default Overview;