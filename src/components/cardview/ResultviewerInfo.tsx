import React, { useState } from "react";
import { styled } from "styled-components";

interface InterviewDataProps {
  data?: {
    applicantId: number;
    applicantName: string;
    date: string;
    email: string;
    interviewName: string;
    interviewStatus: string;
    interviewers: string[];
    keywords: { name: string; keywordType: string }[];
    oneLiners:
      | {
          writerName: string;
          content: string;
        }[]
      | null;
    ranking: number;
    totalScore: number;
  };
}

const ResultViewerInfo = ({ data }: InterviewDataProps) => {
  return (
    <>
      <UserProfileDiv>
        <UserProfile></UserProfile>
        <UserName>{data.applicantName}</UserName>
      </UserProfileDiv>
      <InterviewDiv>
        <InterviewBox>
          <InterviewTitle>면접일</InterviewTitle>
          <Result>{data.date}</Result>
        </InterviewBox>
        <InterviewBox>
          <InterviewTitle>면접관</InterviewTitle>
          <ResultDiv>
            {data &&
              data.interviewers.map((item: string, index) => (
                <Result key={index}>{item}</Result>
              ))}
          </ResultDiv>
        </InterviewBox>
        <InterviewBox>
          <InterviewTitle>이메일</InterviewTitle>
          <Result>{data.email}</Result>
        </InterviewBox>
      </InterviewDiv>
    </>
  );
};

export default ResultViewerInfo;

const UserProfileDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 4.4rem;

  width: 24.3rem;
`;

const UserProfile = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;

  background-color: var(--blue-200, #e5ecff);
`;

const FontStyle = styled.div`
  font-style: normal;
  font-weight: 400;
  line-height: 155%;
`;

const UserName = styled(FontStyle)`
  color: var(--purple-900, #161466);
  font-size: 36px;
  font-weight: 600;
`;

const InterviewDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.4rem;
  gap: 2rem;
`;

const InterviewBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4.4rem;

  width: 26.5rem;
`;

const InterviewTitle = styled(FontStyle)`
  color: var(--purple-600, #3733ff);

  font-size: 14px;
  font-weight: 500;
`;

const ResultDiv = styled.div`
  display: flex;
  gap: 2.8rem;
`;

const Result = styled(FontStyle)`
  color: var(--Gray-1000, #333);

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 155%; /* 24.8px */
  letter-spacing: -0.048px;
`;
