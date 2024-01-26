import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import { usePostOpenorNot } from "../../../apis/post/usePostOpenorNot";

interface BaseModalProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionOpenModal = ({ setIsOpenModal }: BaseModalProps) => {
  const navigate = useNavigate();
  let { user_id } = useParams();
  const userIdNumber: number = parseInt(user_id, 10);
  let { interview_id } = useParams();
  const isOpen = usePostOpenorNot();

  const handleBtn = (agree: boolean) => {
    setIsOpenModal(false);
    isOpen.setIsOpen({ applicantId: userIdNumber, agree: agree });
    navigate(`/inprogress/${interview_id}/${userIdNumber}`);
  };

  return (
    <Container>
      <TopContent>질문 공개 여부</TopContent>
      <Content>
        <Guide>
          GOTCHA에게 질문을 공개할까요? <br /> 공개된 질문은 GOTCHA 큐레이션
          자료로 사용됩니다.
        </Guide>
        <ButtonDiv>
          <NoBtn onClick={() => handleBtn(false)}>아니오</NoBtn>
          <YesBtn onClick={() => handleBtn(true)}>네</YesBtn>
        </ButtonDiv>
      </Content>
    </Container>
  );
};

export default QuestionOpenModal;

const Container = styled.div`
  display: flex;
  min-width: 60rem;
  padding: 3rem 1rem;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  flex-shrink: 0;

  border-radius: 2rem;
  border: 1px solid var(--Gray-300, #e6e6e6);
  background: var(--Gray-100, #fff);
  z-index: 200;
`;

const TopContent = styled.div`
  color: var(--purple-600, #3733ff);
  text-align: center;

  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 155%; /* 37.2px */
  letter-spacing: 0.72px;

  width: 100%;
  padding-bottom: 1.3rem;
  border-bottom: 1px solid var(--Gray-300, #e6e6e6);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
`;

const Guide = styled.div`
  color: var(--Gray-1100, #1a1a1a);
  text-align: center;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 155%; /* 24.8px */
  letter-spacing: -0.048px;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  button {
    display: flex;
    width: 20rem;
    padding: 0.8rem 0;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;

    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 155%; /* 24.8px */
    letter-spacing: 0.48px;
  }
`;

const NoBtn = styled.button`
  color: var(--purple-600, #3733ff);

  border: 1.2px solid var(--purple-600, #3733ff);
  background: var(--Gray-100, #fff);
`;

const YesBtn = styled.button`
  color: #fff;
  background: var(--purple-600, #3733ff);
`;
