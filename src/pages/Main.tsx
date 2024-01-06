import React from 'react';
import styled from 'styled-components';

import DropDownBox from '../components/common/DropDownBox';
import Banner from '../components/main/Banner';
import ViewListStack from '../components/main/ViewListStack';
import ViewBoardStack from '../components/main/ViewBoardStack';

const Main = () => {
  return (
    <>
      This is MainPage
      <Banner />
      <ViewListStack />
      <ViewBoardStack />
    </>
  );
};

export default Main;
