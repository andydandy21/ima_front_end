import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Welcome from './components/Welcome';
import Main from './components/Main'
import Login from './components/Login';
import AccountLayout from './components/AccountLayout';
import Resgister from './components/Register';
import PasswordReset from './components/PasswordReset'


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Welcome /> } />
        <Route path='/:roomId' element={<Main />} />
      </Route>
      <Route element={<AccountLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Resgister />} />
        <Route path='/password-reset' element={<PasswordReset />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
