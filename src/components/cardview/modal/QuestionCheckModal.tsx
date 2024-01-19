import React, { useState } from "react";
import { styled } from "styled-components";

import QuestionItem from "../QuestionItem";
import InfoIcon from "../../../assets/icons/InfoIcon";

import info from "../../../assets/images/InfoIcon-blue.svg";

interface BaseModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionCheckModal = ({
  isOpen,
  setIsOpen,
  setIsOpenModal,
}: BaseModalProps) => {
  const handleBtn = () => {
    setIsOpenModal(true);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Container>
        <Topbar>
          <InfoBox>
            <Title>갓차린 면접자 질문 확인</Title>
            <Info src={info} />
          </InfoBox>
          <StartBtn onClick={handleBtn}>면접 전형 시작</StartBtn>
        </Topbar>
        <Box>
          <QuestionContainer>
            <QuestionItem />
            <QuestionItem />
            <QuestionItem />
            <QuestionItem />
            <QuestionItem />
            <QuestionItem />
            <QuestionItem />
            <QuestionItem />
          </QuestionContainer>
        </Box>
      </Container>
    </>
  );
};

export default QuestionCheckModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  border-radius: 1.2rem;
  overflow: hidden;
  z-index: 30;
`;

const Topbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5.6rem;
  padding: 0 2rem 0 4rem;

  border-radius: 1.2rem 1.2rem 0px 0px;
  border: 1px solid var(--purple-300, #cdccff);
  background: var(--blue-200, #e5ecff);
  box-shadow: 0px 6px 10px 2px rgba(192, 214, 255, 0.25);
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Title = styled.div`
  color: var(--purple-600, #3733ff);

  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 28px */
  letter-spacing: -0.06px;
`;

const Info = styled.img`
  width: 16px;
  height: 16px;
`;

const StartBtn = styled.button`
  display: flex;
  padding: 6px 26px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 16px;
  background: var(--purple-600, #3733ff);
  color: var(--Gray-100, #fff);

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 155%; /* 21.7px */
  letter-spacing: -0.042px;

  box-shadow: 0px 0px 6px 2px rgba(215, 215, 215, 0.15);
`;
const Box = styled.div`
  padding: 2rem;
  background-color: #fff;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  padding: 0 1.2rem 0 2.1rem;
  background-color: #fff;
  border-radius: 0px 0px 1.2rem 1.2rem;

  max-height: 66.2rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #e6e6e6; /* 스크롤바의 색상 */

    border-radius: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;
