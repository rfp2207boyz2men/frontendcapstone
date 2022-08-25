import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import Style from './Style.jsx';

const StyleSelector = () => (
  <div>
    <div className='style-title'>
      <h4> STYLE > </h4><h4>SELECTED STYLE</h4>
    </div>
    <div className='style-container'>
      <Style className='style-entry'/>
      <Style className='style-entry'/>
      <Style className='style-entry'/>
      <Style className='style-entry'/>
      <Style className='style-entry'/>
      <Style className='style-entry'/>
      <Style className='style-entry'/>
      <Style className='style-entry'/>
    </div>
  </div>
)

export default StyleSelector;