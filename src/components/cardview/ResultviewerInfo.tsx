import React, { useState } from "react";
import { styled } from "styled-components";

const ResultViewerInfo = () => {
  return (
    <>
      <UserProfileDiv>
        <UserProfile></UserProfile>
        <UserName></UserName>
      </UserProfileDiv>
      <InterviewDiv>
        <InterviewBox>
          <InterviewTitle>면접일</InterviewTitle>
          <Result></Result>
        </InterviewBox>
        <InterviewBox>
          <InterviewTitle>면접관</InterviewTitle>
          <ResultDiv>
            <Result>배수연</Result>
            <Result>염혜인</Result>
          </ResultDiv>
        </InterviewBox>
        <InterviewBox>
          <InterviewTitle>이메일</InterviewTitle>
          <Result>abec@naver.com</Result>
        </InterviewBox>
      </InterviewDiv>
    </>
  );
};

export default ResultViewerInfo;

const UserProfileDiv = styled.div``;

const UserProfile = styled.div``;

const UserName = styled.div``;

const InterviewDiv = styled.div``;

const InterviewBox = styled.div``;

const InterviewTitle = styled.div``;

const ResultDiv = styled.div``;

const Result = styled.div``;
