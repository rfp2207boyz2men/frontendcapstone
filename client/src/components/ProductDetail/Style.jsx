import React from 'react';

function Style ({url, id, handleClick, name}) {

  return (
    <img id={id} name={name} onClick={handleClick} src={url} className='style-entry'></img>
  )

}




export default Style;