import React, { useState } from 'react';
import styled from 'styled-components';
import Banner from '../components/main/Banner';
import ViewListStack from '../components/main/ViewListStack';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from '../recoil/modal';
import { useToggleModal } from '../hooks/useToggleModal';
import { useLocation } from 'react-router-dom';

const MainProject = () => {
  const [isProjectEmpty, setIsProjectEmpty] = useState(false);
  const [todayInterviewNum, setTodayInterviewNum] = useState(3);
  const [groupMemberList, setGroupMemberList] = useState([
    'A',
    'B',
    'C',
    'D',
    'E',
  ]);

  //modal관리
  const isModalOpen = useRecoilValue(modalState);
  const { openModal } = useToggleModal();

  const location = useLocation();
  const { pathname } = location;
  let interview_id = '';
  let project_id = '';
  // pathname에서 interview_id 또는 project_id 추출
  const pathSegments = pathname.split('/');
  if (pathSegments.includes('interview')) {
    const index = pathSegments.indexOf('interview');
    interview_id = pathSegments[index + 1];
  } else if (pathSegments.includes('project')) {
    const index = pathSegments.indexOf('project');
    project_id = pathSegments[index + 1];
  }

  //custom -hook

  return (
    <>
      <MainWrapper>
        <Banner todayInterviewNum={todayInterviewNum} />

        <InterviewListWrapper>
          {isProjectEmpty && (
            <>
              <ViewListWrapper>
                <ProjectEmptyComment>
                  + 첫 면접을 만들어주세요!
                </ProjectEmptyComment>
                <StackWrapper>
                  <ViewListStack isEmpty={isProjectEmpty} />
                </StackWrapper>
              </ViewListWrapper>
            </>
          )}
          {!isProjectEmpty && (
            <>
              <ViewListWrapper>
                <InterviewTitle>세부 면접 이름</InterviewTitle>
                <StackWrapper>
                  <ViewListStack isEmpty={isProjectEmpty} />
                  <ViewListStack isEmpty={isProjectEmpty} />
                  <ViewListStack isEmpty={isProjectEmpty} />
                </StackWrapper>
              </ViewListWrapper>
              <ViewListWrapper>
                <InterviewTitle>세부 면접 이름</InterviewTitle>
                <StackWrapper>
                  <ViewListStack isEmpty={isProjectEmpty} />
                  <ViewListStack isEmpty={isProjectEmpty} />
                </StackWrapper>
              </ViewListWrapper>
              {isModalOpen && <h1>모달</h1>}
            </>
          )}
        </InterviewListWrapper>
      </MainWrapper>
    </>
  );
};

export default MainProject;

const InterviewTitle = styled.div`
  color: ${(props) => props.theme.colors.gray.gray1100};
  ${(props) => props.theme.fontStyles.title.titleRegular};

  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
`;
const InterviewListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.6rem;
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
