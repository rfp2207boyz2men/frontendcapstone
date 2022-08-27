import React, { useState, useEffect } from 'react';
import { TiArrowSortedDown, TiArrowLeftThick, TiArrowRightThick, TiArrowMaximise } from 'react-icons/ti';
import './overview.css';
import Parse from '../../parse';
import GalleryEntry from './GalleryEntry.jsx'
import ProductView from './ProductView.jsx'

function imageGallery ({ selectedProduct }) {

    return (
      <div className='image-container'>
        <div className='g-container'>
          {/* {styles.map(style => {
            for (let i = 0; i < 5; i++) {
              return <GalleryEntry key={style.style_id} pic={style.photos} />
            }
          })} */}
          <TiArrowSortedDown className='arrow' />
        </div>
      <div className='pv-container'>
        <TiArrowLeftThick className='arrow' />
        <img src={`https://via.placeholder.com/500`} alt="Product description"></img>
        <TiArrowRightThick className='arrow' />
        <TiArrowMaximise className='expand' />
      </div>
      </div>
    )

}


export default imageGallery;