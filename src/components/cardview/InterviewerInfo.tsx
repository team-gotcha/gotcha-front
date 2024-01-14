import React, { useState } from "react";
import { styled } from "styled-components";

import KeywordBox from "./KeywordBox";

const InterviewerInfo = () => {
  return (
    <Wrapper>
      <UserProfileDiv>
        <UserProfile></UserProfile>
        <UserName></UserName>
      </UserProfileDiv>
      <InterviewDiv>
        <InterviewBox>
          <InterviewTitle>면접일</InterviewTitle>
          <ChoiceDate></ChoiceDate>
        </InterviewBox>
        <InterviewBox>
          <InterviewTitle>면접관</InterviewTitle>
          <KeywordBox />
        </InterviewBox>
      </InterviewDiv>
      <BasicInfoDiv>
        <InfoBox>
          <Info>나이</Info>
          <InfoInput></InfoInput>
        </InfoBox>
        <InfoBox>
          <Info>연락처</Info>
          <InfoInput></InfoInput>
        </InfoBox>
        <InfoBox>
          <Info>학력</Info>
          <InfoInput></InfoInput>
        </InfoBox>
        <InfoBox>
          <Info>지원경로</Info>
          <InfoInput></InfoInput>
        </InfoBox>
        <InfoBox>
          <Info>지원직무</Info>
          <InfoInput></InfoInput>
        </InfoBox>
      </BasicInfoDiv>
      <KeywordDiv>
        <KeywordBox />
        <KeywordBox />
        <KeywordBox />
        <Document>
          <TitleDiv>
            <KeyTitle></KeyTitle>
            <InfoIcon />
          </TitleDiv>
          <Resume></Resume>
          <Portfolio></Portfolio>
        </Document>
      </KeywordDiv>
    </Wrapper>
  );
};

export default InterviewerInfo;

const Wrapper = styled.div``;

const UserProfileDiv = styled.div``;

const UserProfile = styled.div``;

const UserName = styled.div``;

const InterviewDiv = styled.div``;

const InterviewBox = styled.div``;

const InterviewTitle = styled.div``;

const ChoiceDate = styled.input``;

const BasicInfoDiv = styled.div``;

const InfoBox = styled.div``;

const Info = styled.div``;

const InfoInput = styled.input``;

const KeywordDiv = styled.div``;

const Document = styled.div``;

const TitleDiv = styled.div``;

const KeyTitle = styled.div``;

const InfoIcon = styled.div``;

const Resume = styled.input``;

const Portfolio = styled.input``;
