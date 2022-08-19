import React from 'react';

import {createRoot} from 'react-dom/client';
import Home from './views/Home/Home';
import './assets/styles/main.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
 
)
