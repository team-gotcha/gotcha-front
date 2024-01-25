import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetLogin } from '../apis/get/useGetLogin';
import { useGetUserInfo } from '../apis/get/useGetUserInfo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState, userInfoState } from '../recoil/userInfo';

const MainCallback = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <div>
      <h1>This is MainCallback</h1>
    </div>
  );
};

export default MainCallback;
