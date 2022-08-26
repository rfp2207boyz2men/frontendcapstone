import React from 'react';

const GalleryEntry = ({pic}) => (
  <div className='g-entry'>
    <img src={pic.thumbnail_url} ></img>
  </div>
)

export default GalleryEntry;