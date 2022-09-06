import React, { useState, useEffect, useContext } from 'react';

const Theme = () => {
  const [theme, setTheme] = useState(true);
  const [styleLength, setStyleLength] = useState(0);

  useEffect(() => {
    if (theme) {
      require('../styles.css');
      setStyleLength(document.getElementsByTagName('style').length);
      let styles = (document.getElementsByTagName('style'));
    } else {
      require('../darkmode.css');
      setStyleLength(document.getElementsByTagName('style').length);
    }
  }, []);

  const handleTheme = () => {
    console.log(theme);
    if (theme) {
      require('../styles.css');
      let styles = (document.getElementsByTagName('style'));
      console.log(styleLength);
      console.log(styles.length);
      if (styleLength !== styles.length) {
        styles = styles[styles.length - 1];
        styles.remove();
        delete require.cache[require.resolve('../darkmode.css')];
      }
      setTheme(false);
    } else {
      require('../darkmode.css');
      let styles = (document.getElementsByTagName('style'));
      console.log(styleLength);
      console.log(styles.length);
      if (styleLength !== styles.length) {
        styles = styles[styles.length - 1];
        styles.remove();
        delete require.cache[require.resolve('../styles.css')];
      }
      setTheme(true);
    }
  }

  return (<button onClick={handleTheme}>Toggle Theme</button>)
}

export default Theme;

  // if (theme) {
  //   let test = require('../styles.css');
  //   let style = document.getElementsByTagName('style');
  //   // for (let test of style) {
  //   //   test.remove();
  //   // }
  //   // style.remove();
  //   console.log(style);
  //   // delete require.cache[require.resolve('../darkmode.css')];
  // } else {
  //   let test = require('../darkmode.css');
  //   let style = document.getElementsByTagName('style');
  //   // for (let test of style) {
  //   //   test.remove();
  //   // }
  //   // style.remove();
  //   console.log(style);
  //   // delete require.cache[require.resolve('../styles.css')];
  // };

  // const handleTheme = () => {
  //   if(theme === true) {
  //     console.log(theme)
  //     setTheme(false);
  //   } else {
  //     console.log(theme)
  //     setTheme(true);
  //   }
  // };