import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetLogin } from '../apis/get/useGetLogin';
import { useGetUserInfo } from '../apis/get/useGetUserInfo';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  defaultProjectId,
  loginState,
  userInfoState,
} from '../recoil/userInfo';
import { useGetProjectList } from '../apis/get/useGetProjectList';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [firstProjectId, setfirstProjectId] = useRecoilState(defaultProjectId);

  // 현재 url에서 code 부분 추출
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  //custom-hook
  const fetchedData = useGetLogin(code);
  const fetchedProjectData = useGetProjectList();

  useEffect(() => {
    if (localStorage.getItem('accessToken') !== null) {
      console.log('accessToken존재');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('refreshToken');
    }
    if (!fetchedData.isLoading) {
      const expiredTime = new Date().getTime() + 25 * 60 * 1000;
      console.log(new Date(expiredTime));
      localStorage.setItem('accessToken', fetchedData.googleLogin.accessToken);
      localStorage.setItem('userId', fetchedData.googleLogin.userId);
      localStorage.setItem(
        'refreshToken',
        fetchedData.googleLogin.refreshToken
      );
      localStorage.setItem('expirationTime', String(expiredTime));
      console.log('로그인 성공');
      setIsLogin(true);
      navigate('/main/callback');
    }
  }, [fetchedData.isLoading, fetchedProjectData.isLoading]);

  return (
    <div>
      <h1>This is GoogleCallback</h1>
    </div>
  );
};

export default GoogleCallback;
