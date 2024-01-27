import React, { useState } from "react";
import { styled } from "styled-components";

interface InterviewDataProps {
  data?: {
    applicantName: string;
    date: string;
    email: string;
    interviewName: string;
    interviewStatus: string;
    interviewers: string[];
    keywords: { name: string; keywordType: string }[];
    oneLiners: string | null;
    ranking: number;
    totalScore: number;
  };
}

const ResultReviewBox = ({ data }: InterviewDataProps) => {
  if (!data) {
    return null;
  }
  return (
    <Container>
      <TopBox>
        <ScoreBox>
          <ReviewScore>{data.totalScore} / </ReviewScore>
          <TotalScore>20</TotalScore>
        </ScoreBox>
        <Comments>
          전체 <span>{data.ranking}위</span>인 면접자입니다.{" "}
          <span>
            {data.keywords.map((keyword, index) => (
              <span key={index}>
                {keyword.name}
                {index < data.keywords.length - 1 && ", "}
              </span>
            ))}
          </span>
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
          <ReviewCom>한줄평 데이터가 어떤 식으로 넘어오는지 몰라서</ReviewCom>
        </Reviews>
        <Reviews>
          <Profile />
          <ReviewCom>아직 mockdata입니다</ReviewCom>
        </Reviews>
        <Reviews>
          <Profile />
          <ReviewCom>데이터 들어오면 수정하도록 하겠습니다!!</ReviewCom>
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
