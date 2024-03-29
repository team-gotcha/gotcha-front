import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Banner from '../components/main/Banner';
import ViewListStack from '../components/main/ViewListStack';
import ViewFinalSuccessfulApplier from '../components/main/ViewFinalSucessfulApplier';
import AddCommonQuestionModal from '../components/common/modal/AddCommonQuestionModal';
import WriteBoardIcon from '../assets/icons/WriteBoardIcon';
import ViewBoardStack from '../components/main/ViewBoardStack';
import CheckIcon from '../assets/icons/CheckIcon';
import { usePostCommonQuestions } from '../apis/post/usePostCommonQuestions';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useToggleModal } from '../hooks/useToggleModal';
import { modalContent, modalState } from '../recoil/modal';
import { interviewModeState } from '../recoil/mainview';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetApplicants } from '../apis/get/useGetApplicants';
import ViewListBox from '../components/main/ViewListBox';
import { useGetViewer } from '../apis/get/useGetViewer';
import { usePostSendPassEmail } from '../apis/post/usePostSendPassEmail';
import { useGetPassApplicants } from '../apis/get/useGetPassApplicants';

const MainInterview = () => {
  const navigate = useNavigate();
  const [isInterviewEmpty, setIsInterviewEmpty] = useState(false);
  const [applicantsList, setApplicantsList] = useState([]);
  const [memberList, setMemberList] = useState([]);

  const [isListView, setIsListView] = useRecoilState(interviewModeState);
  const [preparationApplierList, setPreparationApplierList] = useState([]);
  const [inProgressApplierList, setInProgressApplierList] = useState([]);
  const [completionApplierList, setCompletionApplierList] = useState([]);

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

  //modal관리
  const { openModal } = useToggleModal();
  const [modalItem, setModalItem] = useRecoilState(modalContent);

  const handleAddCommonQuestions = () => {
    console.log('모달');
    setModalItem(<AddCommonQuestionModal interviewId={interview_id} />);
    openModal();
  };

  const handleMoveToAddApplicant = () => {
    navigate(`/ready/${interview_id}/0`);
  };

  //이메일 보내기
  const fetchData = usePostSendPassEmail();
  const handleSendPassEmail = () => {
    fetchData.sendPassEmail(Number(interview_id));
  };

  //applicant data 받아오기
  const fetchedData = useGetApplicants(Number(interview_id));
  useEffect(() => {
    if (!fetchedData.isLoading) {
      setApplicantsList(fetchedData.applicants);
    }
  }, [fetchedData.isLoading, interview_id]);

  //합격자 명단 받아오기
  const fetchedPassData = useGetPassApplicants(Number(interview_id));
  useEffect(() => {
    if (!fetchedPassData.isLoading) {
      console.log(fetchedPassData.passApplicants);
    }
  }, [fetchedPassData.isLoading, interview_id]);

  useEffect(() => {
    if (applicantsList.length !== 0) {
      setPreparationApplierList(
        fetchedData.applicants.filter(
          (item: any) => item.status === 'PREPARATION'
        )
      );
      setInProgressApplierList(
        fetchedData.applicants.filter(
          (item: any) => item.status === 'IN_PROGRESS'
        )
      );
      setCompletionApplierList(
        fetchedData.applicants.filter(
          (item: any) => item.status === 'COMPLETION'
        )
      );
    }
  }, [applicantsList]);

  return (
    <MainWrapper>
      <Banner />
      <NotiBar>
        <ViewFinalSuccessfulApplier
          groupMembers={memberList}
          handleSendPassEmail={handleSendPassEmail}
          disabled={completionApplierList.length === 0}
          isComplete={
            completionApplierList.length === applicantsList.length &&
            completionApplierList.length !== 0
          }
        />
        <AddCommonQuestionButton onClick={handleAddCommonQuestions}>
          공통 질문 작성하기
          <WriteBoardIcon width="2.4rem" />
        </AddCommonQuestionButton>
      </NotiBar>

      {isListView ? (
        // 리스트뷰
        <ViewListBox isEmptyNeed={true} interview_id={Number(interview_id)} />
      ) : (
        // 보드뷰
        <BoardWrapper>
          <BoardBox>
            <BoardStackTitle>
              면접 전
              <AddApplierButton onClick={handleMoveToAddApplicant}>
                + 지원자 추가
              </AddApplierButton>
            </BoardStackTitle>
            {preparationApplierList.map((item, index) => (
              <ViewBoardStack
                isEmpty={false}
                applicantData={item}
                interviewId={interview_id}
              />
            ))}
            {!preparationApplierList.length && (
              <ViewBoardStack isEmpty={true} />
            )}
          </BoardBox>

          <BoardBox>
            <BoardStackTitle>면접 진행 중</BoardStackTitle>
            {inProgressApplierList.map((item, index) => (
              <ViewBoardStack
                isEmpty={false}
                applicantData={item}
                interviewId={interview_id}
              />
            ))}
          </BoardBox>

          <BoardBox>
            <BoardStackTitle>면접 완료</BoardStackTitle>
            {completionApplierList.length !== 0 && (
              <ViewFinalStack
                onClick={() => {
                  navigate(`/result/${interview_id}`);
                }}
              >
                <FinalStackTitle>
                  <CheckIcon />
                  {completionApplierList.length}
                  명의 면접이 완료되었습니다.
                </FinalStackTitle>
                <FinalStackSubtitle>
                  갓챠가 분석한 면접 결과를 확인해주세요!
                </FinalStackSubtitle>
                {Array.from({
                  length: completionApplierList.length + 1,
                }).map((_, index) => (
                  <ViewFinalStackFooter key={index} />
                ))}
              </ViewFinalStack>
            )}
          </BoardBox>
        </BoardWrapper>
      )}
    </MainWrapper>
  );
};

export default MainInterview;

// Board

const ViewFinalStackFooter = styled.div`
  width: 100%;
  height: 1rem;
  border-bottom: 1px solid var(--purple-100, #f3f2ff);
  background: var(--Gray-100, #fff);
`;

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;
const BoardBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 30%;
`;
const BoardStackTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 2.7rem;
  padding-right: 3rem;
  align-items: center;

  height: 4.8rem;
  width: 100%;

  margin-bottom: 1.2rem;
  color: ${(props) => props.theme.colors.gray.gray600};
  ${(props) => props.theme.fontStyles.subtitle.subtitleRegular};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;

  border-radius: 0.8rem;
  border: 1px solid ${(props) => props.theme.colors.purple.purple100};
  background: ${(props) => props.theme.colors.gray.gray100};
`;
const AddApplierButton = styled.button`
  color: ${(props) => props.theme.colors.purple.purple600};
  ${(props) => props.theme.fontStyles.caption.captionRegular};
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
`;

const ViewFinalStack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding-top: 2rem;

  width: 100%;
  flex-shrink: 0;
  gap: 0.5rem;

  cursor: pointer;

  border-radius: 0.75rem 0.75rem 0rem 0rem;
  border: 1px solid ${(props) => props.theme.colors.purple.purple200};
  background-color: ${(props) => props.theme.colors.gray.gray100};
`;
const FinalStackTitle = styled.div`
  color: ${(props) => props.theme.colors.purple.purple600};
  ${(props) => props.theme.fontStyles.title.titleMedium};
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
`;
const FinalStackSubtitle = styled.div`
  color: ${(props) => props.theme.colors.gray.gray600};
  ${(props) => props.theme.fontStyles.caption.captoionRegular};
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
`;

// List

const NotiBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 1.4rem;
  margin-bottom: 2.8rem;
`;
const AddCommonQuestionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 2rem;
  align-items: center;
  gap: 0.4rem;

  ${(props) => props.theme.fontStyles.button.buttonLarge};
  font-size: 1.6rem;
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
