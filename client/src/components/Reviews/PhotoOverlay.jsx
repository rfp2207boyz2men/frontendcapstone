import React, { useState, useEffect, useContext } from 'react';

const PhotoOverlay = (props) => {
  const [start, setStart] = useState(false);

  let style = {opacity: start ? '100%' : '0', transition: '0.15s'};

  useEffect(() => {
    setStart(true);
  }, [])

  const handleClick = () => {
    setStart(false);
    setTimeout(() => props.onClick(), 150);
  };

  return (
    <div className='reviewPhotoOverlay'>
<<<<<<< HEAD
      {/* <SiIfixit className='reviewPhotoExit' size={30} onClick={props.onClick}/> */}
      <img className='reviewPhotoExpand' src={props.clickedPhoto} />
      <div className='reviewOverlayBackground' onClick={props.onClick}></div>
=======
      <img style={style} className='reviewPhotoExpand' src={props.clickedPhoto} alt='Expanded image'/>
      <div className='reviewOverlayBackground' onClick={handleClick}></div>
>>>>>>> 45ffc64af63063a3666c2d3473266097df3f90a2
    </div>
  )
};

export default PhotoOverlay;