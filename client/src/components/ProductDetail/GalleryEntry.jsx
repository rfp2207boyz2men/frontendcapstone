import React from 'react';

function GalleryEntry  ({pic})  {
  return (
    <img src={pic[0].thumbnail_url} className='g-entry'></img>
  )
}


export default GalleryEntry;