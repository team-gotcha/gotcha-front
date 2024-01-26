import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import ResultViewerInfo from "./ResultviewerInfo";
import ResultReviewBox from "./ResultReviewBox";

const ResultInfoItem = () => {
  const navigate = useNavigate();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  let user_id = 1; //이거 받아다가 쓰세요!!!!! 수정 필요!!!!!

  let { interview_id } = useParams(); // 그리고 웬만하면 이것도 받아서 쓰셔요

  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  return (
    <Container>
      <TopDiv>
        <InfoDiv>
          <InterviewState>면접 완료</InterviewState>
          <Title>UX/UI 디자이너 면접</Title>
        </InfoDiv>
        <RightDiv>
          <FinBtn onClick={handleButtonClick} clicked={isButtonClicked}>
            최종 합격
          </FinBtn>
        </RightDiv>
      </TopDiv>
      <Contents onClick={() => navigate(`/result/${interview_id}/${user_id}`)}>
        <InputDiv>
          <ResultViewerInfo />
        </InputDiv>
        <ResultReviewBox />
      </Contents>
    </Container>
  );
};

export default ResultInfoItem;

const Container = styled.div`
  border: 1px solid var(--Gray-300, #e6e6e6);
  background: var(--Gray-100, #fff);
  box-shadow: 0px 5px 6px 3px rgba(112, 112, 112, 0.27);
  border-radius: 1.2rem;

  width: 100%;
`;

const Contents = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.72fr;
`;

const InputDiv = styled.div`
  overflow-y: auto;
  border-right: 0.1rem solid #e6e6e6;

  padding: 5rem 7rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TopDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5.6rem;
  padding: 0 2rem 0 4rem;

  border-radius: 1.2rem 1.2rem 0px 0px;
  /* border: 1px solid var(--purple-300, #cdccff); */

  background: #e5ecff;
  box-shadow: 0px 6px 10px 2px rgba(192, 214, 255, 0.25);
`;

const InfoDiv = styled.div`
  color: #3733ff;

  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const InterviewState = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 28px */
  letter-spacing: -0.06px;
`;

const Title = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.042px;
`;

const RightDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const FinBtn = styled.button<{ clicked: boolean }>`
  display: flex;
  padding: 6px 26px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 16px;
  background: ${({ clicked }) =>
    clicked ? "#fff" : "var(--purple-600, #3733ff)"};
  color: ${({ clicked }) => (clicked ? "var(--purple-600, #3733ff)" : "#fff")};

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 155%; /* 21.7px */
  letter-spacing: -0.042px;

  box-shadow: 0px 0px 6px 2px #c1c8ff;
`;
