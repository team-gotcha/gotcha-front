import React, { useState } from "react";
import { styled } from "styled-components";

import SendOffIcon from "../../assets/icons/SendOffIcno";
import SendOnIcon from "../../assets/icons/SendOnIcon";

interface QuestionBtnProps {
  isClicked: boolean;
  onClick: () => void;
}

const MemoInput = () => {
  const [isQuestionClicked, setIsQuestionClicked] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleQuestionClick = () => {
    setIsQuestionClicked(!isQuestionClicked);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <Container>
      <StaticDiv>
        <TopDiv>
          <UserDiv>
            <UserProfile />
            <UserName>작성자 이름</UserName>
          </UserDiv>
          <QuestionBtn
            onClick={handleQuestionClick}
            isClicked={isQuestionClicked}
          >
            면접 때 질문하기
          </QuestionBtn>
        </TopDiv>
      </StaticDiv>
      <InputDiv isInputFocused={isInputFocused}>
        <Input
          placeholder="팀원의 이야기에 덧글을 달아보세요."
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {isInputFocused ? <SendOnIcon /> : <SendOffIcon />}
      </InputDiv>
    </Container>
  );
};

export default MemoInput;

const FontStyle = styled.div`
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.042px;
`;

const Container = styled.div`
  display: flex;
  /* width: 72rem; */
  flex-direction: column;

  flex-shrink: 0;

  border-radius: 12px;
  border: 1px solid var(--purple-400, #b4b2ff);
  background: var(--Gray-100, #fff);
`;

const StaticDiv = styled.div`
  padding: 1.6rem;
`;

const TopDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const UserProfile = styled.div`
  width: 3.2rem;
  height: 3.2rem;

  border-radius: 50%;
  background-color: #e6e6e6;
`;

const UserName = styled(FontStyle)`
  color: var(--Gray-1100, #1a1a1a);

  font-size: 12px;
  font-weight: 600;
`;

const QuestionBtn = styled.button<QuestionBtnProps>`
  display: flex;
  padding: 4px 24px;
  justify-content: center;
  align-items: center;

  border-radius: 12px;

  border: ${({ isClicked }) =>
    isClicked
      ? "1px solid var(--purple-600, #3733FF)"
      : "1px solid var(--Gray-800, #666)"};
  background: var(--Gray-100, #fff);
  color: ${({ isClicked }) =>
    isClicked ? "var(--purple-600, #3733FF);" : "var(--Gray-900, #4d4d4d)"};
  text-align: center;

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */
  letter-spacing: -0.036px;
`;

const InputDiv = styled.div<{ isInputFocused: boolean }>`
  display: flex;
  gap: 0.8rem;
  width: 100%;
  padding: 16px 20px;
  border-radius: 0 0 1.2rem 1.2rem;

  border-top: 1px solid var(--purple-400, #b4b2ff);
  background: ${({ isInputFocused }) =>
    isInputFocused ? "#fff" : "var(--purple-100, #f3f2ff)"};
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
`;