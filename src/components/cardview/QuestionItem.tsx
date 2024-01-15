import React, { useState } from "react";
import { styled } from "styled-components";

const QuestionItem = ({ isCommon = false }) => {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const handleScoreClick = (score: number) => {
    setSelectedScore(score);
  };

  return (
    <Wrapper>
      <Container isCommon={isCommon}>
        <ImpScoreDiv isCommon={isCommon}>
          <Title isCommon={isCommon}>중요도</Title>
          <ScoreBox>
            {[1, 2, 3, 4, 5].map((score) => (
              <Score
                key={score}
                selected={selectedScore === score}
                onClick={() => handleScoreClick(score)}
                isCommon={isCommon}
              >
                {score}
              </Score>
            ))}
          </ScoreBox>
        </ImpScoreDiv>
        <QuestionDiv>
          <QuestionBox isCommon={isCommon}>
            <ClassTag isCommon={isCommon}>
              {isCommon ? "공통질문" : "개별질문"}
            </ClassTag>
            <Question>이전 직장에서 한 @ 프로젝트에서 ~</Question>
          </QuestionBox>
          <InputBox>
            <Answer placeholder="답변을 입력해주세요." />
          </InputBox>
        </QuestionDiv>
      </Container>
    </Wrapper>
  );
};

export default QuestionItem;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  align-self: stretch;
  width: 100%;
  /* height: 100%; */
`;

const Container = styled.div<{ isCommon: boolean }>`
  display: grid;
  grid-template-columns: 1fr 4.8fr;
  width: 100%;
  border-radius: 1.2rem;
  border: 1px solid ${({ isCommon }) => (isCommon ? "#E6E5FF" : "#FFE2EC")};
  background: var(--Gray-100, #fff);
  box-shadow: 0px 0px 6px 2px rgba(215, 215, 215, 0.15);
`;

const ImpScoreDiv = styled.div<{ isCommon: boolean }>`
  display: flex;
  flex-direction: column;
  border-right: 1px solid
    ${({ isCommon }) => (isCommon ? "#E6E5FF" : "#FFE2EC")};
`;

const Title = styled.div<{ isCommon: boolean }>`
  padding: 1.6rem;
  border-bottom: 1px solid
    ${({ isCommon }) => (isCommon ? "#E6E5FF" : "#FFE2EC")};

  color: ${({ isCommon }) => (isCommon ? "#3733ff" : "#FF2070")};
  text-align: center;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.042px;
`;

const ScoreBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding: 1.6rem;
`;

const Score = styled.div<{ selected: boolean; isCommon: boolean }>`
  cursor: pointer;
  color: ${({ selected, isCommon }) =>
    selected ? (isCommon ? "#3733FF" : "#FF2070") : "#999"};

  text-align: center;

  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 155%; /* 24.8px */
  letter-spacing: 0.48px;
`;

const QuestionDiv = styled.div`
  align-self: stretch;
`;

const QuestionBox = styled.div<{ isCommon: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 1.6rem;
  width: 100%;
  border-bottom: 1px solid
    ${({ isCommon }) => (isCommon ? "#E6E5FF" : "#FFE2EC")};
`;

const ClassTag = styled.div<{ isCommon: boolean }>`
  display: flex;
  width: 7rem;
  padding: 2px 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 2rem;
  background: ${({ isCommon }) => (isCommon ? "#f4f7ff" : "#FFE2EC")};
  color: ${({ isCommon }) => (isCommon ? "#8280ff" : "#FF2070")};

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */
  letter-spacing: -0.036px;
  white-space: nowrap;
`;

const Question = styled.div`
  color: var(--Gray-1100, #1a1a1a);

  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 155%; /* 21.7px */
  letter-spacing: -0.042px;
`;

const InputBox = styled.div`
  padding: 1.2rem 1.6rem;
  display: flex;
  align-items: center;
`;

const Answer = styled.input`
  border: none;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.042px;

  & ::placeholder {
    color: var(--Gray-500, #b3b3b3);
  }
`;
