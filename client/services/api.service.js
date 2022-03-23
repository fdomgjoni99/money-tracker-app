import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApiService = axios.create({
  baseURL: 'http://192.168.0.198:8000/api',
});

ApiService.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
      config.headers['Accept'] = 'application/json';
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default ApiService;