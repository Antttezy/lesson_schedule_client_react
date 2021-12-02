import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { store } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />}/>
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
