import React from "react";
import styled from "styled-components";

import CardTitleBoard from "../components/cardview/CardTitleBoard";
import InterviewerInfo from "../components/cardview/InterviewerInfo";
import QuestionItem from "../components/cardview/QuestionItem";

import ReviewModal from "../components/cardview/modal/ReviewModal";

const InProgress = () => {
  return (
    <>
      <Background />
      <Container>
        <CardTitleBoard />
        <Contents>
          <InterviewerInfo />
          <MemoDiv>
            <QuestionItem />
            <QuestionItem />
            <QuestionItem />
            <QuestionItem />
          </MemoDiv>
        </Contents>
      </Container>
    </>
  );
};

export default InProgress;

const Background = styled.div``;

const Container = styled.div``;

const Contents = styled.div``;

const MemoDiv = styled.div``;
