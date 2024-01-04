import React, { useState } from "react";
import { styled } from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <Title>GOTCHA</Title>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  width: 100%;
  height: 5.8rem;
  padding: 0 4.5rem;
  border-bottom: 0.05rem solid #e6e6e6;
  background-color: #fff;
`;

const Title = styled.div`
  color: #3733ff;
  font-size: 2rem; //임의 설정 추후 로고 이미지 변경 예정
`;
