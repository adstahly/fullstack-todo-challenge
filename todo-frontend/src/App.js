import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoList from './pages/TodoList';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute><TodoList /></PrivateRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
  );
}

export default App;