import React from 'react';
import styled from 'styled-components';

import DropDownBox from '../components/common/DropDownBox';
import Banner from '../components/main/Banner';
import ViewListStack from '../components/main/ViewListStack';
import ViewBoardStack from '../components/main/ViewBoardStack';
import AddProjectModal from '../components/common/modal/AddProjectModal';
import AddInterviewModal from '../components/common/modal/AddInterviewModal';

const Main = () => {
  return (
    <>
      This is MainPage
      <AddInterviewModal />
      This is MainPage
      <AddProjectModal />
      <Banner />
      <ViewListStack />
      <ViewBoardStack />
    </>
  );
};

export default Main;
