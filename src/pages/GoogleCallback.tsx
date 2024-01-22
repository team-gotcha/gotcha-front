import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetLogin } from '../apis/get/useGetLogin';
import { useGetUserInfo } from '../apis/get/useGetUserInfo';
import { useRecoilState } from 'recoil';
import { loginState, userInfoState } from '../recoil/userInfo';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // 현재 url에서 code 부분 추출
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  //custom-hook
  const fetchedData = useGetLogin(code);
  // const fetchedUserData = useGetUserInfo(isLogin);

  useEffect(() => {
    if (localStorage.getItem('accessToken') !== null) {
      console.log('accessToken존재');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('refreshToken');
    }
    if (!fetchedData.isLoading) {
      localStorage.removeItem('accessToken');
      localStorage.setItem('accessToken', fetchedData.googleLogin.accessToken);
      localStorage.setItem('userId', fetchedData.googleLogin.userId);
      localStorage.setItem(
        'refreshToken',
        fetchedData.googleLogin.refreshToken
      );
      console.log('로그인 성공');
      setIsLogin(true);
      navigate('/main/project');
    }
  }, [fetchedData.isLoading]);

  // useEffect(() => {
  //   if (isLogin && !fetchedUserData.isLoading) {
  //     console.log('유저데이터 세팅');
  //     setUserInfo(fetchedUserData.userInfo);
  //     navigate('/main/project');
  //   }
  // }, [fetchedUserData.isLoading, isLogin]);

  return (
    <div>
      <h1>This is GoogleCallback</h1>
    </div>
  );
};

export default GoogleCallback;
