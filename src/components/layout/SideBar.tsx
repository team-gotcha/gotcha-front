import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import AddIcon from '../../assets/icons/AddIcon';
import { ReactComponent as FavIcon } from '../../assets/images/FavIcon.svg';
import { ReactComponent as NotiIcon } from '../../assets/images/NotiIcon.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalContent, modalState } from '../../recoil/modal';
import { useToggleModal } from '../../hooks/useToggleModal';
import AddProjectModal from '../common/modal/AddProjectModal';
import { loginState, userInfoState } from '../../recoil/userInfo';
import { useGetUserInfo } from '../../apis/get/useGetUserInfo';

const SideBar = () => {
  //modal관리
  const isModalOpen = useRecoilValue(modalState);
  const { openModal } = useToggleModal();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [modalItem, setModalItem] = useRecoilState(modalContent);
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  //custom hook
  const fetchedUserData = useGetUserInfo(isLogin);

  const handleMakeNewProject = () => {
    setModalItem(<AddProjectModal />);
    openModal();
  };

  useEffect(() => {
    if (isLogin && !fetchedUserData.isLoading) {
      console.log('유저데이터 세팅');
      setUserInfo(fetchedUserData.userInfo);
    }
  }, [!fetchedUserData.isLoading, isLogin]);

  return (
    <Wrapper>
      <UserDiv>
        <UserProfile src={userInfo.profileImage} />
        <div className="info">
          <UserID>{userInfo.name}</UserID>
          <EMail>{userInfo.email}</EMail>
        </div>
      </UserDiv>
      <IconDiv>
        <IconItem>
          <FavIcon />
          Favorite
        </IconItem>
        <IconItem>
          <NotiIcon />
          Urgent
        </IconItem>
      </IconDiv>
      <ContentBox>
        <InterviewDiv>
          <InterviewItem>
            <span>카카오 디자이너 면접</span>
            <AddIcon />
          </InterviewItem>
          <InterviewItem>
            <span>카카오 개발자 면접</span>
          </InterviewItem>
          <AddProj onClick={handleMakeNewProject}>
            + 새 프로젝트 (면접) 추가
          </AddProj>
        </InterviewDiv>
      </ContentBox>
      <CurBox>
        <Curation>GOTCHA 큐레이션</Curation>
      </CurBox>
    </Wrapper>
  );
};

export default SideBar;

const Wrapper = styled.div`
  position: absolute;
  top: 5.8rem;
  width: 31.2rem;
  height: 100%;
  border-right: 0.05rem solid #e6e6e6;
  background-color: #fff;
`;

const UserDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1.8rem;

  //media-query 따라 조정
  padding: 2.6rem 2.4rem 2rem;

  border-bottom: 0.05rem solid #e6e6e6;

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.4em;
  }
`;

const UserProfile = styled.img`
  width: 5.2rem;
  height: 5.2rem;
  border-radius: 50%;
  background-color: var(--purple-100, #f3f2ff);
`;

const UserID = styled.div`
  color: var(--purple-600, #3733ff);

  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.06px;
`;

const EMail = styled.div`
  color: var(--Gray-1100, #1a1a1a);

  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.036px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 60%; //absolute로 띄우는 게 나을지?
`;

const IconDiv = styled.div`
  padding: 1.5rem 2.5rem;
  border-bottom: 0.05rem solid #e6e6e6;
`;

const IconItem = styled.div`
  display: flex;
  align-items: center;
  color: var(--Gray-700, #808080);

  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.036px;

  gap: 0.4rem;
`;

const InterviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  padding: 1.4rem 1rem;
`;

const InterviewItem = styled.div`
  //추후 컴포넌트 분리 가능성 O
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--Gray-1100, #1a1a1a);
  border-radius: 0.6rem;
  background: var(--purple-200, #e6e5ff);

  height: 3rem;
  padding: 0 1.4rem;

  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
`;

const AddProj = styled.button`
  color: var(--Gray-1100, #1a1a1a);

  font-size: 1.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 155%;
  letter-spacing: -0.042px;

  display: flex;
  justify-content: start;
`;

const CurBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Curation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 218px;
  height: 41px;
  flex-shrink: 0;

  border-radius: 2.6rem;
  border: 1px solid var(--purple-500, #8280ff);
  background: var(--purple-100, #f3f2ff);

  color: var(--purple-500, #8280ff);

  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 155%;
  letter-spacing: -0.048px;
`;
