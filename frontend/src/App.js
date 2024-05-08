// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import MainPage from './home/MainPage';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import Logout from './login/Logout';
import RegisterPage from './login/RegisterPage';
import NaverLoginHandler from './auth/NaverLoginHandler';
import SchedulePage from './schedule/Schedules';
import TestPage from './schedule/test';

function App() {
  return (
    <Router>
    <div className="App">

      <Routes>
      <Route path="/" element={<HomePage />} ></Route>
      <Route path="/main" element={<MainPage />} ></Route>
      <Route path="/schedule" element={<SchedulePage />} ></Route>
      <Route path="/login" element={<LoginPage />} ></Route>
      <Route path="/logout" element={<Logout />}></Route>
      <Route path="/register" element={<RegisterPage />} ></Route>
      <Route path="/test" element={<TestPage/>} ></Route>
      <Route path="/auths/naverlogin" element={<NaverLoginHandler />} />

      </Routes>
    </div>
  </Router>
  );
}

export default App;
