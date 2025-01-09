import style from './index.module.scss';
import './index.scss';
import { ReactComponent as ReactLogo } from './assets/images/logo.svg'; 
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import React from 'react';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);