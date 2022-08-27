import React from 'react';
import { TiStarFullOutline } from 'react-icons/ti'


function AddToCart ({ handleLocalSave }) {
  return (
    <div className='add-container'>
      <select>
        <option value="0">Select SIZE:</option>
        <option value="1">Audi</option>
        <option value="2">BMW</option>
        <option value="3">Citroen</option>
        <option value="4">Ford</option>
      </select>

      <select>
        <option value="0">QUANTITY: 42</option>
        <option value="1">Audi</option>
        <option value="2">BMW</option>
        <option value="3">Citroen</option>
        <option value="4">Ford</option>
      </select>

      <button>ADD TO CART</button>
      <button onClick={handleLocalSave}><TiStarFullOutline /></button>
    </div>
  )
}



export default AddToCart;