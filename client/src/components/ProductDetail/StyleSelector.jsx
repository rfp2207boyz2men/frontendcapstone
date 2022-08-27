import React, { useContext } from 'react';
import { render } from 'react-dom';
import OverviewContext from './OverviewContext.js';
import Style from './Style.jsx';

function StyleSelector ({styles, localName, handleLocalClick}) {

    return (
      <div>
      <div className='style-title'>
        <h4> STYLE > </h4>
        <h4>{localName}</h4>
      </div>
      <div className='style-container'>
        {styles.map(style => {
          return <Style handleClick={handleLocalClick} key={style.style_id} obj={style}
           id={style.style_id}
           name={style.name}
           url={style.photos[0].thumbnail_url}
           className='style-entry'/>
        })}
      </div>
    </div>
    )

}

export default StyleSelector;