import React, { useState, useEffect, useContext } from 'react';

const FourOhFour = (props) => {
  const [time, setTime] = useState(30);


  const timer = (seconds) => {
    seconds = seconds || 30;
    setTimeout(() => {
      if (seconds > 1) {
        timer(seconds - 1);
        return setTime((prevTime) => (prevTime - 1));
      } else {
        props.reset();
      }
    }, 1000);
  };

  useEffect(() => {
    timer();
  }, []);

  return (
    <>
      <iframe src='https://www.youtube.com/embed/D7npse9n-Yw?autoplay=1' allow="autoplay"></iframe>
      <h1 style={{color: 'white'}} className='fourOhFourTimer'>Attempting to reconnect in {time} {time > 1 ? 'seconds.' : 'second.'}</h1>
      <div className='fourOhFour'>
        <img className='fourOhFourImage' src='https://res.cloudinary.com/daqlqdhlo/image/upload/v1662676967/gzdpr71bsiwgc2ogljqq.png'></img>
      </div>
    </>
  );
};

export default FourOhFour;