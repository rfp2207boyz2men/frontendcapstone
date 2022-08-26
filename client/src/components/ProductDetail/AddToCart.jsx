import React from 'react';
import { TiStarFullOutline } from 'react-icons/ti'


const AddToCart = ({ handleClick }) => (
  <div className='add-container'>
    <button>SELECT SIZE</button>
    <button>QUANTITY: 42</button>
    <button>ADD TO CART</button>
    <button onClick={handleClick}><TiStarFullOutline /></button>
  </div>
)

export default AddToCart;