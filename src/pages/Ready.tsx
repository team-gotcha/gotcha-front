import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import CardTitleBoard from '../components/cardview/CardTitleBoard';
import InterviewerInfo from '../components/cardview/InterviewerInfo';
import MemoItem from '../components/cardview/MemoItem';
import MemoInput from '../components/cardview/MemoInput';

import QuestionCheckModal from '../components/cardview/modal/QuestionCheckModal';
import QuestionOpenModal from '../components/cardview/modal/QuestionOpenModal';

import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { renderState } from '../recoil/cardview';

import { useGetIndivQuestions } from '../apis/get/useGetIndivQuestions';

import { usePostUserReady } from '../apis/post/usePostUserReady';
import { usePostUserDetail } from '../apis/post/usePostUserDetail';
import { usePatchFiles } from '../apis/patch/usePatchFiles';

//test
interface DetailInfoProps {
  name: string;
  date: string;
  interviewers: { id: string }[];
  age: number;
  education: string;
  position: string;
  phoneNumber: string;
  path: string;
  email: string;
  keywords: { name: string; keywordType: string }[];
  interviewId: string;
}

interface QuestionProps {
  asking: boolean;
  commentTargetId: number;
  content: string;
  id: number;
  writerName: string;
  writerProfile: string;
}

const Ready = () => {
  const navigate = useNavigate();
  let { user_id } = useParams();
  const userIdNumber: number = parseInt(user_id, 10);
  let { interview_id } = useParams();
  const InterviewIdNumber: number = parseInt(interview_id, 10);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState([]);
  const [isModify, setIsModify] = useState(true);

  const render = useRecoilValue(renderState);
  const setRender = useSetRecoilState(renderState);

  //custom-hook
  const postReadyData = usePostUserReady();

  const getIndivQuestionData = useGetIndivQuestions(userIdNumber, render);

  //user-id 설정
  useEffect(() => {
    if (userIdNumber !== 0) {
      setIsModify(false);
    }
  }, []);

  //로딩되었을 때 댓글 정보 세팅하기
  useEffect(() => {
    if (!getIndivQuestionData.isLoading && !isModify) {
      const newData = getIndivQuestionData.indivQuestion || [];
      console.log(getIndivQuestionData.indivQuestion);
      if (newData.length !== 0) {
        setComments(
          newData?.filter(
            (comment: QuestionProps) => comment.commentTargetId === null
          )
        );
        setReply(
          newData?.filter(
            (comment: QuestionProps) => comment.commentTargetId !== null
          )
        );
      }
    }
  }, [!getIndivQuestionData.isLoading, render, user_id]);

  const handleNext = () => {
    postReadyData.readyToPost(userIdNumber);
    setIsOpen(!isOpen);
    setRender(render - 1);
  };

  const handleCheckModal = () => {
    setIsOpen(!isOpen);
    setRender(render - 1);
  };

  return (
    <>
      <Wrapper>
        <Background
          onClick={() => navigate(`/main/interview/${interview_id}`)}
        />
        <Container>
          <CardTitleBoard btnFunc={handleNext} />
          <Contents>
            <InputDiv>
              <InterviewerInfo modify={isModify} setIsModify={setIsModify} />
            </InputDiv>
            <MemoDiv>
              {comments &&
                comments.map((item, index) => (
                  <MemoItem key={index} item={item} reply={reply} />
                ))}

              {isModify ? (
                <Memo>지원자 정보를 먼저 입력해주세요!</Memo>
              ) : (
                <MemoInput />
              )}
            </MemoDiv>
          </Contents>
        </Container>
      </Wrapper>
      {isOpen && (
        <ModalWrapper>
          <ModalBackground onClick={handleCheckModal} />
          <QuestionCheckModal
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            setIsOpenModal={setIsOpenModal}
          />
        </ModalWrapper>
      )}
      {isOpenModal && (
        <ModalWrapper2>
          <ModalBackground2 onClick={() => setIsOpenModal(!isOpenModal)} />
          <QuestionOpenModal setIsOpenModal={setIsOpenModal} />
        </ModalWrapper2>
      )}
    </>
  );
};

export default Ready;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Background = styled.div`
  position: fixed;
  z-index: 5;
  width: 100%;
  height: 100%;
  background: var(--gray-background-gray-55, rgba(50, 50, 50, 0.55));
  backdrop-filter: blur(6px);
`;

const Container = styled.div`
  position: absolute;
  z-index: 5;
  background-color: #fff;
  border-radius: 1.2rem;

  width: 95%;
  height: 84%;

  overflow: hidden;
  border: 1px solid var(--purple-300, #cdccff);
`;

const Contents = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 93%;
`;

const InputDiv = styled.div`
  overflow-y: auto;
  width: 100%;
  /* padding: 6.8rem 3.5rem; */

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MemoDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  // 위 속성 먹이면 스크롤이 안 됨...
  padding: 2rem 2rem 0 2rem;
  margin-bottom: 2rem;
  border-left: 0.1rem solid #e6e6e6;
  overflow-y: auto;

  gap: 0.8rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Memo = styled.span`
  color: var(--Gray-300, #e6e6e6);
  font-size: 2.6rem;
  text-align: center;

  font-style: normal;
  font-weight: 600;
  line-height: 155%;
`;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
`;

const ModalBackground = styled(Background)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 150;
`;

const ModalWrapper2 = styled(ModalWrapper)`
  z-index: 300;
`;

const ModalBackground2 = styled(ModalBackground)`
  z-index: 150;
`;
