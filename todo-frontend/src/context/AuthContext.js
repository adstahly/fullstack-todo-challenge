import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Your backend URL
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const login = async (email, password) => {
        const res = await axios.post(`${API_URL}/api/login`, { email, password });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
    };

    const register = async (username, email, password) => {
        const res = await axios.post(`${API_URL}/api/register`, { username, email, password });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);