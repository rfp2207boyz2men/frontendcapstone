import React from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import './overview.css';
import GalleryEntry from './GalleryEntry.jsx'
import ProductView from './ProductView.jsx'

class imageGallery extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }


  render() {
    return (
      <div className='image-container'>
        <div className='g-container'>
          {/* {this.props.styles.map(style => {
            style.photos.forEach(pic => {
              return <GalleryEntry key={style.style_id} pic={} />
            })
          })} */}
          <TiArrowSortedDown className='arrow' />
        </div>
        <div>
          <ProductView />
        </div>
      </div>
    )
  }
}


export default imageGallery;