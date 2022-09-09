import React, { useState, useEffect, useContext } from 'react';

const PhotoOverlay = (props) => {
  const [start, setStart] = useState(false);

<<<<<<< HEAD
  let style = {opacity: start ? '100%' : '0', transition: '0.15s'};

  useEffect(() => {
    // console.log(style);
    setStart(true);
    // setTimeout(() => setStart(true), 2000);
=======
  let style = { opacity: start ? '100%' : '0', transition: '0.15s' };

  useEffect(() => {
    setStart(true);
>>>>>>> main
  }, [])

  const handleClick = () => {
    setStart(false);
    setTimeout(() => props.onClick(), 150);
  };

  return (
    <div className='reviewPhotoOverlay'>
<<<<<<< HEAD
      {/* <SiIfixit className='reviewPhotoExit' size={30} onClick={props.onClick}/> */}
      <img style={style} className='reviewPhotoExpand' src={props.clickedPhoto} alt='Expanded image'/>
=======
      <img style={style} className='reviewPhotoExpand' src={props.clickedPhoto} alt='Expanded image' />
>>>>>>> main
      <div className='reviewOverlayBackground' onClick={handleClick}></div>
    </div>
  )
};

export default PhotoOverlay;