import React, { useState, useEffect, useContext } from 'react';
//Could use this for if the API calls in App.jsx fail. If .catch happens, set a state to show 404.

const FourOhFour = () => {

  return (
    <div className='fourOhFour'>
      404!
    </div>
  )
};

export default FourOhFour;