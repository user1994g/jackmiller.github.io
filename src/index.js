import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './styles/Studio.css';
import './styles/Christmas.css';
import './styles/Birthday.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

if (typeof window !== 'undefined') {
  window.__jackAppBooted = true;
  if (typeof window.__jackMarkBooted === 'function') {
    window.__jackMarkBooted();
  }
}
