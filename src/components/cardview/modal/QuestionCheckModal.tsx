import React, { useState } from "react";
import { styled } from "styled-components";

import QuestionItem from "../QuestionItem";

const QuestionCheckModal = () => {
  return (
    <Container>
      <Topbar>
        <InfoBox>
          <Title>갓차린 면접자 질문 확인</Title>
          <InfoIcon />
        </InfoBox>
        <StartBtn>면접 전형 시작</StartBtn>
      </Topbar>
      <QuestionContainer>
        <QuestionItem />
        <QuestionItem />
        <QuestionItem />
        <QuestionItem />
      </QuestionContainer>
    </Container>
  );
};

export default QuestionCheckModal;

const Container = styled.div``;

const Topbar = styled.div``;

const InfoBox = styled.div``;

const Title = styled.div``;

const InfoIcon = styled.div``;

const StartBtn = styled.div``;

const QuestionContainer = styled.div``;
