import axios from 'axios';
import { useGetRefresh } from './get/useGetRefresh';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `${token}`;
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
    console.log(error.response.status);
    if (error.response.status === 401) {
      console.log('accessToken만료');
      console.log(localStorage.getItem('userId'));
      console.log('엥');
      //accessToken재발급

      //재로그인
    }
    return error.response;
  }
);

export default axiosInstance;