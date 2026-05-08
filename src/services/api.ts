import axios from 'axios';


const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    config.headers['X-App-Name'] = 'ReactNativeClass';

    console.log('Request:', config.method?.toUpperCase(), config.url);

    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    // Log obrigatório conforme enunciado
    console.log('Response:', response.status);
    return response;
  },
  (error) => {
    // Tratamento global de erros HTTP
    if (error.response) {
      console.error(`HTTP Error ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.error('Network Error: No response received');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
