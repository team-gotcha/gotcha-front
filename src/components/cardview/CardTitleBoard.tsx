import React, { useState } from "react";
import { styled } from "styled-components";

const CardTitleBoard = () => {
  return (
    <TopDiv>
      <InfoDiv>
        <InterviewState>면접 진행 중</InterviewState>
        <Title>UXUI 디자이너 면접</Title>
      </InfoDiv>
      <FinBtn>면접 준비 완료</FinBtn>
    </TopDiv>
  );
};

export default CardTitleBoard;

const TopDiv = styled.div``;

const InfoDiv = styled.div``;

const InterviewState = styled.div``;

const Title = styled.div``;

const FinBtn = styled.div``;
