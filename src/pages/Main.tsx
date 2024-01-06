import React from 'react';
import styled from 'styled-components';

import DropDownBox from '../components/common/DropDownBox';
import Banner from '../components/main/Banner';
import ViewListStack from '../components/main/ViewListStack';

const Main = () => {
  return (
    <>
      This is MainPage
      <Banner />
      <ViewListStack />
    </>
  );
};

export default Main;
