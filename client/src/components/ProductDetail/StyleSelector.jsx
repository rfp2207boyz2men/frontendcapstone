import React from 'react';
import Style from './Style.jsx';

const StyleSelector = ({ styles }) => (
  <div>
    <div className='style-title'>
      <h4> STYLE > </h4><h4>SELECTED STYLE</h4>
    </div>
    <div className='style-container'>
      {styles.map(style => {
        return <Style key={style.style_id} url={style.photos[0].thumbnail_url} className='style-entry'/>
      })}
    </div>
  </div>
)

export default StyleSelector;