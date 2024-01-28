import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import CardTitleBoard from "../components/cardview/CardTitleBoard";
import InterviewerInfo from "../components/cardview/InterviewerInfo";
import ResultReviewBoxDetail from "../components/cardview/ResultReviewBoxDetail";
import QuestionItem from "../components/cardview/QuestionItem";

import DropDownBox from "../components/common/DropDownBox";

import { useGetRankingPoint } from "../apis/get/useGetRankingPoint";
import { useGetEvalQuestion } from "../apis/get/useGetEvalQuestion";
import { useGetAllEvaluations } from "../apis/get/useGetAllEvaluations";

const questions = ["질문 1", "질문 2", "질문 3"];

const ResultDetail = () => {
  let { user_id } = useParams();
  const userIdNumber: number = parseInt(user_id, 10);
  const [items, setItems] = useState();

  const RankingData = useGetRankingPoint(userIdNumber);
  const QEvaluationData = useGetEvalQuestion(1); //QuestionId 보내줘야 함
  const AllEvaluationData = useGetAllEvaluations(userIdNumber);

  useEffect(() => {
    if (!AllEvaluationData.isLoading) {
      console.log("확인 질문 데이터 세팅", AllEvaluationData);
      setItems(AllEvaluationData.allEvaluationsInfo);
      console.log(RankingData, QEvaluationData, AllEvaluationData);
    }
  }, [!AllEvaluationData.isLoading]);

  return (
    <Wrapper>
      <Background />
      <Container>
        <CardTitleBoard
          state="면접 완료"
          btnText="최종합격"
          del={true}
          color={3}
        />
        <Contents>
          <InputDiv>
            <InterviewerInfo modify={false} />
          </InputDiv>
          <RightBox>
            {items && <ResultReviewBoxDetail detailData={items} />}
            <QuestionInfoBox>
              <InfoBox>
                <DropDownBox />
                <Comments>
                  평가 점수가 <span>17.0점</span>으로 가장 높은 질문입니다.
                </Comments>
              </InfoBox>
              <QuestionBox>
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
                <QuestionItem />
              </QuestionBox>
            </QuestionInfoBox>
          </RightBox>
        </Contents>
      </Container>
    </Wrapper>
  );
};

export default ResultDetail;

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
  grid-template-columns: repeat(2, 1fr);
  height: 93%;
`;

const InputDiv = styled.div`
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  border-left: 0.1rem solid #e6e6e6;
  overflow-y: auto;

  padding-bottom: 4rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const QuestionInfoBox = styled.div`
  padding: 0 1.5rem;
`;

const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;

  height: 35.6rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2.2rem;
  margin-bottom: 1.2rem;
`;

const Comments = styled.div`
  word-break: keep-all;
  color: var(--Gray-800, #666);

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 155%; /* 24.8px */
  letter-spacing: -0.048px;

  span {
    color: var(--purple-600, #3733ff);

    font-weight: 500;
  }
`;
