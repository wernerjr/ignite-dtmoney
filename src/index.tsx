import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { mirageMock } from './mock';

const isDevelopment = process.env.NODE_ENV !== 'production';
if(isDevelopment){
  mirageMock();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
