import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetLogin } from '../apis/get/useGetLogin';

const GoogleCallback = () => {
  const navigate = useNavigate();

  // 현재 url에서 code 부분 추출
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  //custom-hook
  const fetchedData = useGetLogin(code);

  useEffect(() => {
    if (localStorage.getItem('accessToken') !== null) {
      console.log('accessToken존재');
      localStorage.removeItem('accessToken');
    }
    if (!fetchedData.isLoading) {
      console.log(fetchedData.googleLogin);
      localStorage.removeItem('accessToken');
      localStorage.setItem('accessToken', fetchedData.googleLogin.accessToken);
      console.log('로그인 성공');
      navigate('/');
    }
  }, [fetchedData.isLoading]);

  return (
    <div>
      <h1>This is GoogleCallback</h1>
    </div>
  );
};

export default GoogleCallback;
