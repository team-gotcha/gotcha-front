import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import CardTitleBoard from "../components/cardview/CardTitleBoard";
import InterviewerInfo from "../components/cardview/InterviewerInfo";
import QuestionItem from "../components/cardview/QuestionItem";
import ReviewModal from "../components/cardview/modal/ReviewModal";

import { useGetAllQuestion } from "../apis/get/useGetAllQuestion";

const InProgress = () => {
  let { user_id } = useParams();
  const userIdNumber: number = parseInt(user_id, 10);

  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);

  const allQuestionData = useGetAllQuestion(userIdNumber);

  useEffect(() => {
    if (!allQuestionData.isLoading) {
      console.log("모든 질문 데이터 세팅", allQuestionData);
      setItems(allQuestionData.allQuestion);
    }
  }, [!allQuestionData.isLoading]);

  return (
    <>
      <Wrapper>
        <Background />
        <Container>
          <CardTitleBoard
            color={2}
            btnText="면접 전형 완료"
            btnFunc={() => setIsOpen(!isOpen)}
          />
          <Contents>
            <InputDiv>
              <InterviewerInfo modify={false} wide={false} />
            </InputDiv>
            <MemoDiv>
              {items?.map((item) => (
                <QuestionItem
                  key={item?.id}
                  isCommon={item?.common}
                  questionId={item?.id}
                  content={item?.content}
                  importance={item.importance}
                />
              ))}
            </MemoDiv>
          </Contents>
        </Container>
      </Wrapper>
      {isOpen && (
        <ModalWrapper>
          <ModalBackground onClick={() => setIsOpen(!isOpen)} />
          <ReviewModal setIsOpen={setIsOpen} isOpen={isOpen} />
        </ModalWrapper>
      )}
    </>
  );
};

export default InProgress;

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
  z-index: 10;
  background-color: #fff;
  border-radius: 1.2rem;

  width: 95%;
  height: 84%;

  overflow: hidden;
`;

const Contents = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  height: 93%;
`;

const InputDiv = styled.div`
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #e6e6e6; /* 스크롤바의 색상 */

    border-radius: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const MemoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 2rem;
  /* margin-bottom: 5rem; */
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
  z-index: 15;
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 15;
`;
