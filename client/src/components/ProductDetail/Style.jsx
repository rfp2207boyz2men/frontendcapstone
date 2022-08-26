import React from 'react';

const Style = ({url, id, handleClick, name}) => (
  <img id={id} name={name} onClick={handleClick} src={url} className='style-entry'></img>
)

export default Style;