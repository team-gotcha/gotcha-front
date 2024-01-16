import React, { useState } from 'react';
import styled from 'styled-components';

import Banner from '../components/main/Banner';
import ViewListStack from '../components/main/ViewListStack';
import ViewFinalSuccessfulApplier from '../components/main/ViewFinalSucessfulApplier';
import AddCommonQuestionModal from '../components/common/modal/AddCommonQuestionModal';
import WriteBoardIcon from '../assets/icons/WriteBoardIcon';
import ViewBoardStack from '../components/main/ViewBoardStack';
import CheckIcon from '../assets/icons/CheckIcon';

const MainInterview = () => {
  const [isInterviewEmpty, setIsInterviewEmpty] = useState(false);
  const [todayInterviewNum, setTodayInterviewNum] = useState(3);
  const [groupMemberList, setGroupMemberList] = useState(['A', 'B', 'C', 'D']);
  const [isListView, setIsListView] = useState(false); //true:목록뷰 false:보드뷰
  const [lastStageApplierNum, setLastStageApplierNum] = useState(3); //면접완료된 면접자 수 (보드뷰)

  return (
    <MainWrapper>
      <Banner todayInterviewNum={todayInterviewNum} />
      {/* QA용 토글 버튼 */}
      <div>
        <button
          onClick={() => {
            setIsListView(!isListView);
          }}
        >
          QA용 임시 토글 - 리스트뷰/보드뷰 (클릭 시 전환)
        </button>
      </div>

      <NotiBar>
        <ViewFinalSuccessfulApplier />
        <AddCommonQuestionButton>
          공통 질문 작성하기
          <WriteBoardIcon width="2.4rem" />
        </AddCommonQuestionButton>
      </NotiBar>

      {isListView ? (
        // 리스트뷰
        <StackWrapper>
          <ViewListStack
            isEmpty={isInterviewEmpty}
            groupMemberList={groupMemberList}
          />
          <ViewListStack
            isEmpty={isInterviewEmpty}
            groupMemberList={groupMemberList}
          />
          <ViewListStack
            isEmpty={isInterviewEmpty}
            groupMemberList={groupMemberList}
          />
        </StackWrapper>
      ) : (
        // 보드뷰
        <BoardWrapper>
          <BoardBox>
            <BoardStackTitle>
              면접 전<AddApplierButton>+ 지원자 추가</AddApplierButton>
            </BoardStackTitle>
            <ViewBoardStack groupMemberList={groupMemberList} />
          </BoardBox>
          <BoardBox>
            <BoardStackTitle>면접 진행 중</BoardStackTitle>
            <ViewBoardStack groupMemberList={groupMemberList} />
            <ViewBoardStack groupMemberList={groupMemberList} />
          </BoardBox>
          <BoardBox>
            <BoardStackTitle>면접 완료</BoardStackTitle>
            <ViewFinalStack>
              <FinalStackTitle>
                <CheckIcon />
                {lastStageApplierNum}명의 면접이 완료되었습니다.
              </FinalStackTitle>
              <FinalStackSubtitle>
                갓챠가 분석한 면접 결과를 확인해주세요!
              </FinalStackSubtitle>
              {Array.from({ length: lastStageApplierNum + 1 }).map(
                (_, index) => (
                  <ViewFinalStackFooter key={index} />
                )
              )}
            </ViewFinalStack>
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
  padding-left: 4rem;
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
const AddApplierButton = styled.div`
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
const AddCommonQuestionButton = styled.div`
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
