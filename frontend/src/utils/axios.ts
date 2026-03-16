// src/utils/axios.ts

import axios, { AxiosInstance } from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { getJwtToken } from './keychain';

// ==================== Main ==================== //
const Api: AxiosInstance = axios.create({
  // baseURL: 'http://10.0.2.2:8080',
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ApiWithJwt: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

ApiWithJwt.interceptors.request.use(
  async config => {
    const token = (await getJwtToken()).token;
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// ==================== Export ==================== //
export default Api;
