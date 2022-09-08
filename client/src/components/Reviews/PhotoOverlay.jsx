import React, { useState, useEffect, useContext } from 'react';
import { SiIfixit } from 'react-icons/si';

const PhotoOverlay = (props) => {
  return (
    <div className='reviewPhotoOverlay'>
      {/* <SiIfixit className='reviewPhotoExit' size={30} onClick={props.onClick}/> */}
      <img className='reviewPhotoExpand' src={props.clickedPhoto} />
      <div className='reviewOverlayBackground' onClick={props.onClick}></div>
    </div>
  )
};

export default PhotoOverlay;