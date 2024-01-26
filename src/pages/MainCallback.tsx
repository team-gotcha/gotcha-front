import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetLogin } from '../apis/get/useGetLogin';
import { useGetUserInfo } from '../apis/get/useGetUserInfo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState, userInfoState } from '../recoil/userInfo';
import { useGetProjectList } from '../apis/get/useGetProjectList';

const MainCallback = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const navigate = useNavigate();
  //유저데이터 세팅
  const fetchedProjectData = useGetProjectList();
  useEffect(() => {
    if (!fetchedProjectData.isLoading) {
      console.log('유저데이터 세팅');
      console.log(fetchedProjectData.projectList);
      setUserInfo(fetchedProjectData.projectList);
      if (fetchedProjectData.projectList.projects.length > 0) {
        console.log('메인으로!');
        const firstProjectId =
          fetchedProjectData.projectList.projects[0].projectId;
        navigate(`/main/project/${firstProjectId}`);
      } else if (fetchedProjectData.projectList.projects.length === 0) {
        console.log('온보딩으로!');
        navigate('/onboarding');
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
