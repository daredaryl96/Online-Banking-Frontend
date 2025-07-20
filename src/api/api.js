import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://localhost:8080/api', // Your backend base URL
    baseURL: 'http://127.0.0.1:8080/api', //For Kubernetes practice
});

export default api;
