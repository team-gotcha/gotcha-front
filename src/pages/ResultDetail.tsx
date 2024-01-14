import React from "react";
import styled from "styled-components";

import CardTitleBoard from "../components/cardview/CardTitleBoard";
import InterviewerInfo from "../components/cardview/InterviewerInfo";
import ResultReviewBox from "../components/cardview/ResultReviewBox";
import QuestionItem from "../components/cardview/QuestionItem";

import DropDownBox from "../components/common/DropDownBox";

const Result = () => {
  return (
    <>
      <Background />
      <Container>
        <CardTitleBoard />
        <Contents>
          <InterviewerInfo />
          <RightBox>
            <ResultReviewBox />
            <QuestionInfoBox>
              <InfoBox>
                <DropDownBox />
                <Comments>
                  평가 점수가 <span>17.0점</span>으로 가장 높은 질문입니다.
                </Comments>
              </InfoBox>
              <QuestionItem />
              <QuestionItem />
            </QuestionInfoBox>
          </RightBox>
        </Contents>
      </Container>
    </>
  );
};

export default Result;

const Background = styled.div``;

const Container = styled.div``;

const Contents = styled.div``;

const RightBox = styled.div``;

const QuestionInfoBox = styled.div``;

const InfoBox = styled.div``;

const Comments = styled.div``;
