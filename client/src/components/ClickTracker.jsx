import React, { useState, useEffect, useContext } from 'react';
import Parse from '../parse.js';
import moment from 'moment';

const ClickTracker = (Component, widget) => {
  const handleClickTrack = (e) => {
    window.onclick = () => {
      let date = (moment(new Date()).format('MMM DD[,] YYYY[,] hh:mm:ss a'));

      let params = {
        element: e.target.outerHTML,
        widget: widget,
        time: date
      };

      Parse.create('interactions', undefined, params)
        .catch((err) => console.log(err));

      window.onclick = () => { };
    }
  };
  return (props) =>
    <Component trackClick={handleClickTrack} {...props} />;
};

export default ClickTracker;