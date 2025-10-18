import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (token) {
        const tokenExpiry = localStorage.getItem('tokenExpiry')
        const expiryDate = new Date(tokenExpiry ?? "");
        const now = new Date();
        if (now > expiryDate) {
            localStorage.removeItem('token');
            delete config.headers.Authorization;
        }
        else {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    console.log(config)
    return config;
});