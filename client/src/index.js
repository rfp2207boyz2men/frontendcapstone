import React from 'react';
import ReactDOM from 'react-dom/client';
// import './light.css';
import './dark.css';
import App from './components/App.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
