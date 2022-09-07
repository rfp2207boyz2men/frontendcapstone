import React, { useState, useEffect, useContext } from 'react';
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";
import { SiIfixit } from 'react-icons/si';

const ExpandOverlay = ({ clickedPhoto, onClick }) => {
  return (
    <div className='reviewPhotoOverlay'>
      {/* <SiIfixit className='reviewPhotoExit' size={30} onClick={props.onClick}/> */}
      <SideBySideMagnifier className='reviewPhotoExpand'
        imageSrc={clickedPhoto}
        imageAlt="Example"
        largeImageSrc={clickedPhoto} // Optional
        touchActivation={TOUCH_ACTIVATION.DOUBLE_TAP} // Optional
      />
      <div className='reviewOverlayBackground' onClick={onClick}></div>
    </div>
  )
};

export default ExpandOverlay;