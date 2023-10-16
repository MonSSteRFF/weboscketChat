import './styles/index.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { RootModelContextProvider } from './store/RootModel';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <RootModelContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RootModelContextProvider>,
);
