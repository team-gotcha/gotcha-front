import React, { useState } from 'react';
import styled from 'styled-components';

import DropDownBox from '../components/common/DropDownBox';
import Banner from '../components/main/Banner';
import ViewListStack from '../components/main/ViewListStack';
import ViewBoardStack from '../components/main/ViewBoardStack';
import AddProjectModal from '../components/common/modal/AddProjectModal';
import AddInterviewModal from '../components/common/modal/AddInterviewModal';
import AddCommonQuestionModal from '../components/common/modal/AddCommonQuestionModal';
import ViewFinalSuccessfulApplier from '../components/main/ViewFinalSucessfulApplier';

const Main = () => {
  const [isProjectEmpty, setIsProjectEmpty] = useState(true);
  const [todayInterviewNum, setTodayInterviewNum] = useState(0);

  return (
    <>
      <Banner todayInterviewNum={todayInterviewNum} />
      <ViewListWrapper>
        {isProjectEmpty && (
          <ProjectEmptyComment>+ 첫 면접을 만들어주세요!</ProjectEmptyComment>
        )}
        <ViewListStack isEmpty={isProjectEmpty} />
      </ViewListWrapper>
    </>
  );
};

export default Main;

const ViewListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProjectEmptyComment = styled.div`
  color: ${(props) => props.theme.colors.purple.purple700};
  ${(props) => props.theme.fontStyles.title.titleRegular};
  font-size: 2rem;
  font-weight: 400;
`;
