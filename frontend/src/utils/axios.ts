// src/utils/axios.ts

import axios, { AxiosInstance } from 'axios';

// ==================== Main ==================== //
const Api: AxiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== Export ==================== //
export default Api;
