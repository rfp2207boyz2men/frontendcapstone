import React, { useState, useEffect, useContext } from 'react';

const PhotoOverlay = (props) => {
  const [start, setStart] = useState(false);

  let style = { opacity: start ? '100%' : '0', transition: '0.15s' };

  useEffect(() => {
    setStart(true);
  }, [])

  const handleClick = () => {
    setStart(false);
    setTimeout(() => props.onClick(), 150);
  };

  return (
    <div className='reviewPhotoOverlay'>
      <img style={style} className='reviewPhotoExpand' src={props.clickedPhoto} alt='Expanded image' />
      <div className='reviewOverlayBackground' onClick={handleClick}></div>
    </div>
  )
};

export default PhotoOverlay;