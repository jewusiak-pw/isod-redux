import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import IsodContextProvider from "./ContextService";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <IsodContextProvider>
          <App />
      </IsodContextProvider>
  </React.StrictMode>
);