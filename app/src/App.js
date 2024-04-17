import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import SignupPage from './screens/SignupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;