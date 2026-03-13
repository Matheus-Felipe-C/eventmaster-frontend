import axios from 'axios';

const urlBaseApi = 'https://api.event.matheusfelipe.dev/api';

const api = axios.create({
    baseURL: urlBaseApi,
});

export default api;
