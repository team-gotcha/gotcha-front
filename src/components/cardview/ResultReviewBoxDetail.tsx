import React, { useState, useEffect } from "react";
import { styled } from "styled-components";

import CommonGroupMembers from "../common/CommonGroupMembers";

interface InterviewDataProps {
  detailData?: {
    applicantName: string;
    keywords: { name: string; keywordType: string }[];
    oneLiners: {
      writerName: string;
      content: string;
    }[];
    ranking: number;
    totalScore: number;
  };
}

const ResultReviewBoxDetail = ({ detailData }: InterviewDataProps) => {
  return (
    <Container>
      <TopBox>
        <ScoreBox>
          <ReviewScore>{detailData.totalScore}/</ReviewScore>
          <TotalScore>20</TotalScore>
        </ScoreBox>
        <Comments>
          전체 <span>{detailData.ranking} 위</span>인 면접자입니다.
          <span>
            {detailData.keywords.map((keyword, index) => (
              <span key={index}>
                {keyword.name}
                {index < detailData.keywords.length - 1 && ", "}
              </span>
            ))}
          </span>
          의 키워드를 가지고 있어요.
        </Comments>
      </TopBox>
      <ReviewBox>
        {detailData.oneLiners &&
          detailData.oneLiners.map((item, index) => (
            <Reviews key={index}>
              <CommonGroupMembers
                groupMemberList={[item.writerName]}
                showNum={1}
              />
              <ReviewCom>{item.content}</ReviewCom>
            </Reviews>
          ))}
      </ReviewBox>
    </Container>
  );
};

export default ResultReviewBoxDetail;

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
