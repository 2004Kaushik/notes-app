import axios from 'axios';
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
});

export default axiosInstance;