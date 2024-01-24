import React, { useState } from "react";
import { styled } from "styled-components";

import ChatIcon from "../../assets/icons/ChatIcon";
import HeartIcon from "../../assets/icons/HeartIcon";
import SendOffIcon from "../../assets/icons/SendOffIcno";
import SendOnIcon from "../../assets/icons/SendOnIcon";

import { usePatchQOpen } from "../../apis/patch/usePatchQOpen";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { renderState } from "../../recoil/cardview";

interface QuestionBtnProps {
  isClicked: boolean;
  onClick: () => void;
}

interface MemoReplyItemProps {
  item: {
    asking: boolean;
    commentTargetId: number;
    content: string;
    id: number;
    writerName: string;
    writerProfile: string;
  };
}

const MemoReplyItem = ({ item }: MemoReplyItemProps) => {
  const [isQuestionClicked, setIsQuestionClicked] = useState(false);
  const [isChatClicked, setIsChatClicked] = useState<boolean>(false);
  const [isHeartClicked, setIsHeartClicked] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const render = useRecoilValue(renderState);
  const setRender = useSetRecoilState(renderState);
  const openStatus = usePatchQOpen();

  const handleQuestionClick = (question_id: number) => {
    openStatus.setQuestions({ questionId: question_id });
    setRender(render + 1);
  };

  const handleChatClick = () => {
    setIsChatClicked(!isChatClicked);
  };

  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <>
      <Container>
        <StaticDiv>
          <TopDiv>
            <UserDiv>
              <UserProfile src={item.writerProfile} />
              <UserName>{item.writerName}</UserName>
            </UserDiv>
            <QuestionBtn
              onClick={() => handleQuestionClick(item.id)}
              isClicked={item.asking}
            >
              면접 때 질문하기
            </QuestionBtn>
          </TopDiv>
          <ContentDiv>
            <Content>{item.content}</Content>
            <BtnDiv>
              {/* <ReplyBtn onClick={handleChatClick} isChatClicked={isChatClicked}>
                <ChatIcon
                  width="16"
                  height="15"
                  fill={isChatClicked ? "#fff" : "#3733ff"}
                />
                0
              </ReplyBtn> */}
              <HeartBtn
                onClick={handleHeartClick}
                isHeartClicked={isHeartClicked}
              >
                <HeartIcon
                  width="16"
                  height="15"
                  fill={isHeartClicked ? "#fff" : "#ff2070"}
                />
                0
              </HeartBtn>
            </BtnDiv>
          </ContentDiv>
        </StaticDiv>
      </Container>
      {/* {isChatClicked && (
        <InputDiv isInputFocused={isInputFocused}>
          <Input
            placeholder="팀원의 이야기에 덧글을 달아보세요."
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {isInputFocused ? <SendOnIcon /> : <SendOffIcon />}
        </InputDiv>
      )} */}
    </>
  );
};

export default MemoReplyItem;

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

  border-top: 1px solid var(--Gray-300, #e6e6e6);

  padding-left: 4rem;
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

const UserProfile = styled.img`
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
  white-space: nowrap;
`;

const ContentDiv = styled.div``;

const Content = styled(FontStyle)`
  color: var(--Gray-1100, #1a1a1a);

  font-size: 14px;
  margin: 0.8rem 0 1.6rem;
`;

const BtnDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const ReplyBtn = styled.button<{ isChatClicked: boolean }>`
  display: flex;
  padding: 0px 8px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;

  border-radius: 10px;
  background: ${({ isChatClicked }) => (isChatClicked ? "#3733FF" : "#f6f6f6")};
  color: ${({ isChatClicked }) => (isChatClicked ? "#f6f6f6" : "#3733FF")};

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.036px;
`;

const HeartBtn = styled.div<{ isHeartClicked: boolean }>`
  display: flex;
  padding: 0px 8px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;

  border-radius: 10px;
  background: ${({ isHeartClicked }) =>
    isHeartClicked ? "#ff2070" : "#f6f6f6"};
  color: ${({ isHeartClicked }) => (isHeartClicked ? "#f6f6f6" : "#ff2070")};

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.036px;
`;

const InputDiv = styled.div<{ isInputFocused: boolean }>`
  display: flex;
  gap: 0.8rem;
  width: 100%;
  border-radius: 0 0 1.2rem 1.2rem;
  padding: 16px 20px;

  border-top: 1px solid #e6e6e6;
  background: ${({ isInputFocused }) =>
    isInputFocused ? "#fff" : "var(--Gray-200, #F6F6F6)"};
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
`;
