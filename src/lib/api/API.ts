import axios, { type AxiosInstance } from 'axios';

export const API: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL
});

// API.interceptors.request.use(config => {
//     const TOKEN = TokenStorage.get()
//     if (TOKEN) {
//         config.headers.Authorization = `Bearer ${TOKEN}`
//     }
//     return config
// })
