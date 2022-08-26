import React from 'react';

const GalleryEntry = ({pic}) => (
  <img src={pic[0].thumbnail_url} className='g-entry'></img>
)

export default GalleryEntry;