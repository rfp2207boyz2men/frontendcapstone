import React from 'react';
import './overview.css';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import ProductOverview from './ProductOverview.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageGallery: [],
    }
  }


  render() {
    return (
      <div>
        <div className='main-container'>
          <ImageGallery />
          <ProductInformation />
        </div>
        <div className='prodview-container'>
          <ProductOverview />
        </div>
      </div>
    )
  }
}


export default Overview;