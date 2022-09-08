import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/index.css';
// import './light.css';
// import './dark.css';
import App from './components/App.jsx';

// this is here to remove the white flash, which works after the first toggle
// const selectedTheme = localStorage.getItem('theme');
// selectedTheme === 'dark' ? document.body.style.backgroundColor = '#2c2c2f' : document.body.style.backgroundColor = 'white';
<<<<<<< HEAD
const selectedTheme = localStorage.getItem('theme');
selectedTheme === 'dark' ? document.body.style.backgroundColor = '#2c2c2f' : document.body.style.backgroundColor = 'white';
=======
>>>>>>> eda63e3ae1dde64faa1919a5f15a2804b13a8bc4

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <App />
);
