import React from 'react';
import { createRoot } from 'react-dom/client'; // Nova importação para React 18
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './styles/main.scss';

// Cria o "root" para renderizar a aplicação
const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);