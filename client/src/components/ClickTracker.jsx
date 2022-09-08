import React, { useState, useEffect, useContext } from 'react';
import Parse from '../parse.js';
import moment from 'moment';

//Higher Order Component:
//  Function that takes in component and returns a modified component
const ClickTracker = (Component, widget) => {
  const handleClickTrack = (e) => {
    //When invoked via onClick, enable window.onclick
    window.onclick = () => {
      let date = (moment(new Date()).format('MMM DD[,] YYYY[,] hh:mm:ss a'));
      // console.log(e.target.outerHTML);
      console.log(`Widget: ${widget} || Date: ${date}`);

      let params = {
        // element: `${e.target.className}`,
        element: e.target.outerHTML,
        widget: widget,
        time: date
      };

      // v Uncomment v to enable interaction posts to API

      // Parse.create('interactions', undefined, params)
      // // .then((response) => console.log(response))
      // .catch((err) => console.log(err));

      //Disable window.onclick at the end of function to prevent from clicking on elements with no component(like page border)
      window.onclick = () => {};
    }
  };
  //Return the component with the above function with a closure with the passed in widget. Also gives it the original props.
  return (props) =>
    <Component trackClick={handleClickTrack} {...props}/>;
};

export default ClickTracker;