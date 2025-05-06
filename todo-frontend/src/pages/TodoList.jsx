import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const API_URL = 'http://localhost:5000'; // Your backend URL

const TodoList = () => {
    const { token } = useAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await axios.get(`${API_URL}/api/tasks`);
            setTasks(res.data);
        };
        if (token) fetchTasks();
    }, [token]);

    const addTask = async (text) => {
        const res = await axios.post(`${API_URL}/api/tasks`, { text });
        setTasks([...tasks, res.data]);
    };

    const updateTask = async (id, text) => {
        const res = await axios.put(`${API_URL}/api/tasks/${id}`, { text });
        setTasks(tasks.map(task => task._id === id ? res.data : task));
    };

    const deleteTask = async (id) => {
        await axios.delete(`${API_URL}/api/tasks/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <TaskForm onSubmit={addTask} />
            <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
        </div>
    );
};

export default TodoList;