import React from "react";
import styled from "styled-components";

import CardTitleBoard from "../components/cardview/CardTitleBoard";
import InterviewerInfo from "../components/cardview/InterviewerInfo";
import MemoItem from "../components/cardview/MemoItem";

import QuestionCheckModal from "../components/cardview/modal/QuestionCheckModal";
import QuestionOpenModal from "../components/cardview/modal/QuestionOpenModal";

const Ready = () => {
  return (
    <>
      <Background />
      <Container>
        <CardTitleBoard />
        <Contents>
          <InterviewerInfo />
          <MemoDiv>
            <MemoItem />
            <MemoItem />
            <MemoItem />
            <MemoItem />
          </MemoDiv>
        </Contents>
      </Container>
    </>
  );
};

export default Ready;

const Background = styled.div``;

const Container = styled.div``;

const Contents = styled.div``;

const MemoDiv = styled.div``;
