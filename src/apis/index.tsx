import axios from 'axios';
import { useGetRefresh } from './get/useGetRefresh';
import { usePostRefresh } from './post/usePostRefresh';

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
    //const refreshFetch = usePostRefresh();
    // if (error.response.status === 401) {
    //   console.log('accessToken만료');
    //   //accessToken재발급
    //   //refreshFetch.refresh(localStorage.getItem('refreshToken'));
    //   axios
    //     .post(`${process.env.REACT_APP_API_URL}api/refresh`, {
    //       refreshToken: localStorage.getItem('refreshToken'),
    //     })
    //     .then((res) => {
    //       localStorage.setItem('refreshToken', res.data.access_token);
    //     });
    // }
    return error.response;
  }
);

export default axiosInstance;
