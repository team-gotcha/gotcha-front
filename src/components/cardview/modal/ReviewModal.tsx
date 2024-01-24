import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import { usePostOneliner } from "../../../apis/post/usePostOneliner";

interface BaseModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewModal = ({ isOpen, setIsOpen }: BaseModalProps) => {
  const navigate = useNavigate();
  const postOnlinerData = usePostOneliner();

  const [oneLiner, setOneLiner] = useState("");

  const handleBtn = () => {
    postOnlinerData.addOneliner({
      applicantId: 1, //나중에 수정해야함!!
      content: oneLiner,
    });
    setIsOpen(false);
    navigate("/result");
  };
  return (
    <Container>
      <TopContent>
        <span>갓차린</span>님에 대한 한줄평을 남겨주세요.
      </TopContent>
      <InputField
        value={oneLiner}
        onChange={(e) => setOneLiner(e.target.value)}
        placeholder="지원자에 대한 생각을 간략하게 적어주세요. 이후 모든 구성원의 한줄평을 한번에 확인할 수 있어요."
      />
      <FinishBtn onClick={handleBtn}>면접 완료</FinishBtn>
    </Container>
  );
};

export default ReviewModal;

const Container = styled.div`
  display: flex;
  min-width: 70rem;
  padding: 3rem 1rem;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  flex-shrink: 0;

  border-radius: 2rem;
  border: 1px solid var(--Gray-300, #e6e6e6);
  background: var(--Gray-100, #fff);
  z-index: 45;
`;

const TopContent = styled.div`
  color: var(--Gray-1100, #1a1a1a);
  text-align: center;

  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 155%;
  letter-spacing: 0.72px;

  width: 100%;
  padding-bottom: 1.3rem;
  border-bottom: 1px solid var(--Gray-300, #e6e6e6);

  span {
    color: var(--purple-600, #3733ff);
  }
`;

const InputField = styled.textarea`
  display: flex;
  width: 90%;
  height: 12.8rem;
  padding: 1.6rem;
  margin: 0 3rem;
  align-items: flex-start;
  flex-shrink: 0;
  outline: none;

  border-radius: 12px;
  border: 1px solid var(--Gray-500, #b3b3b3);
  background: var(--Gray-100, #fff);

  color: var(--purple-600, #3733ff);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.042px;

  &::placeholder {
    color: var(--Gray-700, #808080);
  }

  &:focus,
  &:not(:placeholder-shown) {
    border: 1px solid var(--Gray-500, #e6e5ff);
    background: #f3f2ff;
  }
`;

const FinishBtn = styled.button`
  display: flex;
  width: 19rem;
  padding: 0.4rem 3rem;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  background: var(--purple-600, #3733ff);

  color: var(--Gray-100, #fff);

  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 155%; /* 24.8px */
  letter-spacing: 0.48px;
`;
