import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api',
    timeout: 10000, // 10 seconds timeout
});

export default axiosInstance;