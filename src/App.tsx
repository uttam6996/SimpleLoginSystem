import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import DealApiError from './components/DealApiError';
function App() {
  return (
    <div className="App">
    <Router>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/apiError" element={<DealApiError />} />
    </Routes>
  </Router>

    {/* <LoginForm /> */}
  </div>
  );
}

export default App;
