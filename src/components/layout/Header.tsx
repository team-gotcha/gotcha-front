import React, { useState } from 'react';
import { styled } from 'styled-components';
import Logo from '../../assets/icons/Logo';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import CommonButton from '../common/CommonButton';
import { loginState } from '../../recoil/userInfo';

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const handleLogout = () => {
    //fetchLogout.logout();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('refreshToken');

    setIsLogin(false);
    navigate('/');
  };
  return (
    <Wrapper>
      <Logo />
      <CommonButton
        color="lineGray"
        children="로그아웃"
        size="small"
        onClick={handleLogout}
      />
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding-right: 5rem;
  align-items: center;
  top: 0;
  width: 100%;
  height: 5.8rem;
  border-bottom: 0.05rem solid #e6e6e6;
  background-color: #fff;
  z-index: 6;
`;

const Title = styled.div`
  color: #3733ff;
  font-size: 2rem; //임의 설정 추후 로고 이미지 변경 예정
`;
