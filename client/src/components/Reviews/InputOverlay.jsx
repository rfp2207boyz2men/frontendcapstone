import React, { useState, useEffect, useContext } from 'react';
import Input from './Input.jsx';

const InputOverlay = (props) => {

  return (
    <div className='reviewInputOverlay'>
      <Input
        characteristics={props.characteristics}
        handleOverlay={props.handleOverlay}
        productName={props.productName}
        productId={props.productId}
        getReviews={props.getReviews}
      />
      <div className='reviewOverlayBackground' onClick={props.handleOverlay}></div>
    </div>
  )
};

export default InputOverlay;