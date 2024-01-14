import React, { useState } from "react";
import { styled } from "styled-components";

const QuestionOpenModal = () => {
  return (
    <Container>
      <TopContent>질문 공개 여부</TopContent>
      <Guide>
        GOTCHA에게 질문을 공개할까요? <br /> 공개된 질문은 GOTCHA 큐레이션
        자료로 사용됩니다.
      </Guide>
      <ButtonDiv>
        <NoBtn>아니오</NoBtn>
        <YesBtn>네</YesBtn>
      </ButtonDiv>
    </Container>
  );
};

export default QuestionOpenModal;

const Container = styled.div``;

const TopContent = styled.div``;

const Guide = styled.div``;

const ButtonDiv = styled.div``;

const NoBtn = styled.div``;

const YesBtn = styled.div``;
