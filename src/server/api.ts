import axios from 'axios';

const urlBaseApi = '';

const api = axios.create({
    baseURL: urlBaseApi,
});

export default api;
