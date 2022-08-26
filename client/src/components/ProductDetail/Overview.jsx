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
      test: [],
      watch: false,
    }
  }

  componentDidMount () {
    let state = {};
    let params = `${this.props.selectedProduct.id}/styles`;

    Parse.getAll(`products/`, params)
    .then((styles) => {
      state.styles = styles.data.results;
      return this.setState(state);
    })
    .then(() =>  {

      this.state.styles.forEach((style) => {
        if (!JSON.stringify(style.photos).includes(null)) {
          if (localStorage.length < 5 && !localStorage.getItem(style.style_id)) {
            const jsonObj = JSON.stringify(style);
            localStorage.setItem(style.style_id, jsonObj);
          }
        }
      })

    })
    .catch((err) => console.log(err));
  }

  // populateStorage() {
  //   const jsonObj = JSON.stringify(this.state.styles);
  //   localStorage.setItem('styles', jsonObj);
  // }


  render() {
    return (
      <div>
        <div className='main-container'>
          <ImageGallery />
          <ProductInformation selectedProduct={this.props.selectedProduct} styles={this.state.styles}/>
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