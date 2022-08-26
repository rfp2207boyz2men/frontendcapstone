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
      watch: false,
    }
  }

  componentDidMount () {
    let state = {};
    let params = `${this.props.selectedProduct.id}`;


    Parse.getAll(`products/`, params)
    .then((product) => {
      state.currentProduct = product.data;
      params = `${this.props.selectedProduct.id}/styles`;
    })

    Parse.getAll(`products/`, params)
    .then((styles) => {
      state.styles = styles.data.results;
      return this.setState(state);
    })
    .then(() =>  {
      if (!localStorage.getItem('styles')) {
        this.populateStorage();
      } else {
        const data = this.props.retrieveStorage();
        console.log(data);
      }
    })
    .catch((err) => console.log(err));
  }

  populateStorage() {
    const jsonObj = JSON.stringify(this.state.styles);
    localStorage.setItem('styles', jsonObj);
  }



   handleClick () {
    console.log('test???');
  }


  render() {
    return (
      <div>
        <div className='main-container'>
          <ImageGallery />
          <ProductInformation styles={this.state.styles}/>
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