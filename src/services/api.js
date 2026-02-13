import axios from 'axios';

// Mock API - In production, replace with actual backend URL
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const authAPI = {
  register: async (userData) => {
    // Mock implementation - stores in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    const userExists = users.find(
      u => u.email === userData.email || u.username === userData.username
    );
    
    if (userExists) {
      throw new Error('User already exists');
    }
    
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return { data: { message: 'Registration successful' } };
  },

  login: async (credentials) => {
    // Mock implementation
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const user = users.find(
      u => (u.email === credentials.emailOrUsername || u.username === credentials.emailOrUsername) &&
           u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const token = btoa(user.id + ':' + Date.now());
    const { password, ...userWithoutPassword } = user;
    
    return {
      data: {
        user: userWithoutPassword,
        token,
      },
    };
  },
};

// Task APIs
export const taskAPI = {
  getTasks: async () => {
    const userId = JSON.parse(localStorage.getItem('user'))?.id;
    const tasks = JSON.parse(localStorage.getItem(`tasks_${userId}`) || '[]');
    return { data: tasks };
  },

  createTask: async (taskData) => {
    const userId = JSON.parse(localStorage.getItem('user'))?.id;
    const tasks = JSON.parse(localStorage.getItem(`tasks_${userId}`) || '[]');
    
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      userId,
      createdAt: new Date().toISOString(),
    };
    
    tasks.push(newTask);
    localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
    
    return { data: newTask };
  },

  updateTask: async (id, taskData) => {
    const userId = JSON.parse(localStorage.getItem('user'))?.id;
    const tasks = JSON.parse(localStorage.getItem(`tasks_${userId}`) || '[]');
    
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...taskData };
      localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
      return { data: tasks[index] };
    }
    
    throw new Error('Task not found');
  },

  deleteTask: async (id) => {
    const userId = JSON.parse(localStorage.getItem('user'))?.id;
    const tasks = JSON.parse(localStorage.getItem(`tasks_${userId}`) || '[]');
    
    const filteredTasks = tasks.filter(t => t.id !== id);
    localStorage.setItem(`tasks_${userId}`, JSON.stringify(filteredTasks));
    
    return { data: { message: 'Task deleted' } };
  },
};

export default api;
