import React from 'react';
import './overview.css';
import ImageGallery from './ImageGallery.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      imageGallery: [],
    }
  }


  render() {
    return (
      <div >
        <ImageGallery  />
      </div>
    )
  }
}


export default Overview;