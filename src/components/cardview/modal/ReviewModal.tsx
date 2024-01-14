import React, { useState } from "react";
import { styled } from "styled-components";

const ReviewModal = () => {
  return (
    <Container>
      <TopContent>
        <span>갓차린</span>님에 대한 한줄평을 남겨주세요.
      </TopContent>
      <InputField></InputField>
      <FinishBtn>면접 완료</FinishBtn>
    </Container>
  );
};

export default ReviewModal;

const Container = styled.div``;

const TopContent = styled.div``;

const InputField = styled.textarea``;

const FinishBtn = styled.div``;
