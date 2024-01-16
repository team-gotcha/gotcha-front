import React, { useState } from "react";
import { styled } from "styled-components";

const ResultReviewBox = () => {
  return (
    <Container>
      <TopBox>
        <ScoreBox>
          <ReviewScore>17.2 / </ReviewScore>
          <TotalScore>20</TotalScore>
        </ScoreBox>
        <Comments>
          전체 <span>2위</span>인 면접자입니다. <span>다양한 경험, 꼼꼼한</span>
          의 키워드를 가지고 있어요.
        </Comments>
      </TopBox>
      <ReviewBox>
        <Reviews>
          <Profile />
          <ReviewCom>한줄평입니다</ReviewCom>
        </Reviews>
        <Reviews>
          <Profile />
          <ReviewCom>이러쿵저러쿵</ReviewCom>
        </Reviews>
        <Reviews>
          <Profile />
          <ReviewCom>요러쿵저러쿵</ReviewCom>
        </Reviews>
        <Reviews>
          <Profile />
          <ReviewCom>쿵치팍치</ReviewCom>
        </Reviews>
      </ReviewBox>
    </Container>
  );
};

export default ResultReviewBox;

const Container = styled.div`
  padding: 2rem 4rem 3rem;
`;

const TopBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2.7rem;
  /* width: 72rem; */
`;

const ScoreBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 15rem;
`;

const ReviewScore = styled.div`
  color: var(--Gray-1100, #1a1a1a);

  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 56px */
  letter-spacing: -0.12px;
  white-space: nowrap;
`;

const TotalScore = styled(ReviewScore)`
  font-size: 34px;
`;

const Comments = styled.div`
  word-break: keep-all;
  color: var(--Gray-900, #4d4d4d);

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 155%; /* 24.8px */
  letter-spacing: -0.048px;

  span {
    color: var(--purple-600, #3733ff);

    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
`;

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  gap: 2rem;
`;

const Reviews = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Profile = styled.div`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  background-color: #59afff;
`;

const ReviewCom = styled.div`
  color: var(--Gray-1100, #1a1a1a);

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.042px;
`;
