import React, { useState } from "react";
import { styled } from "styled-components";

const QuestionItem = () => {
  return (
    <Container>
      <ImpScoreDiv>
        <Title>중요도</Title>
        <ScoreBox>1 2 3 4 5</ScoreBox>
      </ImpScoreDiv>
      <QuestionDiv>
        <QuestionBox>
          <ClassTag>개별 질문</ClassTag>
          <Question>이전 직장에서 한 @ 프로젝트에서 ~</Question>
        </QuestionBox>
        <Answer></Answer>
      </QuestionDiv>
    </Container>
  );
};

export default QuestionItem;

const Container = styled.div``;

const ImpScoreDiv = styled.div``;

const Title = styled.div``;

const ScoreBox = styled.div``;

const QuestionDiv = styled.div``;

const QuestionBox = styled.div``;

const ClassTag = styled.div``;

const Question = styled.div``;

const Answer = styled.input``;
