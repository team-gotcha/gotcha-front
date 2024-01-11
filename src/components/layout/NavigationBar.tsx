import React, { useState } from 'react';
import { styled } from 'styled-components';

import ShareIcon from '../../assets/icons/ShareIcon';
import ListIcon from '../../assets/icons/ListIcon';
import BoardIcon from '../../assets/icons/BoardIcon';

const NavigationBar = () => {
  return (
    <Wrapper>
      <TopDiv>
        <ProjInfo>
          <Pic />
          <Title>세오스 19기 면접</Title>
        </ProjInfo>
        <IconDiv>
          <ImagesContainer>
            <Image></Image>
            <Image></Image>
            <Image></Image>
          </ImagesContainer>
          <ShareIcon />
        </IconDiv>
      </TopDiv>
      <NavBox>
        <NavItem>
          <ListIcon width="16" height="16" fill="#3733ff" />
          목록
        </NavItem>
        <NavItem>
          <BoardIcon width="16" height="16" fill="#3733ff" />
          보드
        </NavItem>
      </NavBox>
    </Wrapper>
  );
};

export default NavigationBar;

const Wrapper = styled.section`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  top: 5.8rem;
  left: 31.2rem;
  width: calc(100% - 31.2rem);
  height: 10rem;
  flex-shrink: 0;
  padding: 2rem 6rem 0 2.7rem;
  background-color: #fff;
`;

const TopDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProjInfo = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const Pic = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: var(--Gray-300, #e6e6e6);
`;

const Title = styled.div`
  color: var(--Gray-1100, #1a1a1a);

  font-size: 2.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 155%;
`;

const IconDiv = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const ImagesContainer = styled.div`
  display: flex;
  overflow: hidden; /* 넘치는 부분 감추기 */
`;

const Image = styled.div`
  width: 2.8rem;
  height: 2.8rem;
  flex-shrink: 0;
  background-color: var(--Gray-300, #e6e6e6);
  border: 0.1rem solid #fff;
  border-radius: 50%;
  margin-right: -10%; /* 겹치는 부분 설정 */
`;

const NavBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.7rem;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 7rem;
  border-bottom: 0.1rem solid var(--purple-600, #3733ff);

  color: var(--purple-600, #3733ff);

  font-size: 1.2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; /* 19.2px */
`;
