import React from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import './overview.css';
import GalleryEntry from './GalleryEntry.jsx'
import ProductView from './ProductView.jsx'

function imageGallery ({ styles }) {

    return (
      <div className='image-container'>
        <div className='g-container'>
          {styles.map(style => {
            for (let i = 0; i < 5; i++) {
              return <GalleryEntry key={style.style_id} pic={style.photos} />
            }
          })}
          <TiArrowSortedDown className='arrow' />
        </div>
        <div>
          <ProductView styles={styles} />
        </div>
      </div>
    )

}


export default imageGallery;