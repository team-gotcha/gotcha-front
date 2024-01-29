import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetLogin } from '../apis/get/useGetLogin';
import { useGetUserInfo } from '../apis/get/useGetUserInfo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState, userInfoState } from '../recoil/userInfo';
import { useGetProjectList } from '../apis/get/useGetProjectList';
import { usePatchUserEmail } from '../apis/patch/usePatchUserEmail';
import { useToggleModal } from '../hooks/useToggleModal';
import { modalContent, modalState } from '../recoil/modal';
import AddEmailModal from '../components/common/modal/AddEmailModal';

const MainCallback = () => {
  //전역상태
  const isModalOpen = useRecoilValue(modalState);
  const { openModal } = useToggleModal();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [modalItem, setModalItem] = useRecoilState(modalContent);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const navigate = useNavigate();

  const location = useLocation();
  const isEmailSet = new URLSearchParams(location.search).get('isEmailSet');

  //유저데이터 세팅
  const fetchedProjectData = useGetProjectList();
  useEffect(() => {
    if (!fetchedProjectData.isLoading) {
      console.log('유저데이터 세팅');
      setUserInfo(fetchedProjectData.projectList);
      console.log(isEmailSet);
      //이메일 여부 판단
      if (fetchedProjectData.projectList.userEmail === null && !isEmailSet) {
        console.log('이메일입력');
        //이메일입력 모달
        setModalItem(<AddEmailModal />);
        openModal();
        navigate('/');
      } else if (fetchedProjectData.projectList.projects.length > 0) {
        console.log('메인으로!');
        const firstProjectId =
          fetchedProjectData.projectList.projects[0].projectId;
        navigate(`/main/project/${firstProjectId}`);
      } else if (fetchedProjectData.projectList.projects.length === 0) {
        console.log('온보딩으로!');
        navigate('/onboarding/1');
      }
    }
  }, [!fetchedProjectData.isLoading]);

  return (
    <div>
      <h1>This is MainCallback</h1>
    </div>
  );
};

export default MainCallback;
