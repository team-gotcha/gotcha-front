import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import CardTitleBoard from "../components/cardview/CardTitleBoard";
import InterviewerInfo from "../components/cardview/InterviewerInfo";
import MemoItem from "../components/cardview/MemoItem";
import MemoInput from "../components/cardview/MemoInput";

import QuestionCheckModal from "../components/cardview/modal/QuestionCheckModal";
import QuestionOpenModal from "../components/cardview/modal/QuestionOpenModal";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { filesDataState } from "../recoil/cardview";

import { usePostUserReady } from "../apis/post/usePostUserReady";
import { usePostUserDetail } from "../apis/post/usePostUserDetail";
import { usePostFiles } from "../apis/post/usePostFiles";

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
  questions: { content: string }[];
}

// Mock data for testing
const testData: DetailInfoProps = {
  name: "최갓차",
  date: "2022-01-04",
  interviewers: [{ id: "1" }],
  age: 22,
  education: "이화여자대학교 컴퓨터공학과",
  position: "BE Engineer",
  phoneNumber: "423-456-7890",
  path: "사람인",
  email: "doe4@example.com",
  keywords: [
    { name: "열정적", keywordType: "TRAIT" },
    { name: "Node.js", keywordType: "SKILL" },
    { name: "단대 회장", keywordType: "EXPERIENCE" },
  ],
  interviewId: "4",
  questions: [
    { content: "강점에 대해서 얘기해보세요." },
    { content: "당신의 약점은 무엇입니까?" },
  ],
};

const Ready = () => {
  let { user_id } = useParams();
  const userIdNumber: number = parseInt(user_id, 10);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const filesData = useRecoilValue(filesDataState);

  console.log(filesData);

  //custom-hook
  const postReadyData = usePostUserReady();
  const postDetailData = usePostUserDetail();
  const userPostData = usePostFiles();

  /**
   * project 데이터 전송해 생성하는 기능
   */
  const handleSubmit = () => {
    // postReadyData.readyToPost(userIdNumber);
    // postDetailData.detailPost(testData);
    // userPostData.addFiles({
    //   applicantId: userIdNumber,
    //   resume: filesData.resume,
    //   portfolio: filesData.portfolios,
    // });
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Wrapper>
        <Background />
        <Container>
          <CardTitleBoard btnFunc={handleSubmit} />
          <Contents>
            <InputDiv>
              <InterviewerInfo />
            </InputDiv>
            <MemoDiv>
              <MemoItem />
              <MemoItem />
              <MemoItem />
              <MemoItem />
              <MemoInput applicantId={userIdNumber} />
            </MemoDiv>
          </Contents>
        </Container>
      </Wrapper>
      {isOpen && (
        <ModalWrapper>
          <ModalBackground onClick={() => setIsOpen(!isOpen)} />
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
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--gray-background-gray-55, rgba(50, 50, 50, 0.55));
  backdrop-filter: blur(6px);
`;

const Container = styled.div`
  position: absolute;
  z-index: 10;
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
  padding: 6.8rem 3.5rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MemoDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  // 위 속성 먹이면 스크롤이 안 됨...
  padding: 2rem;
  margin-bottom: 1rem;
  border-left: 0.1rem solid #e6e6e6;
  overflow-y: auto;

  gap: 0.8rem;

  &::-webkit-scrollbar {
    display: none;
  }
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
