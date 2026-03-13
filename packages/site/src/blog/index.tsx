import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app';
import './main.css';
import Logger from '@/components/Logger';

export const RenderBlogInto = (ele: Element) => {
  const root = createRoot(ele);
  root.render(
    <React.StrictMode>
      <Router>
        <App />
        <Logger />
      </Router>
    </React.StrictMode>
  );
};
