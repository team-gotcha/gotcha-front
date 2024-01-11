import React, { useState } from 'react';
import styled from 'styled-components';

import Banner from '../components/main/Banner';
import ViewListStack from '../components/main/ViewListStack';

const MainInterview = () => {
  const [isProjectEmpty, setIsProjectEmpty] = useState(false);
  const [todayInterviewNum, setTodayInterviewNum] = useState(3);
  const [groupMemberList, setGroupMemberList] = useState([
    'A',
    'B',
    'C',
    'D',
    'E',
  ]);

  return (
    <MainWrapper>
      <Banner todayInterviewNum={todayInterviewNum} />

      <ViewListWrapper>
        {isProjectEmpty && (
          <ProjectEmptyComment>+ 첫 면접을 만들어주세요!</ProjectEmptyComment>
        )}
        <InterviewTitle>세부 면접 이름</InterviewTitle>
        <StackWrapper>
          <ViewListStack
            isEmpty={isProjectEmpty}
            groupMemberList={groupMemberList}
          />
          <ViewListStack
            isEmpty={isProjectEmpty}
            groupMemberList={groupMemberList}
          />
          <ViewListStack
            isEmpty={isProjectEmpty}
            groupMemberList={groupMemberList}
          />
        </StackWrapper>
      </ViewListWrapper>
      <ViewListWrapper>
        {isProjectEmpty && (
          <ProjectEmptyComment>+ 첫 면접을 만들어주세요!</ProjectEmptyComment>
        )}
        <InterviewTitle>세부 면접 이름</InterviewTitle>
        <StackWrapper>
          <ViewListStack
            isEmpty={isProjectEmpty}
            groupMemberList={groupMemberList}
          />
          <ViewListStack
            isEmpty={isProjectEmpty}
            groupMemberList={groupMemberList}
          />
        </StackWrapper>
      </ViewListWrapper>
    </MainWrapper>
  );
};

export default MainInterview;

const InterviewTitle = styled.div`
  color: ${(props) => props.theme.colors.gray.gray1100};
  ${(props) => props.theme.fontStyles.title.titleRegular};

  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
`;

const ViewListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
`;
const StackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1.2rem;
  overflow: hidden;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4.4rem;
`;

const ProjectEmptyComment = styled.div`
  color: ${(props) => props.theme.colors.purple.purple700};
  ${(props) => props.theme.fontStyles.title.titleRegular};
  font-size: 2rem;
  font-weight: 400;
`;
