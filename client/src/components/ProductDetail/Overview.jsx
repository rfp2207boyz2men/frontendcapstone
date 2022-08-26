import React from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import ProductOverview from './ProductOverview.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      styles: [],
      watch: false,
    }
  }

  componentDidMount () {
  }

  // handleClick(e) {
  //   e.preventDefault();
  //   this.setState({
  //     watch: true
  //   })
  //   console.log('nested btn working')
  // }

  render() {
    return (
      <div>
        <div className='main-container'>
          <ImageGallery />
          <ProductInformation selectedProduct={this.props.selectedProduct}/>
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