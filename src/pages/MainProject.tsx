import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Banner from '../components/main/Banner';
import ViewListStack from '../components/main/ViewListStack';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalContent, modalState } from '../recoil/modal';
import { useToggleModal } from '../hooks/useToggleModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { userInfoState, interviewNameListState } from '../recoil/userInfo';
import { useGetApplicants } from '../apis/get/useGetApplicants';
import ViewListBox from '../components/main/ViewListBox';
import AddInterviewModal from '../components/common/modal/AddInterviewModal';

const MainProject = () => {
  const [interviewList, setInterviewList] = useState([]);
  const [isProjectEmpty, setIsProjectEmpty] = useState(true);
  const navigate = useNavigate();

  //Modal관리
  const [modalItem, setModalItem] = useRecoilState(modalContent);
  const isModalOpen = useRecoilValue(modalState);
  const { openModal } = useToggleModal();

  const handleMakeNewInterview = (projectId: number) => {
    setModalItem(<AddInterviewModal projectId={projectId} />);
    openModal();
  };

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

  //전역변수
  const GlobalUserInfo = useRecoilValue(userInfoState);
  const [interviewNameList, setInterviewNameList] = useRecoilState(
    interviewNameListState
  );

  if (project_id === '0') {
    //초기화면
    //alert('초기화면');
  }

  useEffect(() => {
    const filteredList = GlobalUserInfo.projects
      .filter((project) => String(project.projectId) === project_id)
      .map((project) => project.interviews)[0];

    setInterviewList(filteredList || []);
    setInterviewNameList(filteredList);
  }, [GlobalUserInfo, project_id]);

  useEffect(() => {
    if (interviewList.length === 0) {
      setIsProjectEmpty(true);
    } else {
      setIsProjectEmpty(false);
    }
  }, [interviewList]);

  return (
    <>
      <MainWrapper>
        <Banner />

        <InterviewListWrapper>
          {isProjectEmpty && (
            <>
              <ViewListWrapper>
                <ProjectEmptyComment
                  onClick={() => handleMakeNewInterview(Number(project_id))}
                >
                  + 첫 면접을 만들어주세요!
                </ProjectEmptyComment>
              </ViewListWrapper>
            </>
          )}
          {!isProjectEmpty && (
            <>
              {interviewList.map((interview, index) => (
                <ViewListWrapper key={index}>
                  <InterviewTitle>{interview.interviewName}</InterviewTitle>
                  <ViewListBox
                    isEmptyNeed={false}
                    interview_id={interview.interviewId}
                  />
                </ViewListWrapper>
              ))}
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

const ProjectEmptyComment = styled.button`
  color: ${(props) => props.theme.colors.purple.purple700};
  ${(props) => props.theme.fontStyles.title.titleRegular};
  font-size: 2rem;
  font-weight: 400;

  cursor: pointer;

  display: flex;
  justify-content: flex-start;
`;
