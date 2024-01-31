import React, { useState } from "react";
import { styled } from "styled-components";

import ChatIcon from "../../assets/icons/ChatIcon";
import HeartIcon from "../../assets/icons/HeartIcon";
import SendOffIcon from "../../assets/icons/SendOffIcno";
import SendOnIcon from "../../assets/icons/SendOnIcon";

import { usePatchQOpen } from "../../apis/patch/usePatchQOpen";
import { usePostLike } from "../../apis/post/usePostLike";

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
    like: boolean;
    likeCount: number;
    writerName: string;
    writerProfile: string;
  };
}

const MemoReplyItem = ({ item }: MemoReplyItemProps) => {
  const [isQuestionClicked, setIsQuestionClicked] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState<boolean>(false);

  // const render = useRecoilValue(renderState);
  // const setRender = useSetRecoilState(renderState);
  const [render, setRender] = useRecoilState(renderState);
  const postLikes = usePostLike();
  const openStatus = usePatchQOpen();

  const handleQuestionClick = (question_id: number) => {
    openStatus.setQuestions({ questionId: question_id });
    setTimeout(() => {
      setRender(render + 1);
    }, 400);
  };

  const handleHeartClick = () => {
    postLikes.postLike(item.id);
    setIsHeartClicked(!isHeartClicked);
    setTimeout(() => {
      setRender(render + 1);
    }, 400);
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
              <HeartBtn onClick={handleHeartClick} isHeartClicked={item.like}>
                <HeartIcon
                  width="16"
                  height="15"
                  fill={item.like ? "#fff" : "#ff2070"}
                />
                {item.likeCount}
              </HeartBtn>
            </BtnDiv>
          </ContentDiv>
        </StaticDiv>
      </Container>
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
  cursor: pointer;
`;
