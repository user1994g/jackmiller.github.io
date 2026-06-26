import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

if (typeof window !== 'undefined') {
  window.__jackAppBooted = true;
  if (typeof window.__jackMarkBooted === 'function') {
    window.__jackMarkBooted();
  }
}
