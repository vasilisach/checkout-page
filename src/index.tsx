import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as Redux from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Redux.Provider store={store}>
      <App />
    </Redux.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
