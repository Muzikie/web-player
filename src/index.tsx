import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import Router from './Router';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

// https://bit.ly/CRA-vitals
reportWebVitals(console.log);
