import React, { useState, useEffect, useContext } from 'react';
import Input from './Input.jsx';

const Overlay = (props) => {


  return (
    <div className='reviewOverlay'>
      <Input
        characteristics={props.characteristics}
        handleOverlay={props.handleOverlay}
        productName={props.productName}
      />
      <div className='reviewOverlayBackground' onClick={props.handleOverlay}></div>
    </div>
  )
};

export default Overlay;