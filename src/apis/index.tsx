import axios from 'axios';

require('dotenv').config();

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    //console.log(response);
    return response;
  },
  (error) => {
    //console.log(error.response);
    //console.log(error.response.status);
    return error.response;
  }
);

export default axiosInstance;
